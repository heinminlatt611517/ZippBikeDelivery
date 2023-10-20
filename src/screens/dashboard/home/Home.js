/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, AppState} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import BaseContainer from '../../base/BaseContainer';
import HomeBottomTabGroup from '../../../components/atoms/HomeBottomTabGroup';
import {COLORS, ROUTES} from '../../../constants';
import ButtonGroup from '../../../components/atoms/ButtonGroup';
import NewDeliver from './newDelivers/NewDeliver';
import Completed from './completed/Completed';
import {MessageSvg, NotificationSvg, ProfileSvg} from '../../../assets';
import {useDispatch} from 'react-redux';
import * as notificationActions from '../../../store/actions/notification';
import RealmServices from '../../../persistence/RealmServices';
import {checkForUpdates} from '../../../helper/AppVersionCheck';

const Home = ({navigation}) => {
  const [btnState, setBtnState] = useState(0);
  const appState = useRef(AppState.currentState);
  const dispatch = useDispatch();
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

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
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (appStateVisible === 'active') {
      checkForUpdates();
    }
  });

  //set initial notification count
  useEffect(() => {
    dispatch(
      notificationActions.receiveNotification(
        RealmServices.searchByIsRead(false).length,
      ),
    );
  });

  //press bottom tab
  const handleOnPressButton = item => {
    console.log(item);
    if (item === 0) {
      navigation.navigate(ROUTES.PROFILE);
    } else if (item === 1) {
      navigation.navigate(ROUTES.MESSAGE);
    } else {
      navigation.navigate(ROUTES.NOTIFICATION);
    }
  };
  const onPressButton = item => {
    console.log(item);
    setBtnState(item);
  };

  return (
    <View style={styles.container}>
      <BaseContainer>
        <View style={{marginBottom: 100}}>
          <ButtonGroup
            buttons={['New Delivers', 'Completed']}
            onItemClick={onPressButton}
            buttonActive={styles.btnActive}
            buttonInactive={styles.btnInactive}
            buttonCompletedActive={styles.btnCompletedActive}
            textActive={styles.textActive}
            textInActive={styles.textInActive}
          />
          {btnState === 0 ? (
            <NewDeliver navigation={navigation} />
          ) : (
            <Completed navigation={navigation} />
          )}
        </View>
      </BaseContainer>
      <HomeBottomTabGroup
        images={[
          <ProfileSvg width={22} height={22} />,
          <MessageSvg width={22} height={22} />,
          <NotificationSvg width={22} height={22} />,
        ]}
        onItemClick={handleOnPressButton}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnInactive: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gray,
    borderRadius: 12,
    marginHorizontal: 10,
  },
  btnActive: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.newOrder,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  btnCompletedActive: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.completed,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  textInActive: {
    color: COLORS.white,
    fontSize: 14,
  },
  textActive: {
    color: COLORS.white,
    fontSize: 14,
  },
});
