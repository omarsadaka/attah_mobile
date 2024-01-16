import i18next from 'i18next';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Switch, View } from 'react-native';
import { useSelector } from 'react-redux';
import { AppText, AppView, TouchableView } from '../../../common';
import Navigation from '../../../common/Navigation';
import colors from '../../../common/defaults/colors';
import fonts from '../../../common/defaults/fonts';
import AddressRepo from '../../../repo/address';
import CheckBox from '@react-native-community/checkbox';
let addressRepo = new AddressRepo();
const ShipmentCard = ({item, reload}) => {
  const lang = useSelector(state => state.lang);
  const [active, setActive] = useState(item.is_primary);
  const [loading, setLoading] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const toggleSwitch = async () => {
    setLoading(true);
    setActive(previousState => !previousState);
    const data = await addressRepo.setAddressDefault(
      item.id,
      item.is_primary ? 0 : 1,
    );
    console.log('data update default', data);
    setLoading(true);
    if (data) reload();
  };
  return (
    <AppView
      flex
      stretch
      paddingHorizontal={5}
      marginHorizontal={5}
      marginVertical={3}
      style={styles.cardContainer}>
      <TouchableView style={{width:'100%'}}
         onPress={() =>
          Navigation.push({
            name: 'EditAddress',
            passProps: {
              addressID: item.id,
            },
          })
        }>
      <AppText style={styles.text}>{item.city_name}</AppText>
      <AppText style={styles.subText}>{item.address}</AppText>
     </TouchableView>
      <View
        style={{width: '100%', height: 0.5, backgroundColor: colors.grayText}}
      />
      <AppView flex stretch row spaceBetween marginTop={5}>
        <AppView flex stretch>
          <AppText style={[styles.text, {flex: 1}]}>
            {i18next.t('set-default')}
          </AppText>
        </AppView>
        {loading ? (
          <ActivityIndicator size={'small'} color={colors.error} />
        ) : (
          // <Switch
          //   trackColor={{false: 'gray', true: 'green'}}
          //   thumbColor={active ? 'white' : 'white'}
          //   ios_backgroundColor="#3e3e3e"
          //   onValueChange={toggleSwitch}
          //   value={item.is_primary}
          // />
          <CheckBox
           disabled={false}
           value={item.is_primary}
           onValueChange={(newValue) => {
            toggleSwitch()
          }}/>
        )}
      </AppView>
    </AppView>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
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

export default ShipmentCard;
