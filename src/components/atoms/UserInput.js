import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {COLORS, MARGINS, PADDINGS} from '../../constants';

const UserInput = ({
  name,
  value,
  setValue,
  setKeyboardType = 'default',
  placeHolder,
  secureTextEntry = false,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.userInput}
        keyboardType={setKeyboardType}
        onChangeText={text => setValue(text)}
        value={value}
        placeholder={placeHolder}
        placeholderTextColor={COLORS.gray}
        secureTextEntry={secureTextEntry}
        multiline={false}
      />
    </View>
  );
};

export default UserInput;

const styles = StyleSheet.create({
  container: {
    marginLeft: MARGINS.m30,
    marginRight: MARGINS.m30,
    marginBottom: MARGINS.m18,
  },
  userInput: {
    height: 48,
    paddingLeft: PADDINGS.p10,
    borderRadius: 12,
    backgroundColor: COLORS.grayLight,
    fontSize: 12,
  },
});
