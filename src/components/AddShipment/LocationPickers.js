import React, {useCallback, useState} from 'react';
import {AppIcon, AppView} from '../../common';
import {LoadingPicker} from '..';
import I18n from 'i18next';
import BlockingView from '../BlockingView';
import colors from '../../common/defaults/colors';
import {useSelector} from 'react-redux';
import usePrevious from '../usePrevious';
const LocationPickers = ({
  setFieldValue,
  data,
  pickersRepo,
  injectFormProps,
  isEditable,
  sender,
  cityInjectFormProps,
  extraData,
  setError,
  setCountryId,
}) => {
  const receiverData = useSelector(state => state.shipment.receiverData);
  // console.log(
  //   '🚀 ~ file: LocationPickers.js ~ line 21 ~ receiverData --------- ',
  //   receiverData,
  // );
  const [selectedCountry, setSelectedCountry] = useState(
    receiverData?.country_id,
  );
  const [prevCountry, setPreviousCountry] = useState(selectedCountry);
  console.log(
    '🚀 ~ file: LocationPickers.js ~ line 26 ~ selectedCountry',
    selectedCountry,
  );
  // const prevCountry = usePrevious(selectedCountry);
  console.log(
    '🚀 ~ file: LocationPickers.js ~ line 34 ~ prevCountry',
    prevCountry,
  );

  const [selectedState, setSelectedState] = useState(receiverData?.state_id);
  const onSetSelectedState = useCallback(
    (name, value) => {
      if (value !== selectedState) {
        console.log(
          '🚀 ~ file: LocationPickers.js ~ line 32 ~ value',
          value,
          selectedState,
        );
        if (name === 'state_id') {
          setFieldValue(name, value);
          setSelectedState(value);
          setFieldValue(cityInjectFormProps || 'city_id', '');
        }
        if (name === 'stateName') {
          setFieldValue(name, value);
        }
      }
    },
    [setFieldValue, selectedState],
  );
  const onSelectCountry = useCallback(
    (name, value) => {
      if (value !== selectedCountry) {
        console.log('🚀 ~ file: LocationPickers.js ~ line 57 ~ value', value);
        console.log(
          '🚀 ~ file: LocationPickers.js ~ line 57 ~ selectedCountry',
          selectedCountry,
        );
        if (name === 'country_id') {
          setFieldValue(name, value);
          setSelectedCountry(prev => {
            console.log('🚀 ~ file: LocationPickers.js ~ line 72 ~ prev', prev);
            setPreviousCountry(prev);
            return value;
          });
          setCountryId(value);
          setFieldValue('state_id', '');
          setError('state_id', '');
          setSelectedState(null);
        }
        if (name === 'countryName') {
          setFieldValue(name, value);
        }
      }
    },
    [setFieldValue, selectedCountry],
  );
  console.log(
    'prevCountry',
    prevCountry,
    'selectedCountry',
    selectedCountry,
    'receiverData?.country_id',
    receiverData?.country_id,
    'ttttttttttttttttttttttt xxxx selectedCountry',
    selectedCountry,

    selectedCountry !== receiverData?.country_id ||
      (selectedCountry === receiverData?.country_id &&
        prevCountry !== receiverData?.country_id),
  );
  return (
    <AppView stretch>
      <LoadingPicker
        provider={
          sender ? pickersRepo.getCountryById : pickersRepo.getCountries
        }
        title={I18n.t('country')}
        extraData={'countryName'}
        {...injectFormProps('country_id')}
        setFieldValue={onSelectCountry}
        {...(receiverData?.country_id
          ? {
              initialValue: {
                label: receiverData?.countryName,
                id: receiverData?.country_id,
              },
            }
          : {})}
        paddingVertical={0}
        marginHorizontal={8}
        leftItems={
          <AppView
            width={10}
            stretch
            center
            backgroundColor={colors.primary}
            borderRadius={5}
            marginVertical={3}>
            <AppIcon
              stretch
              borderRadius={5}
              size={8}
              name="language"
              type="MaterialIcons"
            />
          </AppView>
        }
      />
      <LoadingPicker
        param={selectedCountry}
        provider={pickersRepo.getStates}
        title={I18n.t('region')}
        setFieldValue={onSetSelectedState}
        extraData={'stateName'}
        {...injectFormProps('state_id')}
        // refresh={
        //   selectedCountry !== receiverData?.country_id &&
        //   selectedCountry !== prevCountry
        // }
        refresh={
          selectedCountry !== receiverData?.country_id ||
          (selectedCountry === receiverData?.country_id &&
            prevCountry !== receiverData?.country_id)
        }
        {...(receiverData?.state_id
          ? {
              initialValue: {
                label: receiverData?.stateName,
                id: receiverData?.state_id,
              },
            }
          : {})}
        paddingVertical={0}
        marginHorizontal={8}
        leftItems={
          <AppView
            width={10}
            stretch
            center
            backgroundColor={colors.secondary}
            borderRadius={5}
            marginVertical={3}>
            <AppIcon
              stretch
              borderRadius={5}
              size={8}
              name="flag-variant-outline"
              type="MaterialCommunityIcons"
            />
          </AppView>
        }
      />
      <LoadingPicker
        param={selectedState}
        provider={pickersRepo.getCitites}
        title={I18n.t('city')}
        extraData={'cityName'}
        {...{setFieldValue}}
        {...injectFormProps(cityInjectFormProps || 'city_id')}
        refresh={selectedState !== receiverData?.state_id}
        {...(receiverData?.city_id
          ? {
              initialValue: {
                label: receiverData?.cityName,
                id: receiverData?.city_id,
              },
            }
          : {})}
        paddingVertical={0}
        marginHorizontal={8}
        leftItems={
          <AppView
            width={10}
            stretch
            center
            backgroundColor={colors.secondary1}
            borderRadius={5}
            marginVertical={3}>
            <AppIcon
              stretch
              borderRadius={5}
              size={8}
              name="home"
              type="Feather"
            />
          </AppView>
        }
      />
      {!isEditable && <BlockingView />}
    </AppView>
  );
};

LocationPickers.defaultProps = {
  isEditable: true,
  sender: false,
};
export default LocationPickers;
