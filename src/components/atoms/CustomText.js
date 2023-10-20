/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {COLORS, MARGINS, PADDINGS} from '../../constants';
import PressItem from './PressItem';

const CustomText = props => {
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    props.onPress(props.id);
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 2); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);
  console.log('IsRead', props.isRead);
  return props.isRead != null ? (
    //notification container
    <PressItem onPress={() => props.onPress(props.id)}>
      <View
        style={
          props.isRead === false ? styles.unreadContainer : styles.container
        }>
        {!props.isIcon ? (
          <View style={styles.column}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={props.labelStyle}>{props.label}</Text>
              <Text style={{color: COLORS.grayLight, fontSize: 12}}>
                {props.dateTime}
              </Text>
            </View>
            <Text
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 2}
              style={{lineHeight: 21}}>
              {props.value}
            </Text>

            {lengthMore ? (
              <Text
                onPress={toggleNumberOfLines}
                style={{
                  lineHeight: 21,
                  marginTop: 8,
                  fontWeight: 'bold',
                  color: COLORS.primary,
                }}>
                {textShown ? 'Read less...' : 'Read more...'}
              </Text>
            ) : null}
          </View>
        ) : (
          <View style={styles.row}>
            {props.image}
            <PressItem>
              <Text
                style={{
                  marginLeft: MARGINS.m14,
                  fontSize: 14,
                  color: COLORS.black,
                }}>
                {props.value}
              </Text>
            </PressItem>
          </View>
        )}
      </View>
    </PressItem>
  ) : (
    //normal container
    <View style={styles.container}>
      {!props.isIcon ? (
        <View style={styles.column}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={props.labelStyle}>{props.label}</Text>
            <Text style={{color: COLORS.grayLight, fontSize: 12}}>
              {props.dateTime}
            </Text>
          </View>
          <Text style={props.valueStyle}>{props.value}</Text>
        </View>
      ) : (
        <View style={styles.row}>
          {props.image}
          <PressItem onPress={props.onPressItem}>
            <Text
              style={{
                marginLeft: MARGINS.m14,
                fontSize: 14,
                color: COLORS.black,
              }}>
              {props.value}
            </Text>
          </PressItem>
        </View>
      )}
    </View>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
  },
  unreadContainer: {
    backgroundColor: COLORS.gray,
    borderRadius: 12,
  },
  row: {flexDirection: 'row'},
  column: {padding: PADDINGS.p10},
});
