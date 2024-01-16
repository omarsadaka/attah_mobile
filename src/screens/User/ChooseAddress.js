import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../api/utils/urls';
import {
  AppButton,
  AppList,
  AppNavigation,
  AppText,
  AppView,
} from '../../common';
import Dimensions from '../../common/defaults/Dimensions';
import colors from '../../common/defaults/colors';
import fonts from '../../common/defaults/fonts';
import { Header } from '../../components';

const ChooseAddress = props => {
  const lang = useSelector(state => state.lang);
  const {storeID, shippingList} = props;
  const [checked, setChecked] = useState(false);
  const [addressID, setAddressID] = useState('');
  useEffect(() => {}, [checked]);

  return (
    <>
      <Header />
      <AppText size={13} marginHorizontal={4} marginTop={7}>
        {i18next.t('shipment-address')}
      </AppText>
      <AppText size={6.5} marginHorizontal={4} marginVertical={3}>
        {i18next.t('choose-address')}
      </AppText>
      <AppList
        flatlist
        flex
        marginTop={8}
        columns={1}
        centerColumns
        // refreshControl={}
        idPathInData={'id'}
        rowRenderer={(data, index) => (
          <AppView
            flex
            stretch
            paddingVertical={3}
            paddingHorizontal={5}
            marginHorizontal={5}
            marginVertical={2}
            borderWidth={1}
            borderRadius={10}
            borderColor={colors.grayText}>
            <AppView flex stretch row>
              <RadioButton.Android
                color="#FF9953"
                value={checked}
                status={checked == data.id ? 'checked' : 'unchecked'}
                onPress={() => {
                  setAddressID(data.id);
                  setChecked(data.id);
                }}
              />
              <AppText style={styles.text}>{data.city_name}</AppText>
            </AppView>

            <AppText style={styles.subText}>{data.address}</AppText>
            {checked == data.id ? (
              <AppButton
                processing={false}
                stretch
                marginVertical={3}
                title={i18next.t('complete-order')}
                onPress={() =>
                  AppNavigation.push({
                    name: 'ShippingCompany',
                    passProps: {
                      // shippingID: shippingID,
                      storeID: storeID,
                      addressID: addressID,
                      shippingList: shippingList,
                    },
                  })
                }
              />
            ) : null}
          </AppView>
        )}
        apiRequest={{
          url: `${BASE_URL}profile/user-addresses`,
          params: {
            // paginate: 10,
          },
          responseResolver: response => {
            return {
              data: response.data,
              // pageCount: response.data.pageCount,
            };
          },
          onError: error => {
            i18next.t('ui-error-happened');
          },
        }}
        noResultsLabel={i18next.t('No found data')}
      />
      {/* <TouchableOpacity
        style={styles.add}
        onPress={() =>
          Navigation.push({
            name: 'AddNewAddress',
          })
        }>
        <Image
          source={require('../../assets/imgs/add.png')}
          style={{width: 80, height: 80}}
        />
      </TouchableOpacity> */}
    </>
  );
};

export default ChooseAddress;

const styles = StyleSheet.create({
  listContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 5,
  },
  add: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 3,
    left: 5,
  },
  cardContainer: {
    width: Dimensions.DEVICE_WIDTH * 0.95,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.white,
    elevation: 3,
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    marginVertical: 4,
    marginHorizontal: 1,
    paddingVertical: 4,
  },
  subText: {
    color: colors.grayText,
    fontFamily: fonts.normal,
    fontSize: 17,
    marginVertical: 4,
  },
  text: {
    color: colors.black,
    fontFamily: fonts.normal,
    fontSize: 22,
    marginVertical: 4,
  },
});
