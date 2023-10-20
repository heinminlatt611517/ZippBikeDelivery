import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, MARGINS, PADDINGS} from '../../constants';
import PressItem from '../atoms/PressItem';

const NewOrderItem = props => {
  console.log('NewOrderItem', props.items);
  return (
    <PressItem onPress={() => props.onPress(props.items.id)}>
      <View style={styles.container}>
        <Text style={styles.text}>{props.items.assigned_order_id}</Text>
        <Text style={styles.text}>
          DD/MM/YY{'\n'}({props.items.delivered_date})
        </Text>
        <Text style={styles.text}>New Order</Text>
      </View>
    </PressItem>
  );
};

export default NewOrderItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.newOrder,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    padding: PADDINGS.p10,
    marginBottom: MARGINS.m2,
  },
  text: {
    flex: 1,
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 10,
  },
});
