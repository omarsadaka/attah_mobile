import i18next from 'i18next';
import React from 'react';
import { StyleSheet } from 'react-native';
import { BASE_URL } from '../../../api/utils/urls';
import { AppList, AppView } from '../../../common';
import RateCard from './RateCard';

const StoresRates = ({storeID}) => {
  return (
    <AppView flex stretch>
      <AppList
        flatlist
        flex
        mv={8}
        columns={1}
        centerColumns
        // refreshControl={}
        idPathInData={'id'}
        rowRenderer={(data, index) => <RateCard item={data} />}
        apiRequest={{
          url: `${BASE_URL}store-ratings/${storeID}`,
          params: {
            paginate: 10,
          },
          responseResolver: response => {
            return {
              data: response.data.data,
              // pageCount: response.data.meta.current_page,
            };
          },
          onError: error => {
            i18next.t('ui-error-happened');
          },
        }}
        noResultsLabel={i18next.t('No found data')}
      />
    </AppView>
  );
};

export default StoresRates;

const styles = StyleSheet.create({
  cotainer: {
    width: '100%',
    alignItems: 'center',
  },
  listContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 5,
  },
});
