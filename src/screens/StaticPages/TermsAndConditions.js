import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { AppSpinner, AppView } from '../../common';
import Dimensions from '../../common/defaults/Dimensions';
import { ScrollableContainer } from '../../components';
import { SideMenuRepo } from '../../repo';
import SectionContent from './SectionContent';

const sideMenuRepo = new SideMenuRepo();
const TermsAndConditions = props => {
  const lang = useSelector(state => state.lang);
  const {width} = useWindowDimensions();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    const data = await sideMenuRepo.terms();
    console.log('data sssssssfff', data);
    setData(data);
    setLoading(false);
  };

  return (
    <ScrollableContainer
      padding={5}
      paddingVertical={10}
      flex
      stretch
      title={t('termsAndConditions')}>
      <AppView stretch>
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
      </AppView>
    </ScrollableContainer>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({
  constainer: {
    height: 400,
  },
  web_view: {
    width: Dimensions.DEVICE_WIDTH,
    height: Dimensions.DEVICE_HEIGHT,
    marginVertical: Dimensions.DEVICE_HEIGHT * 0.03,
  },
});
