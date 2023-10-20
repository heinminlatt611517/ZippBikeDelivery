import messaging from '@react-native-firebase/messaging';
import {KEY_FCM_TOKEN} from '../constants/matcher';
import RealmServices from '../persistence/RealmServices';
import {getStoreData, storeData} from '../utils/SessionManager';
import PushNotification, {Importance} from 'react-native-push-notification';
import * as notificationActions from '../store/actions/notification';

export const requestUserPermission = async () => {
  PushNotification.createChannel(
    {
      channelId: 'channel-id',
      channelName: 'My channel',
      channelDescription: 'A channel to categorise your notifications',
      playSound: true,
      soundName: 'default',
      importance: Importance.HIGH,
      vibrate: true,
    },
    created => console.log(`createChannel returned '${created}'`),
  );

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    GetFCMToken();
  }
};

const GetFCMToken = async () => {
  getStoreData('fcmToken').then(async value => {
    console.log(value, 'the old token');
    if (!value) {
      try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log(fcmToken, 'the new generate token');
          storeData(KEY_FCM_TOKEN, fcmToken);
        }
      } catch (error) {
        console.log(error, 'error in FCM token');
      }
    }
  });
};

export const subscribeTopic = async topic => {
  messaging()
    .subscribeToTopic(topic)
    .then(() => console.log('Subscribed to topic:', topic))
    .catch(e => {
      console.log(e);
    });
};

export const NotificationListener = store => {
  // messaging().onNotificationOpenedApp(remoteMessage => {
  //   console.log(
  //     'Notification caused app to open from background state:',
  //     remoteMessage.notification,
  //   );
  // });

  // messaging()
  //   .getInitialNotification()
  //   .then(remoteMessage => {
  //     if (remoteMessage) {
  //       console.log(
  //         'Notification caused app to open from quit state:',
  //         remoteMessage.notification,
  //       );
  //     }
  //   });

  messaging().onMessage(async remoteMessage => {
    PushNotification.localNotification({
      message: remoteMessage.notification.body,
      title: remoteMessage.notification.title,
    });

    console.log('notification on foreground state....', remoteMessage);
    console.log('Current Time....', new Date().getTime());
    var cond = {
      id: new Date().getTime(),
      title: remoteMessage.data.title,
      description: remoteMessage.data.message,
      dateTime: '3:00 pm',
      isRead: false,
    };
    RealmServices.save(cond);
    console.log('Length', RealmServices.findAll().length);
    store.dispatch(
      notificationActions.receiveNotification(
        RealmServices.searchByIsRead(false).length,
      ),
    );
  });
};
