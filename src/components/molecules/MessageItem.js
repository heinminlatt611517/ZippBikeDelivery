/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, MARGINS} from '../../constants';
import {UserSvg} from '../../assets';

const MessageItem = props => {
  return (
    <View style={styles.container}>
      {props.isCustomer ? (
        <View style={styles.userView}>
          <UserSvg width={24} height={24} />
        </View>
      ) : undefined}
      <View
        style={{
          flex: 3,
          justifyContent: 'space-between',
        }}>
        <Text style={styles.titleText}>Order ID</Text>
        {props.isCustomer ? undefined : <View style={{height: 8}} />}
        <Text style={styles.valueText}>Customer Name</Text>
      </View>
      <Text
        style={{
          flex: 1,
          fontSize: 12,
          textAlign: 'right',
          color: COLORS.grayLight,
        }}>
        4:03 pm
      </Text>
    </View>
  );
};

export default MessageItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: MARGINS.m14,
    marginBottom: MARGINS.m14,
    justifyContent: 'space-between',
  },
  userView: {
    backgroundColor: COLORS.grayLight,
    borderRadius: 8,
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    marginRight: MARGINS.m10,
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
    color: COLORS.black,
  },
  valueText: {
    fontSize: 12,
    fontWeight: 'normal',
    textAlign: 'left',
    color: COLORS.black,
  },
});
