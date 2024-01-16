import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../api/utils/urls';
import { AppList, AppText, AppView } from '../../common';
import Navigation from '../../common/Navigation';
import Dimensions from '../../common/defaults/Dimensions';
import { Header, ScrollableContainer } from '../../components';
import ShipmentCard from './component/ShipmentCard';
import { heightPercent } from '../../common/utils/responsiveDimensions';

const ShippingAddress = props => {
  const [isReload, setIsReload] = useState(false);
  const lang = useSelector(state => state.lang);
  useEffect(() => {}, [isReload]);

  // useEffect(() => {
  //   const backAction = () => {
  //     // write code to handel navigation
  //     if (lang.lang == 'ar') AppNavigation.navigateToHomeAr(3);
  //     else AppNavigation.navigateToHome(0);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);

  return (
    <>
    <ScrollableContainer
    flex
    width={100}
    stretch
    title={i18next.t('shipment-addresses2')}
    center
    marginBottom={20}
    >
    <AppView height={100} stretch style={{height:'100%'}}>
      {/* <Header />
      <AppText size={13} marginHorizontal={4} marginTop={7}>
        {i18next.t('shipment-addresses2')}
      </AppText> */}

      <AppList
        flex
        mv={8}
        refreshControl={isReload}
        idPathInData={'id'}
        rowRenderer={(data, index) => (
          <ShipmentCard item={data} reload={() => setIsReload(!isReload)} />
        )}
        apiRequest={{
          url: `${BASE_URL}profile/user-addresses`,
          params: {
            paginate: 10,
          },
          responseResolver: response => {
            return {
              data: response.data,
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
    </ScrollableContainer>
      <TouchableOpacity
        style={[styles.add, lang.lang === 'en' ? styles.addEn : styles.addAr]}
        onPress={() =>
          Navigation.push({
            name: 'AddNewAddress',
          })
        }>
        <Image
          source={require('../../assets/imgs/add.png')}
          style={{width: 80, height: 80}}
        />
       <AppText size={7}>{i18next.t('add-address')}</AppText>
      </TouchableOpacity>
    </>
  );
};

export default ShippingAddress;

const styles = StyleSheet.create({
  listContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 5,
    marginBottom: Dimensions.DEVICE_HEIGHT * 0.1,
  },
  add: {
    flexDirection:'row',
    width: '50%', height:60,
    alignItems: 'center',
    position: 'absolute',
    bottom: 3,
  },
  addAr: {
    left: 5,
  },
  addEn: {
    right: 5,
  },
});
