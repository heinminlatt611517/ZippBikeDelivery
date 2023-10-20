/* eslint-disable no-alert */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, Text} from 'react-native';
import React, {useState} from 'react';
import UserInput from '../../components/atoms/UserInput';
import {COLORS, MARGINS, PADDINGS} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../../components/atoms/CustomButton';
import PressItem from '../../components/atoms/PressItem';
import {LogoSvg} from '../../assets';
import LoadingDialog from '../../components/atoms/LoadingDialog';
import {useDispatch} from 'react-redux';
import * as authActions from '../../store/actions/auth';

const SignIn = ({navigation}) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  let [showLoadingDialog, setShowLoadingDialog] = useState(false);

  const handleOnPressSignIn = async () => {
    if (userName === '') {
      alert("userName can't be empty.");
    } else if (password === '') {
      alert("password can't be empty.");
    } else {
      try {
        setShowLoadingDialog(true);
        await dispatch(authActions.login(userName, password, navigation));
        setShowLoadingDialog(false);
      } catch (error) {}
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
      <LoadingDialog
        showAlert={showLoadingDialog}
        setShowAlert={setShowLoadingDialog}
      />
      <View
        style={[
          styles.container,
          {
            flexDirection: 'column',
          },
        ]}>
        <View style={styles.logoContainer}>
          <LogoSvg />
        </View>

        <View style={styles.screenContainer}>
          <UserInput
            name={'Login'}
            value={userName}
            setValue={setUserName}
            placeHolder={'User Name'}
          />
          <View style={{height: 10}} />
          <UserInput
            name={'Login'}
            value={password}
            setValue={setPassword}
            placeHolder={'Password'}
          />
          <PressItem>
            <Text style={styles.text}>Forgot Password</Text>
          </PressItem>

          <CustomButton
            onPress={handleOnPressSignIn}
            text={'Sign In'}
            buttonStyle={styles.buttonStyle}
            textStyle={styles.buttonTextStyle}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logoContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenContainer: {
    flex: 3,
  },
  text: {
    alignSelf: 'flex-end',
    paddingRight: MARGINS.m30,
    color: COLORS.gray,
    fontSize: 12,
  },
  buttonStyle: {
    width: 200,
    borderRadius: 12,
    backgroundColor: COLORS.gray,
    alignItems: 'center',
    padding: PADDINGS.p14,
    marginTop: MARGINS.m30,
    alignSelf: 'center',
  },
  buttonTextStyle: {
    fontSize: 12,
    color: COLORS.white,
  },
});
