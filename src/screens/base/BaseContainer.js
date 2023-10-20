/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */

import {ImageBackground, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {IMGS} from '../../constants';

const BaseContainer = props => {
  return (
    <ImageBackground
      source={IMGS.bgImg}
      resizeMode="stretch"
      style={{flex: 1, width: null, height: null}}>
      <KeyboardAwareScrollView
        scrollEnabled={true}
        enableAutomaticScroll={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}>
        <View
          style={{
            flex: 1,
          }}>
          {props.children}
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default BaseContainer;
