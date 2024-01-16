import React from 'react';
import {AppText, AppView} from '../../common';
import colors from '../../common/defaults/colors';
import TitleSection from './TitleSection';
import {useSelector} from 'react-redux';

const ReceiverData = () => {
  const receiverData = useSelector(state => state.shipment.receiverData);

  return (
    <AppView
      flex
      stretch
      backgroundColor={colors.white}
      borderRadius={15}
      padding={5}
      marginHorizontal={5}
      marginVertical={3}>
      <TitleSection
        name="receiverData"
        screen="AddReceiverData"
        statusBarColor={colors.primary}
        iconName="location-pin"
        iconType="SimpleLineIcons"
        backgroundColor={colors.secondary1}
        iconSize={8}
      />

      <AppText
        color={colors.graytext}>{`${receiverData?.receiver_name}`}</AppText>
      <AppText
        color={colors.graytext}
        marginVertical={3}>{`${receiverData?.receiver_phone}`}</AppText>
      <AppText
        color={
          colors.graytext
        }>{`${receiverData?.countryName} - ${receiverData?.stateName} - ${receiverData?.cityName}`}</AppText>
      <AppText
        color={colors.graytext}>{`${receiverData?.receiver_address}`}</AppText>
      {receiverData?.receiver_address_url ? (
        <AppText
          color={colors.graytext}
          type={'link'}>{`${receiverData?.receiver_address_url}`}</AppText>
      ) : null}
      {receiverData?.zip_code ? (
        <AppText
          color={colors.graytext}
          type={'link'}>{`${receiverData?.zip_code}`}</AppText>
      ) : null}
    </AppView>
  );
};

export default ReceiverData;
