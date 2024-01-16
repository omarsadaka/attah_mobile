import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useSelector } from 'react-redux';
import Dimensions from '../../../common/defaults/Dimensions';
import colors from '../../../common/defaults/colors';
import fonts from '../../../common/defaults/fonts';

const DefaultSwiper = ({images}) => {
  const lang = useSelector(state => state.lang);
  return (
    <View style={styles.container}>
      <SwiperFlatList
        autoplay
        autoplayDelay={2}
        autoplayLoop
        index={lang.lang == 'en' ? 0 : images.length - 1}
        showPagination
        paginationDefaultColor={colors.grayText}
        paginationActiveColor={colors.error}
        paginationStyleItemActive={styles.active}
        paginationStyleItemInactive={styles.inActive}
        data={images}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.child}
            onPress={() => {
              Linking.canOpenURL(item.ad_url).then(supported => {
                if (supported) {
                  Linking.openURL(item.ad_url);
                } else {
                  console.log("Don't know how to open URI: " + item.ad_url);
                  showError(i18next.t('cannt-open-invoice'));
                }
              });
            }}>
            <Image
              style={styles.image}
              source={{uri: item.image ? item.image : item.file}}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Dimensions.DEVICE_HEIGHT * 0.02,
    height: Dimensions.DEVICE_HEIGHT * 0.25,
  },
  child: {
    height: Dimensions.DEVICE_HEIGHT * 0.2,
    alignItems: 'center',
    marginHorizontal: Dimensions.DEVICE_WIDTH * 0.01,
  },
  image: {
    width: Dimensions.DEVICE_WIDTH * 0.9,
    height: '100%',
    borderRadius: Dimensions.DEVICE_HEIGHT * 0.02,
    backgroundColor: colors.grayLight,
    opacity: 0.9,
  },
  active: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
  },
  inActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  title: {
    fontFamily: fonts.normal,
    color: colors.white,
    fontWeight: 'bold',
    fontSize: Dimensions.DEVICE_HEIGHT * 0.025,
    position: 'absolute',
    bottom: Dimensions.DEVICE_HEIGHT * 0.0,
    left: Dimensions.DEVICE_HEIGHT * 0.015,
    backgroundColor: colors.skyColor,
    paddingHorizontal: Dimensions.DEVICE_WIDTH * 0.05,
    paddingVertical: Dimensions.DEVICE_WIDTH * 0.01,
    opacity: 0.8,
  },
  left: {
    borderBottomLeftRadius: Dimensions.DEVICE_HEIGHT * 0.02,
    borderTopRightRadius: Dimensions.DEVICE_HEIGHT * 0.02,
  },
  right: {
    borderBottomRightRadius: Dimensions.DEVICE_HEIGHT * 0.02,
    borderTopLeftRadius: Dimensions.DEVICE_HEIGHT * 0.02,
  },
});

export default DefaultSwiper;
