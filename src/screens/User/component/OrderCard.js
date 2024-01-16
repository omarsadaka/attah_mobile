import i18next from 'i18next';
import React, { useState, useEffect} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { useSelector } from 'react-redux';
import {
  AppNavigation,
  AppText,
  AppView,
  TouchableView,
  showError,
} from '../../../common';
import Dimensions from '../../../common/defaults/Dimensions';
import colors from '../../../common/defaults/colors';
import fonts from '../../../common/defaults/fonts';
import { UsersRepo } from '../../../repo';
import store from '../../../store/store';
import ProductCard2 from './ProductCard2';

let userRepo = new UsersRepo();
const OrderCard = ({item, isFinished, tabType, refreshData}) => {
  const lang = useSelector(state => state.lang);
  const [rate, setRate] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRate, setShawRate] = useState(true);


  useEffect(()=>{
    if(item.rate){
      if(item.rate.rate){
        setShawRate(false);
      }
    }
  },[tabType])

  const ratingCompleted = rating => {
    console.log('Rating is: ' + rating);
    setRate(rating);
  };

  const rateOrder = async () => {
    const obj = {
      order_id: item.id,
      rate: rate,
      comment: comment,
    };
    console.log('values', obj);
    if (rate) {
      if (comment) {
        setLoading(true);
        const data = await userRepo.rateOrder(item.store.id, obj);
        console.log('data', data);
        setLoading(false);
        setShawRate(false);
      } else {
        showError(i18next.t('enter-comment'));
      }
    } else {
      showError(i18next.t('enter-rate'));
    }
  };
  console.log('item',item)
  return (
    <TouchableOpacity
      key={item.id + item.store.id}
      style={styles.cardContainer}
      // marginHorizontal={5}
      // marginVertical={2}
      // borderWidth={1}
      // borderRadius={10}
      onPress={() => {
          AppNavigation.push({
            name: 'OrderDetails',
            passProps: {
              item: item,
              isFinished: isFinished,
              from: 'Orders',
            },
          });
      }}
      >
      <AppView
        style={[styles.statusContainer,{flexDirection:lang.lang=='ar'?'row':'row-reverse',}]}  paddingHorizontal={2}>
         
         <AppView style={{flex:1}}>
          <AppText stretch style={[styles.text,{textAlign: lang.lang=='en'?'right':'left'}]}>
            {'#'}
            {item.id}
          </AppText>
        </AppView>

          <AppView row>
          <View
            style={[
              styles.dot,
              {backgroundColor: isFinished ? '#90D38C' : '#FF9953'},
            ]}/>
          <AppText size={8}>{item?.status?.name}</AppText>
         </AppView>

       
       
      </AppView>

      <ProductCard2 item={item?.items[0]} isOrderDetails={false} />
      {isFinished && item.status.key != 'canceled' && showRate? ( 
        <AppView
          flex
          stretch
          center
          paddingTop={5}
          // onPress={() => {
          //   AppNavigation.push({
          //     name: 'OrderDetails',
          //     passProps: {
          //       item: item,
          //       isFinished: isFinished,
          //       from: 'Orders',
          //     },
          //   });
          // }}
          >
          <Text style={styles.text}>{i18next.t('rate-order')}</Text>
          <TouchableView center>
            <AirbnbRating
              type="custom"
              count={5}
              size={20}
              showRating={false}
              defaultRating={item.rate ? item.rate.rate : 0}
              tintColor={colors.white}
              onFinishRating={ratingCompleted}
              selectedColor="#FF9F57"
              unSelectedColor="#B5B5B5"
              starImage={require('../../../assets/imgs/star.png')}
              starContainerStyle={[lang.lang == 'en' ? styles.en : styles.ar]}
            />
          </TouchableView>
          <Text style={styles.subText}>{`(${
            item.rate ? item.rate.rate : rate
          })`}</Text>

          <AppView row flex stretch style={styles.commentContainer}>
            <TextInput
              placeholder={i18next.t('comment-on-order')}
              placeholderTextColor={colors.black}
              value={item.rate ? item.rate.comment : comment}
              onChangeText={value => setComment(value)}
              multiline
              style={{
                flex: 1,
                textAlignVertical: 'center',
                color: 'black',
                textAlign: lang.lang == 'ar' ? 'right' : 'left',
                fontFamily: fonts.normal,
              }}
            />
            <TouchableView
              stretch
              flex={0.2}
              center
              onPress={() => rateOrder()}>
              {loading ? (
                <ActivityIndicator size={'small'} color={colors.error} />
              ) : (
                <AppText center color={colors.primary}>
                  {i18next.t('send')}
                </AppText>
              )}
            </TouchableView>
          </AppView>
        </AppView>
      ) : null}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    // width: Dimensions.DEVICE_WIDTH,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.white,
    borderColor: '#66002521',
    borderWidth: 1,
    marginVertical: 4,
    marginHorizontal: 1,
    marginHorizontal: 10,
  },
  row: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    marginHorizontal: 3,
  },
  statusContainer: {
    // flex: 1,
    alignItems: 'center',
    // flexDirection: store.getState().lang.rtl ? 'row' : 'row-reverse',
    backgroundColor: '#66002521',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    // paddingHorizontal: 5,
    paddingVertical: 2,
  },

  commentContainer: {
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
    borderColor: '#66002521',
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  image: {
    width: Dimensions.DEVICE_WIDTH * 0.18,
    height: Dimensions.DEVICE_WIDTH * 0.18,
  },
  subText: {
    color: colors.black,
    fontFamily: fonts.normal,
    fontSize: 17,
    marginVertical: 4,
  },
  text: {
    color: colors.black,
    fontFamily: fonts.normal,
    fontSize: 19,
    marginVertical: 4,
  },
  gray_text: {
    width: '90%',
    color: colors.grayText,
    fontFamily: fonts.normal,
    fontSize: 18,
    marginVertical: 4,
    textAlign: store.getState().lang.rtl ? 'right' : 'left',
  },
  send: {
    color: colors.error,
    fontFamily: fonts.normal,
    fontSize: 18,
  },
  en: {
    transform: [{rotateY: '0deg'}],
  },
  ar: {
    transform: [{rotateY: '180deg'}],
  },
});

export default OrderCard;
