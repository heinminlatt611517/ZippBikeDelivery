import {StyleSheet} from 'react-native';
import React from 'react';
import {BallIndicator} from 'react-native-indicators';
import {COLORS} from '../../constants';

const LoadingIndicator = props => {
  return <BallIndicator color={COLORS.primary} size={30} />;
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
});
