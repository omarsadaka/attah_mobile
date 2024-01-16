import i18next from 'i18next';
import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { AppText, AppView } from '../../../common';
import Navigation from '../../../common/Navigation';
import Dimensions from '../../../common/defaults/Dimensions';
import colors from '../../../common/defaults/colors';
import fonts from '../../../common/defaults/fonts';

const StoreCard = ({item, bg, catID}) => {
  const lang = useSelector(state => state.lang);
  return (
    <View
      style={{
        width: Dimensions.DEVICE_WIDTH * 0.95,
        alignItems: 'center',
        paddingTop: 6,
        alignSelf:'center'
      }}>
      <TouchableOpacity
        onPress={() =>
          Navigation.push({
            name: 'StoreDetails',
            passProps: {
              storeID: item.id,
              index: 1,
              catID: catID,
            },
          })
        }
        style={{
          width: Dimensions.DEVICE_WIDTH * 0.9,
          // height: Dimensions.DEVICE_HEIGHT * 0.14,
          flexDirection: lang.rtl ? 'row' : 'row-reverse',
          marginVertical: 20,
          marginHorizontal: 1,
          paddingVertical: 5,
          borderRadius: 13,
          borderColor: '#66002521',
          borderWidth: 1,
          backgroundColor: bg ? '#EFE9E9' : colors.white,
          
          // elevation: bg ? 0 : 3,
          // shadowOpacity: 0.3,
          // shadowOffset: {width: 1, height: 1},
        }}>
        {/* <ImageBackground
        style={styles.rateContainer}
        resizeMode="cover"
        source={require('../../../assets/imgs/rate_bg.png')}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 3}}>
          <Icon size={16} name="star" type="Feather" color={colors.white} />
          <Text
            style={{
              fontSize: 20,
              fontFamily: fonts.normal,
              color: colors.white,
              textAlign: 'center',
              textAlignVertical: 'center',
              marginTop: 3,
            }}>
            {item.rate}
          </Text>
        </View>
      </ImageBackground> */}
        <View
          style={{
            flex: 1,
            marginHorizontal: 7,
            marginLeft: lang.rtl ? 60 : undefined,
            marginRight: !lang.rtl ? 60 : undefined,
          }}>
          <AppText
            style={[{
              color: colors.black,
              fontSize: 20,
              fontFamily: fonts.normal,
            }]}>
            {item.name}
          </AppText>
         
          <AppText
            style={[{
              color: colors.black,
              fontSize: 13,
              fontFamily: fonts.normal,
            }]}
            >
            {item?.he_sells}
          </AppText>

          {/* <View
          style={{
            flexDirection: lang.lang == 'en' ? 'row-reverse' : 'row',
            alignItems: 'center',
            alignSelf:'flex-end',
          }}>
          <Icon size={16} name="star" type="Feather" color={colors.yellow} />
          <Text
            style={[{
                fontSize: 16,
                fontFamily: fonts.normal,
                color: colors.yellow,
                textAlign: 'center',
                textAlignVertical: 'center',
                marginTop: 3,
              }]}>
            {item.rate}
          </Text>
        </View> */}
        {!item.status?
         <AppView width={18} backgroundColor={colors.error} marginVertical={2} style={{alignSelf:'center',borderRadius:5}}>
         <AppText
         center
            style={{
              color: colors.white,
              fontSize: 15,
              fontFamily: fonts.normal,
              marginVertical:2
            }}
            >
            {item.status?'':i18next.t('close')}
          </AppText>
        </AppView>
        :null}
       
        </View>
        <Image
          source={
            item.logo
              ? {uri: item.logo}
              : require('../../../assets/imgs/logo.png')
          }
          style={[lang.lang=='ar'?styles.image_ar : styles.image_en]}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <ImageBackground
        style={[
          lang.lang == 'en' ? styles.en : styles.ar,
          styles.rateContainer,
        ]}
        resizeMode="cover"
        source={require('../../../assets/imgs/rate_bg.png')}>
        <View
          style={{
            flexDirection: lang.lang == 'en' ? 'row-reverse' : 'row',
            alignItems: 'center',
            marginTop: 3,
          }}>
          <Icon size={16} name="star" type="Feather" color={colors.white} />
          <AppView width={1.5}></AppView>
          <Text
            style={[
              lang.lang == 'en' ? styles.en : null,
              {
                fontSize: 20,
                fontFamily: fonts.normal,
                color: colors.white,
                textAlign: 'center',
                textAlignVertical: 'center',
                marginTop: 3,
              },
            ]}>
            {item.rate}
          </Text>
        </View>
      </ImageBackground>

      {/* <ImageBackground
        style={[
          lang.lang == 'en' ? styles.en : styles.ar,
          styles.rateContainer,
        ]}
        resizeMode='contain'
        // source={item.status || item.status== true?require('../../../assets/imgs/open_bg.png'): require('../../../assets/imgs/closed_bg.png')}
        source={require('../../../assets/imgs/rate_bg.png')}>
          <Text
            style={[
              lang.lang == 'en' ? styles.en : styles.ar,
              {
                fontSize: 17,
                fontFamily: fonts.normal,
                color: item.status || item.status== true?'green':colors.primary,
                textAlign: 'center',
                textAlignVertical: 'center',
                marginTop: 3,
              },
            ]}>
            {item.status || item.status== true?i18next.t('open'):i18next.t('close')}
          </Text>
      </ImageBackground>
     */}
    </View>
  );
};
const styles = StyleSheet.create({
  image_ar: {
    width: Dimensions.DEVICE_WIDTH * 0.25,
    height: Dimensions.DEVICE_HEIGHT * 0.13,
    borderRadius: 10,
    marginTop: -Dimensions.DEVICE_HEIGHT * 0.04,
    marginEnd: -Dimensions.DEVICE_WIDTH*0.03,
    overflow: 'hidden',
  },
  image_en: {
    width: Dimensions.DEVICE_WIDTH * 0.25,
    height: Dimensions.DEVICE_HEIGHT * 0.13,
    borderRadius: 10,
    marginTop: -Dimensions.DEVICE_HEIGHT * 0.04,
    marginStart: -Dimensions.DEVICE_WIDTH*0.03,
    overflow: 'hidden',
  },
  rateContainer: {
    width: Dimensions.DEVICE_WIDTH * 0.18,
    height: Dimensions.DEVICE_HEIGHT * 0.05,
    // marginTop: Dimensions.DEVICE_HEIGHT * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: Dimensions.DEVICE_HEIGHT * 0.05,
  },
  statusContainer:{
    width: Dimensions.DEVICE_WIDTH * 0.18,
    height: Dimensions.DEVICE_HEIGHT * 0.05,
    // marginTop: Dimensions.DEVICE_HEIGHT * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: Dimensions.DEVICE_HEIGHT * 0.11,
  },
  ar: {
    left: Dimensions.DEVICE_WIDTH*0.001,
   
  },
  en: {
    right: Dimensions.DEVICE_WIDTH * 0.001,
    transform: [{rotateY: '180deg'}],
  },
});

export default StoreCard;
