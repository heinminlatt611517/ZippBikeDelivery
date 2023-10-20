/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, FlatList, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BaseContainer from '../../base/BaseContainer';
import {COLORS, PADDINGS, MARGINS} from '../../../constants';
import CustomText from '../../../components/atoms/CustomText';
import RealmServices from '../../../persistence/RealmServices';
import * as notificationActions from '../../../store//actions/notification';
import {useDispatch} from 'react-redux';

const Notification = () => {
  const dispatch = useDispatch();
  const [notificationData, setNotificationData] = useState([]);

  useEffect(() => {
    setNotificationData(RealmServices.findAll());
  }, []);

  const handleOnPressItem = id => {
    const obj = RealmServices.find(id);
    console.log('FindObj', obj);
    const newObj = {
      id: obj.id,
      title: obj.title,
      description: obj.description,
      dateTime: obj.dateTime,
      isRead: true,
    };
    RealmServices.save(newObj);
    setNotificationData(RealmServices.findAll());
    dispatch(
      notificationActions.receiveNotification(
        RealmServices.searchByIsRead(false).length,
      ),
    );
  };
  return (
    <BaseContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Notifications</Text>
        <FlatList
          style={styles.dispatchFlatList}
          data={notificationData}
          renderItem={({item}) => (
            <View>
              <CustomText
                isIcon={false}
                value={item.description}
                valueStyle={styles.valueStyle}
                label={item.title}
                labelStyle={styles.labelStyle}
                dateTime={item.dateTime}
                isRead={item.isRead}
                id={item.id}
                onPress={handleOnPressItem}
              />
              <View style={{height: 10}} />
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </BaseContainer>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {flex: 1, marginLeft: MARGINS.m18, marginRight: MARGINS.m18},
  subContainer: {
    backgroundColorL: COLORS.white,
    marginTop: MARGINS.m24,
  },
  subTitle: {
    color: COLORS.white,
    marginTop: MARGINS.m24,
    marginBottom: MARGINS.m24,
  },
  detailContainer: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    borderRadius: 12,
    padding: PADDINGS.p16,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.black,
    marginTop: MARGINS.m16,
    marginBottom: MARGINS.m16,
  },
  title: {
    color: COLORS.white,
    fontWeight: 'bold',
    marginTop: MARGINS.m20,
    marginBottom: MARGINS.m24,
    fontSize: 18,
  },
  labelStyle: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: 'bold',
  },
  valueStyle: {
    fontSize: 12,
    marginTop: MARGINS.m6,
    color: COLORS.black,
  },
});
