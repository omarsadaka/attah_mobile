import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import { AppNavigation } from '../../../common';
import Dimensions from '../../../common/defaults/Dimensions';
import colors from '../../../common/defaults/colors';
import fonts from '../../../common/defaults/fonts';

const Card = ({cardWidth, cardHeight, isEven, item, source, index, lenght}) => {
  const lang = useSelector(state => state.lang);

  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: item.color,
      
      transform: [{scaleX: lang.rtl ? -1 : 1}],
      }]}
      onPress={async () => {
        await AsyncStorage.setItem('CatID', item.id.toString());
        AppNavigation.push({
          name: 'Stores',
          passProps: {
            catID: item.id,
            category: item,
          },
        });
      }}>
      <Image
        source={item.image ? {uri: item.image} : source}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={[lang.lang == 'ar' ? styles.ar : styles.en]}>
        {lang.lang == 'en'
          ? item.en.name
            ? item.en.name
            : item.name
          : item.ar.name
          ? item.ar.name
          : item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default Card;
const styles = StyleSheet.create({
  en: {
    color: colors.black,
    fontSize: 17,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: fonts.normal,
    marginTop: 8,
    transform: [{rotateY: '0deg'}],
  },
  ar: {
    color: colors.black,
    fontSize: 17,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: fonts.normal,
    marginTop: 8,
    // transform: [{rotateY: '180deg'}],
  },
  container: {
    width: Dimensions.DEVICE_WIDTH * 0.3,
    height: Dimensions.DEVICE_WIDTH * 0.3,
    borderRadius: 8,
    marginHorizontal: 7,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.DEVICE_WIDTH * 0.17,
    height: Dimensions.DEVICE_WIDTH * 0.17,
  },
});
