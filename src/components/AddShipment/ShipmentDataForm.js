import { useNetInfo } from '@react-native-community/netinfo';
import React, { useState } from 'react';
import I18n from 'i18next';
import { useSelector } from 'react-redux';
import {
  AppButton,
  AppInput,
  AppNavigation,
  AppRadioGroup,
  AppScrollView,
  AppText,
  AppView
} from '../../common';
import colors from '../../common/defaults/colors';
import RadioButton from '../../common/RadioButton';
import { PickersRepo } from '../../repo';
import NoNetworkConnection from '../NoNetworkConnection';
import useFetch from '../useFetch';
import DimensionsTypes from './DimensionsTypes';
import MultiSelectPicker from './MultiSelectPicker';

const pickersRepo = new PickersRepo();

const ShipmentDataForm = ({
  injectFormProps,
  isSubmitting,
  setFieldValue,
  setError,
  resetForm,
  handleSubmit,
}) => {
  const shipmentData = useSelector(state => state.shipment.shipmentData);

  const [newShipmentContent, setNewShipmentContent] = useState(
    shipmentData?.newShipmentContent,
  );
  const [documentOnly, setDocumentOnly] = useState(shipmentData?.documentOnly);

  const [dimensionsType, setDimensionsType] = useState(
    shipmentData?.height_value || 'cm',
  );
  const [weightType, setWeightType] = useState(
    shipmentData?.weight_value || 'kg',
  );
  const netInfo = useNetInfo();
  const receiverData = useSelector(state => state.shipment.receiverData);
  console.log(
    '🚀 ~ file: ShipmentDataForm.js ~ line 33 ~ ShipmentDataForm ~ senderData',
    receiverData?.country_id,
  );

  const {isLoading, data} = useFetch(pickersRepo.getShipmentContentType);
  console.log('newShipmentContent ', newShipmentContent);

  const [shipmentType, setShipmentType] = useState(
    shipmentData?.ship_type || 'fast',
  );

  if (!netInfo?.isConnected && netInfo.type !== 'unknown')
    return <NoNetworkConnection />;

  return (
    <AppScrollView flex stretch centerX paddingHorizontal={5}>
      <AppText size={8} marginHorizontal={5}>
        {I18n.t('ShipmenData')}
      </AppText>
      {receiverData?.country_id !== 27 ? (
        <AppRadioGroup
          horizontal
          initialValue={shipmentType}
          showError
          //   childrenMargin={3}
          margin={5}
          onSelect={value => {
            setFieldValue('ship_type', value);
            setShipmentType(value);
          }}>
          <RadioButton
            value="fast"
            labelItem={
              <AppText size={7} marginHorizontal={3}>
                {`${I18n.t('fastShipping')}`}
              </AppText>
            }
          />
          <RadioButton
            value="economy"
            labelItem={
              <AppText size={7} marginHorizontal={3}>
                {`${I18n.t('economyShipping')}`}
              </AppText>
            }
          />
        </AppRadioGroup>
      ) : null}
      <MultiSelectPicker
        provider={pickersRepo.getShipmentContentType}
        {...injectFormProps('content_type_id')}
        {...{setNewShipmentContent}}
        {...{setDocumentOnly}}
        title={I18n.t('shipmentContent')}
        extraData={'content_types'}
        {...{setFieldValue}}
        {...{resetForm}}
      />

      {newShipmentContent && (
        <AppInput
          marginVertical={3}
          {...injectFormProps('new_content_type')}
          placeholder={`${I18n.t('addOther')}`}
          onBlur={(name, text) => {
            data?.map((item, index) => {
              if (
                item.name.toLowerCase() ===
                text
                  .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
                  .toLowerCase()
              ) {
                setError(name, I18n.t('addDifferentContent'));
              }
            });
          }}
        />
      )}
      <AppInput
        maxLength={7}
        decimal
        marginVertical={3}
        {...injectFormProps('content_price')}
        placeholder={I18n.t('shipmentValue')}
        rightItems={
          <AppView stretch center>
            <AppText marginHorizontal={5} size={6}>
              {I18n.t('sar')}
            </AppText>
          </AppView>
        }
      />

      <AppText size={8} marginTop={5}>
        {I18n.t('enterShipmentDimensions')}
      </AppText>
      <DimensionsTypes
        {...{dimensionsType}}
        {...{setDimensionsType}}
        {...{weightType}}
        {...{setWeightType}}
        {...{setFieldValue}}
        {...{documentOnly}}
      />
      <AppView flex stretch row spaceBetween>
        {!documentOnly && (
          <AppView flex={0.48} stretch>
            <AppInput
              maxLength={8}
              decimal
              marginVertical={3}
              {...injectFormProps('width')}
              placeholder={I18n.t('shipmentWidth')}
            />
            <AppInput
              maxLength={8}
              decimal
              marginVertical={3}
              {...injectFormProps('length')}
              placeholder={I18n.t('shipmentLength')}
            />
            <AppInput
              maxLength={8}
              decimal
              marginVertical={3}
              {...injectFormProps('height')}
              placeholder={I18n.t('shipmentHeight')}
            />
          </AppView>
        )}
        <AppView flex={0.48} stretch>
          <AppInput
            maxLength={8}
            decimal
            {...injectFormProps('weight')}
            placeholder={I18n.t('shipmentWeight')}
          />
          <AppView flex stretch center>
          <AppText
          marginBottom={15}
          marginRight={5}
            line
            color={colors.primary}
            onPress={() => AppNavigation.push('ShipmentMeasurements')}>
            {I18n.t('How to measure the shipment')}
          </AppText>
          </AppView>
        </AppView>
      </AppView>
      <AppButton
        disabled={isSubmitting}
        onPress={handleSubmit}
        stretch
        marginVertical={10}
        linearGradient
        title={I18n.t('ShowShippingCompanies')}
      />
      <AppText center marginHorizontal={5} marginBottom={3}>
        {I18n.t('shipmentRestrictions')}
      </AppText>
      <AppText
        center
        marginBottom={5}
        color={colors.primary}
        onPress={() => AppNavigation.push('ShipmentsRestrictions')}>
        {` ${I18n.t('fromHere')}`}
      </AppText>

      {/* <AppText center marginBottom={3}>
        {I18n.t('ShipmentMeasurementsInstructions')}
      </AppText>
      <AppText
        center
        marginBottom={10}
        color={colors.primary}
        onPress={() => AppNavigation.push('ShipmentMeasurements')}>
        {` ${I18n.t('fromHere')}`}
      </AppText> */}
    </AppScrollView>
  );
};

export default ShipmentDataForm;
