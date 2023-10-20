/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import CustomButton from '../../../../components/atoms/CustomButton';
import {COLORS, MARGINS, PADDINGS, IMGS} from '../../../../constants';
import OrderDetailDataTemplate from '../../../../components/templates/OrderDetailDataTemplate';
import HorizontalStepIndicator from '../../../../components/atoms/HorizontalStepIndicator';
import {useDispatch, useSelector} from 'react-redux';
import * as orderActions from '../../../../store/actions/order';

const NewOrder = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(false);
  const {id} = route.params;

  //get initial data
  useEffect(() => {
    loadDeliverDetailData();
  }, []);

  //load initial data
  const loadDeliverDetailData = useCallback(
    async token => {
      setShowLoading(true);
      await dispatch(orderActions.getOrderDetails(id));
      setShowLoading(false);
    },
    [dispatch],
  );

  //get state data
  const deliverDetailData = useSelector(
    state => state.order.deliverDetailsData,
  );
  console.log('OrderDetail', deliverDetailData);

  //press button events
  const handleOnPressAccept = () => {
    dispatch(orderActions.postOrderStatus(id, 'Accepted', navigation));
  };

  //render UI
  return (
    <ImageBackground
      source={IMGS.bgImg}
      resizeMode="stretch"
      style={{flex: 1, width: null, height: null}}>
      <View style={styles.container}>
        <View style={styles.titleRow}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>
              Order ID
            </Text>
            <Text
              style={{
                color: COLORS.newOrder,
                fontSize: 18,
                fontWeight: 'bold',
                marginLeft: MARGINS.m10,
              }}>
              234455
            </Text>
          </View>
          <Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>
            New Order
          </Text>
        </View>
        <View style={{flex: 1, width: '100%'}}>
          <HorizontalStepIndicator customStyle={styles.customStyles} />
        </View>
        <OrderDetailDataTemplate detailsData={deliverDetailData} />
        <View style={{flex: 1}} />
        <CustomButton
          onPress={handleOnPressAccept}
          textStyle={{color: COLORS.white}}
          text={'Accept'}
          buttonStyle={styles.buttonStyle}
        />
      </View>
    </ImageBackground>
  );
};

export default NewOrder;

const styles = StyleSheet.create({
  container: {flex: 1, marginLeft: MARGINS.m18, marginRight: MARGINS.m18},
  buttonStyle: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: COLORS.accepted,
    alignItems: 'center',
    padding: PADDINGS.p16,
    marginTop: MARGINS.m30,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    height: 55,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    marginTop: MARGINS.m20,
    justifyContent: 'space-between',
  },
  customStyles: {
    stepIndicatorSize: 26,
    currentStepIndicatorSize: 26,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 7,
    stepStrokeCurrentColor: COLORS.gray,
    stepStrokeWidth: 7,
    stepStrokeFinishedColor: COLORS.gray,
    stepStrokeUnFinishedColor: COLORS.gray,
    separatorFinishedColor: COLORS.gray,
    separatorUnFinishedColor: COLORS.gray,
    stepIndicatorFinishedColor: COLORS.gray,
    stepIndicatorUnFinishedColor: COLORS.gray,
    stepIndicatorCurrentColor: COLORS.gray,
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: COLORS.gray,
    stepIndicatorLabelFinishedColor: COLORS.gray,
    stepIndicatorLabelUnFinishedColor: COLORS.gray,
    labelColor: COLORS.gray,
    labelSize: 10,
    currentStepLabelColor: COLORS.gray,
    labelAlign: 'flex-start',
  },
});
