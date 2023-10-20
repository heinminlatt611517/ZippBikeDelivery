import remoteConfig from '@react-native-firebase/remote-config';
import {Alert, Linking, Platform, BackHandler} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const checkForUpdates = async () => {
  await remoteConfig()
    .fetchAndActivate()
    .then(fetchedRemotely => {
      if (fetchedRemotely) {
        console.log('Configs were retrieved from the backend and activated.');
      } else {
        console.log(
          'No configs were fetched from the backend, and the local configs were already activated',
        );
      }
    });
  remoteConfig().fetch(0);
  const requiredVersion = await remoteConfig().getValue('required_app_version')
    ._value;
  console.log('Require app version:', requiredVersion);

  const currentVersion = DeviceInfo.getVersion();
  console.log('Current app version:', currentVersion);

  if (requiredVersion.toString() !== currentVersion.toString()) {
    Alert.alert(
      'Update Required',
      'A new version of the app is available. Please update to continue using the app.',
      [
        {
          text: 'Update',
          onPress: () => {
            Platform.OS === 'android' ? Linking.openURL() : Linking.openURL(),
              BackHandler.exitApp();
          },
        },
      ],
      {cancelable: false},
    );
  }
};
