import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { AppSpinner, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import { ScrollableContainer } from '../../components';
import { SideMenuRepo } from '../../repo';
import SectionContent from './SectionContent';

const sideMenuRepo = new SideMenuRepo();
const AboutApp = props => {
  const lang = useSelector(state => state.lang);

  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    // axios({
    //   method: 'get',
    //   url: `${BASE_URL}pages/about-us`,
    //   headers: {
    //     'Accept-Language': lang.lang == 'ar' ? 'ar' : 'en',
    //   },
    // })
    //   .then(response => {
    //     console.log('dadadad', response.data);
    //     setData(response.data);
    //     setLoading(false);
    //   })
    //   .catch(error => {
    //     console.log('error', error);
    //   });
    const data = await sideMenuRepo.aboutApp();
    console.log('data sssssssfff', data);
    setData(data);
    setLoading(false);
  };
  const {width} = useWindowDimensions();

  console.log(data);
  return (
    <ScrollableContainer
      center
      flex
      title={t('about-app')}
      backgroundColor={colors.gray}
      paddingHorizontal={5}>
      {loading ? (
        <AppView flex height={90} stretch center>
        <AppSpinner />
      </AppView>
      ) : (
        <SectionContent content={`${data.body || ''}`} />
        // <AppText >{data.body}</AppText>
      )}
    </ScrollableContainer>
  );
};

export default AboutApp;
