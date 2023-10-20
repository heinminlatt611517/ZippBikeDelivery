/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants';
import {useSelector} from 'react-redux';

const CustomNotificationBadge = props => {
  //get notification count from state
  const notificationCount = useSelector(
    state => state.notification.notificationCount,
  );
  //render UI
  console.log('NotificationCount', notificationCount);
  return (
    <View>
      <TouchableOpacity onPress={props.onPress}>
        <View
          style={{
            height: 16,
            width: 16,
            borderRadius: 1000,
            position: 'absolute',
            top: -6,
            right: 12,
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: COLORS.white,
              alignSelf: 'center',
              fontSize: 7,
              alignItems: 'center',
              textAlign: 'center',
              position: 'absolute',
              top: 3,
            }}>
            {notificationCount}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomNotificationBadge;

const styles = StyleSheet.create({});
