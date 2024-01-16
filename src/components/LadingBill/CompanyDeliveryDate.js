import React, {useState} from 'react';
import {AppText, AppView, AppIcon, AppDatePicker} from '../../common';
import colors from '../../common/defaults/colors';
import I18n from 'i18next';
import moment from 'moment';
import TitleSection from './TitleSection';
import {setDeliveryDate} from '../../actions/shipment';
import {useDispatch, useSelector} from 'react-redux';

const CompanyDeliveryDate = () => {
  const [edit, setEdit] = useState(false);
  const deliveryDate = useSelector(state => state.shipment.deliveryDate);
  const dispatch = useDispatch();
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
        name="deliveryDate"
        // screen='AddSenderData'
        iconName="calendar-month-outline"
        iconType="MaterialCommunityIcons"
        iconSize={9}
        onPress={() => setEdit(!edit)}
      />
      {edit && (
        <AppDatePicker
          presentationFormat="DD MMM YYYY"
          momentFormat="YYYY-MM-DD"
          stretch
          marginTop={5}
          placeholder={`${I18n.t('choose')} ${I18n.t('deliveryDate')}`}
          minDate={new Date()}
          mode={'date'}
          leftItems={
            <AppView
              width={10}
              stretch
              center
              backgroundColor={colors.primary1}
              margin={3}
              borderRadius={5}>
              <AppIcon
                stretch
                borderRadius={5}
                size={9}
                name="calendar-month-outline"
                type="MaterialCommunityIcons"
              />
            </AppView>
          }
          onSelect={async dateTime => {
            console.log('dateTime ', dateTime);
            await dispatch(setDeliveryDate(dateTime));
            setEdit(!edit);
          }}
        />
      )}
      <AppText color={colors.graytext} marginVertical={3}>{`${moment(
        deliveryDate,
      ).format('DD MMM YYYY')}`}</AppText>
    </AppView>
  );
};

export default CompanyDeliveryDate;
