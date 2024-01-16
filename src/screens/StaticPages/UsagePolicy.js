import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { AppSpinner, AppView } from '../../common';
import { ScrollableContainer } from '../../components';
import { SideMenuRepo } from '../../repo';
import SectionContent from './SectionContent';

const sideMenuRepo = new SideMenuRepo();
const UsagePolicy = props => {
  const lang = useSelector(state => state.lang);
  const {width} = useWindowDimensions();

  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    // const headers = {
    //   'Accept-Language': lang.lang == 'ar' ? 'ar' : 'en',
    // };
    // axios({
    //   method: 'get',
    //   url: `${BASE_URL}pages/privacy-policy`,
    //   headers: headers,
    // })
    //   .then(response => {
    //     setData(response.data);
    //     setLoading(false);
    //   })
    //   .catch(error => {
    //     console.log('error', error);
    //   });

    const data = await sideMenuRepo.policy();
    setData(data);
    setLoading(false);
  };

  return (
    <ScrollableContainer
      padding={5}
      paddingVertical={10}
      flex
      stretch
      title={t('usagePolicy')}>
      {loading ? (
        <AppView flex height={90} stretch center>
          <AppSpinner />
        </AppView>
      ) : (
        // <AppText>{data.body}</AppText>
        <SectionContent content={`${data.body || ''}`} />
        // <AutoHeightWebView
        //   source={{uri: `https://atah.com.sa/${lang}/store/pages/privacy`}}
        //   scalesPageToFit={true}
        //   scrollEnabled={false}
        //   viewportContent={'width=device-width, user-scalable=no'}
        //   style={{width: width}}
        // />
      )}
    </ScrollableContainer>
  );
};

export default UsagePolicy;
