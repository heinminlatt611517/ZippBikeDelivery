import {StyleSheet, Dimensions, View} from 'react-native';
import React, {useState} from 'react';
import StepIndicator from 'react-native-step-indicator';

const {width, height} = Dimensions.get('window');
const HorizontalStepIndicator = props => {
  const labels = ['Accepted', 'Dispatched', 'Delivered'];
  return (
    <View style={styles.indicatorContainer}>
      <StepIndicator
        customStyles={props.customStyle}
        currentPosition={props.currentStep}
        labels={labels}
        stepCount={labels.length}
      />
    </View>
  );
};

export default HorizontalStepIndicator;

const styles = StyleSheet.create({
  indicatorContainer: {
    height: 300,
    width: width + 60,
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
