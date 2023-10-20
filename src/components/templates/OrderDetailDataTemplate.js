import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, PADDINGS} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OrderDetailDataTable from '../atoms/OrderDetailDataTable';

const OrderDetailDataTemplate = props => {
  const renderText = (label, value) => {
    return (
      <View style={styles.row}>
        <Text style={styles.text}>{label}</Text>
        <View style={{height: 20}} />
        <Text
          style={
            label === 'Address' ||
            label === 'Contact Number' ||
            label === 'Total Sales Amount' ||
            label === 'Date Delivered' ||
            label === 'Time Delivered' ||
            label === 'Payment Action'
              ? styles.boldText
              : styles.text
          }>
          {value}
        </Text>
      </View>
    );
  };

  const renderNormalText = (label, value) => {
    return (
      <View style={styles.row}>
        <Text style={styles.text}>{label}</Text>
        <View style={{height: 20}} />
        <Text style={styles.text}>{value}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        {renderText('Assigned Order ID', props.detailsData.assigned_order_id)}
        {renderText('Address', props.detailsData.address)}
        {renderText('Lat/Long', props.detailsData.lat, props.detailsData.long)}
        {renderText('Request By', props.detailsData.requested_by)}
        {renderText('Contact Number', props.detailsData.contact_number)}

        <OrderDetailDataTable />

        {renderText(
          'Preferred Date and Time',
          props.detailsData.preferred_date +
            '\n' +
            props.detailsData.preferred_time,
        )}
        {props.isCompleted ? (
          <View>
            {renderNormalText(
              'Total Sales Amount',
              props.detailsData.total_amount + 'Baths',
            )}
            {renderNormalText(
              'Payment Action',
              props.detailsData.payment_status === '0' ? 'UnPaid' : 'Paid',
            )}
          </View>
        ) : (
          <View>
            {renderText(
              'Total Sales Amount',
              props.detailsData.total_amount + 'Baths',
            )}
            {renderText(
              'Payment Action',
              props.detailsData.payment_status === '0' ? 'UnPaid' : 'Paid',
            )}
          </View>
        )}
        {props.isCompleted ? (
          <View>
            {renderText('Date Delivered', 'DD/MM/YYY')}
            {renderText('Time Delivered', '12:00 pm')}
          </View>
        ) : undefined}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default OrderDetailDataTemplate;

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: PADDINGS.p10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    textAlign: 'flex-start',
  },
  text: {
    color: COLORS.black,
    alignSelf: 'flex-start',
    textAlign: 'left',
    flex: 1,
    paddingBottom: PADDINGS.p10,
    fontSize: 10,
  },
  boldText: {
    color: COLORS.black,
    alignSelf: 'flex-start',
    textAlign: 'left',
    flex: 1,
    paddingBottom: PADDINGS.p10,
    fontWeight: 'bold',
    fontSize: 10,
  },
});
