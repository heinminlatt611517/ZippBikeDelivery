/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, Text, View, FlatList, AppState} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import NewOrderItem from '../../../../components/molecules/NewOrderItem';
import AcceptedItem from '../../../../components/molecules/AcceptedItem';
import DispatchedItem from '../../../../components/molecules/DispatchedItem';
import {COLORS, PADDINGS, MARGINS, ROUTES} from '../../../../constants';
import * as homeActions from '../../../../store/actions/home';
import {useSelector, useDispatch} from 'react-redux';

const NewDeliver = ({navigation}) => {
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(false);

  //focus screen handler
  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      console.log('FocusHandler');
      //loadNewDeliverData();
    });
    return focusHandler;
  }, [navigation]);

  //get initial data
  useEffect(() => {
    loadNewDeliverData();
  }, []);

  //load initial data
  const loadNewDeliverData = useCallback(
    async token => {
      setShowLoading(true);
      await dispatch(homeActions.getNewDelivers());
      setShowLoading(false);
    },
    [dispatch],
  );

  //get state data
  const newDeliverData = useSelector(state => state.home.newDeliverData);
  const newOrderData = newDeliverData.filter(item => item.status === 'New');
  const acceptedOrderData = newDeliverData.filter(
    item => item.status === 'Accepted',
  );
  const dispatchOrderData = newDeliverData.filter(
    item => item.status === 'Dispatched',
  );

  console.log('NewOrderData', newOrderData.length);
  console.log('AcceptOrderData', acceptedOrderData.length);
  console.log('DispatchOrderData', dispatchOrderData.length);

  //press event
  const handleOnPressNewOrderItem = id => {
    console.log('Id', id);
    navigation.navigate(ROUTES.NEW_ORDER, {id: id});
  };
  const handleOnPressAcceptedItem = id => {
    console.log('Press');
    navigation.navigate(ROUTES.ACCEPTED, {id: id});
  };
  const handleOnPressDispatchedItem = id => {
    console.log('Press');
    navigation.navigate(ROUTES.DISPATCHED, {id: id});
  };

  //render UI
  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <View style={styles.leftBox}>
          <Text style={styles.text}>Assigned{'\n'}Order ID</Text>
        </View>
        <View style={styles.centerBox}>
          <Text style={styles.text}>Date and Time{'\n'}to deliver</Text>
        </View>
        <View style={styles.rightBox}>
          <Text style={styles.text}>Status</Text>
        </View>
      </View>
      {newOrderData.length >= 0 ? (
        <FlatList
          style={styles.flatList}
          data={newOrderData}
          renderItem={({item}) => (
            <NewOrderItem items={item} onPress={handleOnPressNewOrderItem} />
          )}
          keyExtractor={item => item.id}
        />
      ) : undefined}
      {acceptedOrderData.length >= 0 ? (
        <FlatList
          style={styles.acceptFlatList}
          data={acceptedOrderData}
          renderItem={({item}) => (
            <AcceptedItem items={item} onPress={handleOnPressAcceptedItem} />
          )}
          keyExtractor={item => item.id}
        />
      ) : undefined}
      {dispatchOrderData.length >= 0 ? (
        <FlatList
          style={styles.dispatchFlatList}
          data={dispatchOrderData}
          renderItem={({item}) => (
            <DispatchedItem
              items={item}
              onPress={handleOnPressDispatchedItem}
            />
          )}
          keyExtractor={item => item.id}
        />
      ) : undefined}
    </View>
  );
};

export default NewDeliver;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusContainer: {
    flexDirection: 'row',
    marginLeft: MARGINS.m18,
    marginRight: MARGINS.m18,
    justifyContent: 'center',
    marginTop: MARGINS.m14,
  },
  leftBox: {
    backgroundColor: COLORS.gray,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    padding: PADDINGS.p10,
    flex: 1,
    marginRight: MARGINS.m2,
    justifyContent: 'center',
  },
  centerBox: {
    backgroundColor: COLORS.gray,
    padding: PADDINGS.p10,
    flex: 1,
    justifyContent: 'center',
  },
  rightBox: {
    backgroundColor: COLORS.gray,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    padding: PADDINGS.p10,
    flex: 1,
    marginLeft: MARGINS.m2,
    justifyContent: 'center',
  },
  text: {
    color: COLORS.white,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 10,
  },
  flatList: {
    marginLeft: MARGINS.m18,
    marginRight: MARGINS.m18,
    marginTop: MARGINS.m10,
  },
  acceptFlatList: {
    marginLeft: MARGINS.m18,
    marginRight: MARGINS.m18,
    marginTop: MARGINS.m20,
  },
  dispatchFlatList: {
    marginLeft: MARGINS.m18,
    marginRight: MARGINS.m18,
    marginTop: 1,
  },
});
