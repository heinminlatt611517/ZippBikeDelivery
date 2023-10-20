/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {MARGINS, IMGS} from '../../constants';
import {NewDeliSvg} from '../../assets';

const ButtonGroup = ({
  buttons,
  onItemClick,
  buttonActive,
  buttonInactive,
  buttonCompletedActive,
  textActive,
  textInActive,
}) => {
  const [clickedId, setClickedId] = useState(0);
  const handleClick = (item, id) => {
    setClickedId(id);
    onItemClick(id);
  };
  return (
    <View style={styles.container}>
      {buttons.map((buttonLabel, index) => {
        return (
          <TouchableOpacity
            onPress={item => handleClick(item, index)}
            key={index}
            style={
              index === clickedId
                ? clickedId === 0
                  ? buttonActive
                  : buttonCompletedActive
                : buttonInactive
            }>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <NewDeliSvg style={{marginRight: MARGINS.m10}} />
              <Text style={index === clickedId ? textActive : textInActive}>
                {buttonLabel}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ButtonGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: MARGINS.m14,
    marginTop: MARGINS.m20,
    marginLeft: MARGINS.m10,
    marginRight: MARGINS.m10,
  },
});
