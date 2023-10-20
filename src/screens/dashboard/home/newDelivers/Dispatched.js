/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {ImageBackground, Linking, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {COLORS, MARGINS, PADDINGS, IMGS} from '../../../../constants';
import OrderDetailDataTemplate from '../../../../components/templates/OrderDetailDataTemplate';
import HorizontalStepIndicator from '../../../../components/atoms/HorizontalStepIndicator';
import CustomButton from '../../../../components/atoms/CustomButton';
import PressItem from '../../../../components/atoms/PressItem';
import {MessageSvg, PhoneWhiteSvg} from '../../../../assets';
import MapTemplate from '../../../../components/templates/MapTemplate';
import {useDispatch, useSelector} from 'react-redux';
import * as orderActions from '../../../../store/actions/order';

const Dispatched = ({route, navigation}) => {
  const [showMap, setShowMap] = useState(true);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
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

  //press events
  const handlePressOrderDetail = () => {
    setShowMap(false);
    setShowOrderDetail(true);
  };
  const handlePressMap = () => {
    setShowMap(true);
    setShowOrderDetail(false);
  };
  const handleOnPressDeliver = () => {
    console.log('Press');
    dispatch(orderActions.postOrderStatus(id, 'Delivered', navigation));
  };

  const handleOnPressPhone = () => {
    Linking.openURL('tel:' + deliverDetailData.contact_number);
  };

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
          {showMap ? (
            <PressItem onPress={handlePressOrderDetail}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 18,
                  fontWeight: 'normal',
                }}>
                {'Order Details >'}
              </Text>
            </PressItem>
          ) : (
            <PressItem onPress={handlePressMap}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 18,
                  fontWeight: 'normal',
                }}>
                {'Map >'}
              </Text>
            </PressItem>
          )}
        </View>
        {showMap ? undefined : (
          <View style={{flex: 1, width: '100%'}}>
            <HorizontalStepIndicator
              customStyle={styles.customStyles}
              currentStep={1}
            />
          </View>
        )}

        {showMap ? <View style={{height: 30}} /> : undefined}
        {showMap ? (
          <MapTemplate detailsData={deliverDetailData} />
        ) : (
          <OrderDetailDataTemplate detailsData={deliverDetailData} />
        )}

        <View style={{flex: 1}} />
        <View style={styles.bottomTab}>
          <PressItem onPress={handleOnPressPhone} style={styles.phoneBox}>
            <PhoneWhiteSvg />
          </PressItem>

          <CustomButton
            onPress={handleOnPressDeliver}
            text={'Delivered'}
            buttonStyle={styles.buttonStyle}
            textStyle={{color: COLORS.white}}
          />

          <PressItem style={styles.phoneBox}>
            <MessageSvg />
          </PressItem>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Dispatched;

const styles = StyleSheet.create({
  container: {flex: 1, marginLeft: MARGINS.m18, marginRight: MARGINS.m18},
  buttonStyle: {
    flex: 2,
    borderRadius: 12,
    backgroundColor: COLORS.present,
    alignItems: 'center',
    padding: PADDINGS.p16,
    alignSelf: 'center',
    marginLeft: MARGINS.m6,
    marginRight: MARGINS.m6,
    height: 55,
    justifyContent: 'center',
  },
  bottomTab: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneBox: {
    borderRadius: 12,
    height: 55,
    backgroundColor: COLORS.present,
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
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
    stepStrokeCurrentColor: COLORS.newOrder,
    stepStrokeWidth: 7,
    stepStrokeFinishedColor: COLORS.newOrder,
    stepStrokeUnFinishedColor: COLORS.gray,
    separatorFinishedColor: COLORS.newOrder,
    separatorUnFinishedColor: COLORS.gray,
    stepIndicatorFinishedColor: COLORS.newOrder,
    stepIndicatorUnFinishedColor: COLORS.gray,
    stepIndicatorCurrentColor: COLORS.newOrder,
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: COLORS.newOrder,
    stepIndicatorLabelFinishedColor: COLORS.newOrder,
    stepIndicatorLabelUnFinishedColor: COLORS.gray,
    labelColor: COLORS.gray,
    labelSize: 10,
    currentStepLabelColor: COLORS.white,
    labelAlign: 'flex-start',
  },
});
