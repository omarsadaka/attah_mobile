import React, {useCallback, useState} from 'react';
import {AppView} from '../../common';
import {LoadingPicker} from '..';
import I18n from 'i18next';
import BlockingView from '../BlockingView';
const LocationPickers = ({
  setFieldValue,
  data,
  pickersRepo,
  injectFormProps,
  setError,
  isEditable,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(
    data && data.country ? data.country.id : null,
  );
  const [selectedState, setSelectedState] = useState(
    data && data.state ? data.state.id : null,
  );
  const onSetSelectedState = useCallback(
    (name, value) => {
      if (value !== selectedState) {
        if (name === 'state_id') {
          setFieldValue(name, value);
          setSelectedState(value);
          setFieldValue('city_id', '');
        }
      }
    },
    [setFieldValue, selectedState],
  );
  const onSelectCountry = useCallback(
    (name, value) => {
      if (value !== selectedCountry) {
        if (name === 'country_id') {
          setFieldValue(name, value);
          setSelectedCountry(value);
          setFieldValue('state_id', '');
          setError('state_id', '');
          setSelectedState(null);
        }
      }
    },
    [setFieldValue, selectedCountry],
  );

  return (
    <AppView stretch>
      <LoadingPicker
        provider={pickersRepo.getCountryById}
        title={I18n.t('country')}
        {...injectFormProps('country_id')}
        setFieldValue={onSelectCountry}
        {...(data && data.country
          ? {initialValue: {label: data.country.name, id: data.country.id}}
          : {})}
      />
      <LoadingPicker
        param={selectedCountry}
        provider={pickersRepo.getStates}
        title={I18n.t('region')}
        setFieldValue={onSetSelectedState}
        {...injectFormProps('state_id')}
        // {...(data && data.state
        //   ? { initialValue: { label: data.state.name, id: data.state.id } }
        //   : {})}
      />
      <LoadingPicker
        param={selectedState}
        provider={pickersRepo.getCitites}
        title={I18n.t('city')}
        refresh={selectedState}
        {...{setFieldValue}}
        {...injectFormProps('city_id')}
        {...(data && data.city
          ? {initialValue: {label: data.city.name, id: data.city.id}}
          : {})}
      />
      {!isEditable && <BlockingView />}
    </AppView>
  );
};

LocationPickers.defaultProps = {
  isEditable: true,
};
export default LocationPickers;
