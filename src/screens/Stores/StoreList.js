import i18next from 'i18next';
import React from 'react';
import { BASE_URL } from '../../api/utils/urls';
import { AppList } from '../../common';
import StoreCard from './components/StoreCard';

const StoreList = props => {
  const {catID, subCatID, word, nearBy, isFilter, setNumber} = props;

  return (
    <AppList
      flex
      stretch
      idPathInData={'id'}
      rowRenderer={(data, index) => (
        <StoreCard item={data} bg={isFilter} catID={catID} />
      )}
      apiRequest={{
        url: `${BASE_URL}stores?category_id=${catID}&subcategory_id=${
          subCatID === 'all' ? '' : subCatID
        }&public_search=${word}&near_by=${nearBy}`,
        params: {
          paginate: 10,
        },
        responseResolver: response => {
          setNumber(response.data.length);
          return {
            data: response.data,
            // pageCount: response.meta.current_page,
          };
        },
        onError: error => {
          i18next.t('ui-error-happened');
        },
      }}
      noResultsLabel={i18next.t('No found data')}
    />
  );
};

export default StoreList;
