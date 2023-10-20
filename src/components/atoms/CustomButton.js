import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, PADDINGS} from '../../constants';

const CustomButton = props => {
  console.log('Disable', props.disabled);
  return (
    <TouchableOpacity
      style={!props.buttonStyle ? styles.container : props.buttonStyle}
      onPress={props.onPress}
      disabled={props.disabled}>
      <View>
        <Text style={props.textStyle}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    padding: PADDINGS.p14,
  },
});
