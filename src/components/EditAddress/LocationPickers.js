import React, { useCallback, useState } from 'react';
import { AppView } from '../../common';
import { LoadingPicker } from '..';
import I18n from 'i18next';
import BlockingView from '../BlockingView';
const LocationPickers = ({
  setFieldValue,
  data,
  pickersRepo,
  injectFormProps,
  isEditable,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(
    data && data.city ? data.city?.state?.country?.id : null,
  );
  const [selectedState, setSelectedState] = useState(
    data && data.city ? data.city?.state?.id : null,
  );
  const onSetSelectedState = useCallback(
    (name, value) => {
      setFieldValue(name, value);
      setSelectedState(value);
      setFieldValue('city_id', '');
    },
    [setFieldValue],
  );
  const onSelectCountry = useCallback(
    (name, value) => {
      setFieldValue(name, value);
      setSelectedCountry(value);
      // setFieldValue('state_id', '');
      // setSelectedState(null);
    },
    [setFieldValue],
  );

  return (
    <AppView stretch>
      <LoadingPicker
        provider={pickersRepo.getCountryById}
        title={I18n.t('country')}
        {...injectFormProps('country_id')}
        setFieldValue={onSelectCountry}
        {...(data && data.city
          ? { initialValue: { label: data.city?.state?.country.name, value: data.city?.state.country.id } }
          : {})}
      />
      <LoadingPicker
        param={selectedCountry}
        provider={pickersRepo.getStates}
        title={I18n.t('region')}
        setFieldValue={onSetSelectedState}
        {...injectFormProps('state_id')}
        refresh={selectedCountry !== data.city?.state.country.id}
        {...(data && data.city
          ? { initialValue: { label: data.city?.state.name, value: data.city?.state.id } }
          : {})}
      />
      <LoadingPicker
        param={selectedState}
        provider={pickersRepo.getCitites}
        title={I18n.t('city')}
        {...{ setFieldValue }}
        {...injectFormProps('city_id')}
        refresh={selectedState !== data.city?.state.id}
        {...(data && data.city && selectedState === data.city?.state.id
          ? { initialValue: { label: data.city.name, value: data.city.id } }
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
