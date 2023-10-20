/**
 * @format
 */
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import RealmServices from './src/persistence/RealmServices';
import {subscribeTopic} from './src/helper/pushNotificationHelper';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  //addBook('App killed State or exit', Math.floor(Math.random() * 500));

  var cond = {
    id: new Date().getTime(),
    title: remoteMessage.data.title,
    description: remoteMessage.data.message,
    dateTime: '3:00 pm',
    isRead: false,
  };
  RealmServices.save(cond);
});

//subscribe to topic
subscribeTopic('zippBike');

const bgMessaging = async messages => {
  console.log('BgMessaging', messages);
  return Promise.resolve();
};

AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  () => bgMessaging,
);

AppRegistry.registerComponent(appName, () => App);
