import React from 'react';
import I18n from 'i18next';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useSelector } from 'react-redux';

import { autocompleteStyles, autocompleteStylesAr } from './styles';
import { GOOGLE_KEY } from '../../common/utils/Constants';

const AutoCompleteInput = ({ location, listViewDisplayed, goToLocation }) => {
  const lang = useSelector((state) => state.lang.lang);
  const rtl = useSelector((state) => state.lang.rtl);

  return (
    <GooglePlacesAutocomplete
      placeholder={I18n.t('map-input-placeholder')}
      listViewDisplayed={listViewDisplayed}
      fetchDetails
      renderDescription={(row) => row.description}
      onPress={(data, details = null) => {
        const pos = details.geometry.location;
        goToLocation({
          latitude: pos.lat,
          longitude: pos.lng,
        });
      }}
      query={{
        key: GOOGLE_KEY,
        language: lang,
        location,
        radius: '8000',
      }}
      isRowScrollable={false}
      numberOfLines={2}
      styles={rtl ? autocompleteStylesAr : autocompleteStyles}
      nearbyPlacesAPI="GooglePlacesSearch"
      debounce={200}
    />
  );
};

export default AutoCompleteInput;
