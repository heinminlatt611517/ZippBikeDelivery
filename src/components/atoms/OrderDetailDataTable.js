/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {FlatList, Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS, PADDINGS} from '../../constants';
const data = [
  {
    name: 'Singha Lemon Soda',
    category: 'Beer',
    type: 'Can',
    size: '100 ml',
    orderQuantity: '4',
  },
  {
    name: 'Johnnie Walker Red label',
    category: 'Wine',
    type: 'Bottle',
    size: '100 ml',
    orderQuantity: '5',
  },
  {
    name: 'Singha Lemon Soda',
    category: 'Beer',
    type: 'Can',
    size: '100 ml',
    orderQuantity: '7',
  },
  {
    name: 'Johnnie Walker Red label',
    category: 'Wine',
    type: 'Bottle',
    size: '100 ml',
    orderQuantity: '6',
  },
];
const OrderDetailDataTable = () => {
  //render item
  const item = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
      }}>
      <View style={styles.grayLightView}>
        <Text style={styles.text}>{item.name}</Text>
      </View>
      <View style={styles.normalView}>
        <Text style={styles.text}>{item.category}</Text>
      </View>
      <View style={styles.typeCol}>
        <Text style={styles.text}>{item.type}</Text>
      </View>
      <View style={styles.sizeCol}>
        <Text style={styles.text}>{item.size}</Text>
      </View>
      <View style={styles.orderCol}>
        <Text style={styles.text}>{item.orderQuantity}</Text>
      </View>
    </View>
  );

  //render header
  const Header = () => (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
      }}>
      <View style={styles.grayLightView}>
        <Text style={styles.titleText}>Name</Text>
      </View>
      <View style={styles.normalView}>
        <Text style={styles.titleText}>Category</Text>
      </View>
      <View style={styles.typeCol}>
        <Text style={styles.titleText}>Type</Text>
      </View>
      <View style={styles.sizeCol}>
        <Text style={styles.titleText}>Size</Text>
      </View>
      <View style={styles.orderCol}>
        <Text style={styles.titleText}>Order Quantity</Text>
      </View>
    </View>
  );

  //item separator component
  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: COLORS.grayLight,
        }}
      />
    );
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '7%',
        marginBottom: '7%',
        backgroundColor: COLORS.grayLight,
      }}>
      <Header />
      <View
        style={{
          height: 1,
        }}
      />
      <FlatList
        data={data}
        renderItem={item}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={FlatListItemSeparator}
      />
    </View>
  );
};
export default OrderDetailDataTable;

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
  },
  normalView: {
    width: '22%',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
  },
  grayLightView: {
    width: '25%',
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeCol: {
    width: '15%',
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeCol: {
    width: '18%',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderCol: {
    width: '20%',
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 10,
    fontWeight: 'normal',
    textAlign: 'center',
    paddingTop: PADDINGS.p8,
    paddingBottom: PADDINGS.p8,
    paddingLeft: PADDINGS.p6,
    paddingRight: PADDINGS.p6,
  },
  titleText: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.black,
    paddingTop: PADDINGS.p8,
    paddingBottom: PADDINGS.p8,
    paddingLeft: PADDINGS.p6,
    paddingRight: PADDINGS.p6,
  },
});
