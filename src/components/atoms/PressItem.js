import {TouchableOpacity} from 'react-native';
import React from 'react';

// eslint-disable-next-line prettier/prettier
const PressItem = props => {
  return (
    <TouchableOpacity style={props.style} onPress={props.onPress}>
      {props.children}
    </TouchableOpacity>
  );
};

export default PressItem;
