import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { setTabIndex } from '../../../actions/auth';
import { AppNavigation, AppText, TouchableView } from '../../../common';
import Dimensions from '../../../common/defaults/Dimensions';
import colors from '../../../common/defaults/colors';
import fonts from '../../../common/defaults/fonts';
import { NotificationsRepo } from '../../../repo';
import store from '../../../store/store';
let notifApi = new NotificationsRepo();

const NotificationCard = ({item}) => {
  const lang = useSelector(state => state.lang);

  return (
    <TouchableView
      key={item.data.model_id}
      row
      spaceBetween
      borderRadius={10}
      borderWidth={1}
      marginHorizontal={5}
      marginVertical={2}
      padding={3}
      borderColor={'#66002521'}
      onPress={async () => {
        const data = await notifApi.makeNotifRead(item.id);
        console.log(
          '🚀 ~ file: NotificationCard.js:25 ~ onPress={ ~ item:',
          item,
        );
        console.log('data make read', data);
        if (item.data.type == 'order') {
          AppNavigation.push({
            name: 'OrderDetails',
            passProps: {
              item: {id: item.data.model_id},
              isFinished:
                item.data.status == 'canceled' ||
                item.data.status == 'delivering'
                  ? true
                  : false,
              from: 'Notifications',
            },
          });
        } else if (item?.data.type === 'chat') {
          store.dispatch(setTabIndex(0));
          AppNavigation.push({
            name: 'StoreDetails',
            passProps: {
              storeID: item.data.store_id.id,
              isChat: true,
            },
          });
        }
      }}>
      <View style={{alignSelf: 'flex-start'}}>
        {!item.is_read ? <View style={styles.dot} /> : null}
      </View>
      <View style={{alignItems: 'center', flex: 1,}}>
        <AppText style={styles.text}>
          {lang.lang == 'en'
            ? item.data.en
              ? item.data.en.title
              : item.data.title
            : item.data.ar
            ? item.data.ar.title
            : item.data.title}
        </AppText>
        <AppText style={styles.subText}>
          {lang.lang == 'en'
            ? item.data.en
              ? item.data.en.body
              : item.data.body
            : item.data.ar
            ? item.data.ar.body
            : item.data.body}
        </AppText>
        <AppText style={styles.gray_text}>{item.created_at}</AppText>
      </View>

     
      <View style={{alignItems: 'center',alignSelf:'flex-start'}}>
        <Image source={{uri: item?.data?.user?.avatar}} style={styles.image} resizeMode='cover' />
      </View>
    </TouchableView>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    // width: Dimensions.DEVICE_WIDTH * 0.95,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.white,
    borderColor: colors.grayText,
    borderWidth: 1,
    marginVertical: 4,
    marginHorizontal: 1,
    paddingVertical: 4,
    paddingHorizontal: 3,
    marginHorizontal: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#FF9953',
  },
  image: {
    width: Dimensions.DEVICE_WIDTH * 0.1,
    height: Dimensions.DEVICE_WIDTH * 0.1,
    borderRadius: Dimensions.DEVICE_WIDTH * 0.1/2,
  },
  subText: {
    width: '94%',
    color: colors.black,
    fontFamily: fonts.normal,
    fontSize: 17,
    marginVertical: 2,
    // textAlign: 'right',
  },
  text: {
    width: '94%',
    color: colors.black,
    fontFamily: fonts.normal,
    fontSize: 22,
    marginVertical: 2,
    // textAlign: 'right',
  },
  gray_text: {
    width: '94%',
    color: colors.grayText,
    fontFamily: fonts.normal,
    fontSize: 18,
    marginVertical: 2,
    // textAlign: 'right',
  },
  qnty: {
    width: Dimensions.DEVICE_WIDTH * 0.2,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#66002521',
    borderRadius: 7,
  },
});
export default NotificationCard;
