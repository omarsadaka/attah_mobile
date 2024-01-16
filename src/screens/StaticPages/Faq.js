import i18next from 'i18next';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { BASE_URL } from '../../api/utils/urls';
import { AppList, AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import { Header, ScrollableContainer } from '../../components';
import FaqCard from '../Home/components/FaqCard';
import { t } from 'i18next';

const Faq = props => {
  useEffect(() => {}, []);

  return (
    <ScrollableContainer
    padding={5}
    // paddingVertical={10}
    flex
    stretch
    title={t('support')}>
    <AppView
      center
      flex
      stretch
      paddingHorizontal={5}
      marginTop={-5}>
      {/* <Header /> */}
      {/* <AppText size={13} marginHorizontal={10}>
        {i18next.t('support')}
      </AppText> */}
      <AppList
        flex
        mv={8}
        // refreshControl={}
        idPathInData={'id'}
        rowRenderer={(data, index) => <FaqCard item={data} />}
        apiRequest={{
          url: `${BASE_URL}faq`,
          params: {
            // paginate: 10,
          },
          responseResolver: response => {
            return {
              data: response.data.data,
              // pageCount: response.data.pageCount,
            };
          },
          onError: error => {
            i18next.t('ui-error-happened');
          },
        }}
        noResultsLabel={i18next.t('No found data')}
      />
    </AppView>
    </ScrollableContainer>
  );
};

export default Faq;

const styles = StyleSheet.create({
  categoryContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
  },
});
