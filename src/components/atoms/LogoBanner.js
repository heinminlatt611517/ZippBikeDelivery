import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {IMGS} from '../../constants';

const LogoBanner = () => {
  return <Image source={IMGS.logo} style={styles.logo} />;
};

export default LogoBanner;

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
  },
});
