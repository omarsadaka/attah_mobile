import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { AppText, AppView } from '../../../common';
import Dimensions from '../../../common/defaults/Dimensions';
import colors from '../../../common/defaults/colors';
import fonts from '../../../common/defaults/fonts';
const RateCard = ({item}) => {
  const lang = useSelector(state => state.lang);

  return (
    <AppView
      flex
      stretch
      margin={5}
      borderBottomWidth={1}
      borderColor={colors.grayText}
      paddingBottom={2}>
      <AppView flex stretch row center>
        <Image
          source={{uri: item?.user?.avatar}}
          resizeMode="cover"
          style={styles.image}
        />
        <AppView width={3} />
        <AppView flex stretch center>
          <AppText style={styles.text}>{item.comment}</AppText>
          <AppText style={styles.subText}>{item?.user?.name}</AppText>
        </AppView>
      </AppView>

      <AppText style={[styles.time, lang.rtl ? styles.ar : styles.en]}>
        {item.created_at}
      </AppText>
    </AppView>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.DEVICE_WIDTH * 0.95,
    alignItems: 'center',
    marginVertical: 10,
  },
  subText: {
    color: colors.grayText,
    fontFamily: fonts.normal,
    fontSize: 17,
    marginTop: 3,
  },
  text: {
    color: colors.black,
    fontFamily: fonts.normal,
    fontSize: 20,
  },
  time: {
    color: colors.grayText,
    fontFamily: fonts.normal,
    fontSize: 13,
    position: 'absolute',
    bottom: 4,
  },
  ar: {
    left: 10,
  },
  en: {
    right: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default RateCard;
