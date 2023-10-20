/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Linking, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import BaseContainer from '../../base/BaseContainer';
import {COLORS, PADDINGS, MARGINS} from '../../../constants';
import CustomText from '../../../components/atoms/CustomText';
import {
  BikeColorSvg,
  BikeSvg,
  MailSvg,
  PhoneSvg,
  UserSvg,
} from '../../../assets';
import * as profileActions from '../../../store/actions/profile';
import {useSelector, useDispatch} from 'react-redux';
import LoadingIndicator from '../../../components/atoms/LoadingIndicator';
import {window} from '../../../utils/Dimension';
import PressItem from '../../../components/atoms/PressItem';

const Profile = () => {
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(false);

  //get initial data
  useEffect(() => {
    loadProfileDetailData();
  }, []);

  //load initial data
  const loadProfileDetailData = useCallback(
    async token => {
      setShowLoading(true);
      await dispatch(profileActions.getProfileDetail());
      setShowLoading(false);
    },
    [dispatch],
  );

  //get state data
  const profileDetailData = useSelector(
    state => state.profile.profileDetailData,
  );

  //press button events
  const handleOnPressPhone = () => {
    Linking.openURL('tel:' + profileDetailData.contact);
  };
  //press button events
  const handleOnPressMail = () => {
    Linking.openURL('mailto:' + profileDetailData.email);
  };

  return (
    <BaseContainer>
      {showLoading ? (
        <View style={{height: window.height}}>
          <LoadingIndicator />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.userBanner}>
            <UserSvg />
          </View>
          <View style={styles.subContainer}>
            <CustomText
              isIcon={false}
              label={'Name'}
              value={
                profileDetailData.name === null
                  ? 'xxxxx'
                  : profileDetailData.name
              }
              labelStyle={styles.labelStyle}
              valueStyle={styles.valueStyle}
            />
            <View
              style={{
                height: 18,
              }}
            />
            <CustomText
              isIcon={false}
              label={'Rider ID'}
              value={
                profileDetailData.id === null ? 'xxxxx' : profileDetailData.id
              }
              labelStyle={styles.labelStyle}
              valueStyle={styles.valueStyle}
            />
            <Text style={styles.subTitle}>Details</Text>
            <View style={styles.detailContainer}>
              <CustomText
                onPressItem={handleOnPressMail}
                isIcon={true}
                value={
                  profileDetailData.email === null
                    ? 'xxxxx'
                    : profileDetailData.email
                }
                labelStyle={styles.labelStyle}
                valueStyle={styles.valueStyle}
                image={<MailSvg height={20} width={20} />}
              />

              <View style={styles.divider} />

              <CustomText
                onPressItem={handleOnPressPhone}
                isIcon={true}
                value={
                  profileDetailData.contact === null
                    ? 'xxxxx'
                    : profileDetailData.contact
                }
                labelStyle={styles.labelStyle}
                valueStyle={styles.valueStyle}
                image={<PhoneSvg height={20} width={20} />}
              />
            </View>

            <Text style={styles.subTitle}>Vehicle Details</Text>
            <View style={styles.vehicleDetailContainer}>
              <CustomText
                isIcon={true}
                value={
                  profileDetailData.vehicle === null
                    ? 'xxxxx'
                    : profileDetailData.vehicle
                }
                labelStyle={styles.labelStyle}
                valueStyle={styles.valueStyle}
                image={<BikeSvg height={20} width={20} />}
              />
              <View style={styles.divider} />
              <CustomText
                isIcon={true}
                value={
                  profileDetailData.color === null
                    ? 'xxxxx'
                    : profileDetailData.color
                }
                labelStyle={styles.labelStyle}
                valueStyle={styles.valueStyle}
                image={<BikeColorSvg height={20} width={20} />}
              />
            </View>
          </View>
        </View>
      )}
    </BaseContainer>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {flex: 1, marginLeft: MARGINS.m18, marginRight: MARGINS.m18},
  userBanner: {
    padding: PADDINGS.p10,
    backgroundColor: COLORS.newDeliver,
    width: 90,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: '10%',
    marginBottom: '10%',
    alignItems: 'center',
  },
  subContainer: {
    backgroundColorL: COLORS.white,
    marginTop: MARGINS.m24,
  },
  subTitle: {
    color: COLORS.grayLight,
    marginTop: MARGINS.m24,
    marginBottom: MARGINS.m24,
  },
  detailContainer: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    borderRadius: 12,
    padding: PADDINGS.p16,
  },
  vehicleDetailContainer: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    borderRadius: 12,
    padding: PADDINGS.p16,
    marginBottom: '10%',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.black,
    marginTop: MARGINS.m16,
    marginBottom: MARGINS.m16,
  },
  labelStyle: {
    color: COLORS.black,
    fontSize: 12,
  },
  valueStyle: {
    fontSize: 14,
    marginTop: MARGINS.m6,
    color: COLORS.black,
  },
});
