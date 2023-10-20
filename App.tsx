/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, LogBox, AppState} from 'react-native';
import AuthNavigator from './src/navigations/AuthNavigator';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';
import * as notificationActions from './src/store/actions/notification';
import * as authActions from './src/store/actions/auth';
import {
  NotificationListener,
  requestUserPermission,
} from './src/helper/pushNotificationHelper';
import {useEffect, useRef, useState} from 'react';
import firebase from './Firebase/firebase';
import RealmServices from './src/persistence/RealmServices';
import {getStoreData} from './src/utils/SessionManager';
import {KEY_AUTH_TOKEN} from './src/constants/matcher';
import DashboardNavigator from './src/navigations/DashboardNavigator';
import SplashScreen from 'react-native-splash-screen';

LogBox.ignoreAllLogs();
const store = configureStore();

const App = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [isLogged, setIsLogged] = useState(false);
  const [appReady, setAppReady] = useState(false);

  //onResume State
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
      if (appState.current === 'active' || appState.current === 'background') {
        store.dispatch(
          notificationActions.receiveNotification(
            RealmServices.searchByIsRead(false).length,
          ),
        );
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  //set initial notification count
  useEffect(() => {
    store.dispatch(
      notificationActions.receiveNotification(
        RealmServices.searchByIsRead(false).length,
      ),
    );
  });

  //init notification
  useEffect(() => {
    console.log(firebase);
    requestUserPermission();
    NotificationListener(store);
  }, []);

  //check is auth
  useEffect(() => {
    async function prepare() {
      try {
        //check auth token
        const data = await getStoreData(KEY_AUTH_TOKEN);
        if (!data) return;
        setIsLogged(data);
        store.dispatch(authActions.setAuthToken(data));
      } catch (e) {
      } finally {
        setAppReady(true);
        SplashScreen.hide();
      }
    }
    prepare();
  }, []);

  if (!appReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        {isLogged ? <DashboardNavigator /> : <AuthNavigator />}
        <StatusBar hidden />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
