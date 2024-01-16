import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Image, View ,TextInput, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';
import { AppButton, AppNavigation, AppText, AppView,showError, showSuccess } from '../../../common';
import Dimensions from '../../../common/defaults/Dimensions';
import colors from '../../../common/defaults/colors';
import fonts from '../../../common/defaults/fonts';
import { Header, LoadingView, ScrollableContainer } from '../../../components';
import AddressRepo from '../../../repo/address';
import ChooseCart from '../ChooseCart';
let addressRepo = new AddressRepo();
import { BagRepo } from '../../../repo';
let bagRepo = new BagRepo();
import i18next from 'i18next';
import Icon from 'react-native-vector-icons/Feather';
import ModalPicker from '../../../components/ModalPicker';
import ProductCard3 from '../component/ProductCard3';
import { useSelector } from 'react-redux';
// import Navigation from '../../../common/Navigation';
import { openLink } from '../../../components/InAppBrowser';
import { RadioButton } from 'react-native-paper';
import { Navigation } from 'react-native-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../../api/utils/urls';

const ShippingCompany = (props) => {
  const {storeID, Items} = props;
  const lang = useSelector(state => state.lang);
  const [data, setData] = useState([]);
  const [selectedID, setSelectedID] = useState('');
  const [coupon, setCoupon] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState(null);
  const [orderData, setOrderData] = useState({});
  const [message, setMessage] = useState('');
  const [loading_pay, setLoading_pay] = useState(false);
  const [loading_copon, setLoading_copon] = useState(false);
  const [discountCoast, setDiscountCoast] = useState(0);
  const [checked, setChecked] = useState(false);

  const [shippingID, setShippingID] = useState('');
  const [shippingName, setShippingName] = useState('');
  const [isPayed, setIsPayed] = useState(false);
  const Data=[{value:'1', name:'sama'}]
  const [isCoponApply, setIsCoponApply] = useState(false);

  

  useEffect(() => {
    Navigation.events().registerComponentDidDisappearListener(
      ({componentName}) => {
          console.log('componentName',componentName)
          if(componentName=='ShippingAddress'){
            getDefaultAddress2()
          }
      },
    );
  }, []);




  useEffect(() => {
    getDefaultAddress()
  }, []);

  const loadData = async (id) => {
    const obj = {
      user_address_id: id,
      store_id: storeID,
    };
    console.log('val', obj);
    const data = await addressRepo.getOtoShippingComp(obj);
    console.log('🚀 ~ file: ShippingCompany.js:31 ~ loadData ~ data', data);
    if (data.success === false) {
      if (data?.success === false) {
        setError(data.error);
      }
    } else {
      if (data) {
        console.log('🚀 ~ file: ShippingCompany.js:56 ~ loadData ~ data', data);
        const array=[]
        data.forEach(element => {
          const obj={
            id: element.id,
            name: element?.delivery_option_name? element.delivery_option_name: element.deliveryOptionName,
            price: element.price
          }
          array.push(obj)
        });
        setData(array);
        loadOrderSummary(id, data[0]?.deliveryOptionId? data[0].deliveryOptionId.toString(): data[0].delivery_option_id.toString(),
        data[0].price.toString())
      }
    }
  };

  const loadDataAfterBack = async (id) => {
    const obj = {
      user_address_id: id,
      store_id: storeID,
    };
    console.log('val', obj);
    const data = await addressRepo.getOtoShippingComp(obj);
    console.log('🚀 ~ file: ShippingCompany.js:31 ~ loadData ~ data', data);
    if (data.success === false) {
      if (data?.success === false) {
        setError(data.error);
      }
    } else {
      if (data) {
        console.log('🚀 ~ file: ShippingCompany.js:56 ~ loadData ~ data', data);
        const array=[]
        data.forEach(element => {
          const obj={
            id: element.id,
            name: element?.delivery_option_name? element.delivery_option_name: element.deliveryOptionName,
            price: element.price
          }
          array.push(obj)
        });
        setData(array);
        loadOrderSummary(id, data[0]?.deliveryOptionId? data[0].deliveryOptionId.toString(): data[0].delivery_option_id.toString(),
        data[0].price.toString())
      }
    }
  };

  const loadOrderSummary = useCallback(async (id, deliveryOptionId, delivery_charge) => {
    const values = {
      user_address_id: id,
      store_id: storeID,
      deliveryOptionId: deliveryOptionId,
      delivery_charge: delivery_charge,
    };
    console.log('data  values', values);
    const data = await bagRepo.getOrderSummary(values);
    console.log('🚀 ~ file: ChooseCart.js:48 ~ loadOrderSummary ~ data', data);
    if (data.id) setOrderData(data);
    if (data.msg) {
      if (data.msg?.needs_update) {
        showError(data.msg.message);
        setMessage(data.msg.message);
        settErrorType(data.msg.needs_update);
      } else {
        showError(data.msg);
        setMessage(data.msg);
      }
      setLoading(false);
    }else{
      setLoading(false);
    }
  }, [storeID]);

  const handleSubmit = async () => {
    setLoading_pay(true);
    console.log('orderData', orderData);
    const data = await bagRepo.createOrder(orderData?.id);
    console.log('data  order', data);
    setLoading_pay(false);
    if(data.payment_url){
      AppNavigation.push({
        name: 'PayWebView',
        passProps: {
          Url: data.payment_url,
          orderID: data.order_id,
        },
      });
      // setIsPayed(true)
      // onOpenLink(data.payment_url, orderData?.id)
    }
  };

  const handleCopon = async () => {
    const values = {
      promo_code: coupon,
      total: orderData?.total,
      order_id: orderData?.id,
    };
    setLoading_copon(true);
    const data = await bagRepo.checkCopon(values);
    console.log('data Copon', data);
    if(data.discount|| data.discount==0){
      setDiscountCoast(data.discount)
      showSuccess(i18next.t('success-coupon'))
      setIsCoponApply(true)
    }
    setLoading_copon(false);
    
  };

  const deleteCopon = async () => {
    setLoading_copon(true);
    const data = await bagRepo.deleteCopon(orderData?.id);
    console.log('data Copon', data);
    showSuccess(i18next.t('delete-coupon'))
    setIsCoponApply(false)
    setCoupon('')
    setDiscountCoast(0)
    setLoading_copon(false);
    
  };

  const onOpenLink = useCallback(async (link,id) => {
    await openLink(link,id, {});
    return async () => {
      // InAppBrowser.close();
      // checkPayment()
    };
  }, []);

  const checkPayment = async() => {
    const token = await AsyncStorage.getItem('@access_token');
    fetch(`${BASE_URL}orders/${orderData?.id}/check-payment`, {
      method: 'Get',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => res.json())
      .then(json => {
        console.log('json1', json);
        InAppBrowser.close();
        if (json.is_paid) {
          if (lang.lang == 'ar') Navigation.navigateToHomeAr(0);
          else Navigation.navigateToHome(3);
        } else {
          Navigation.pop();
        }
      })
      .catch(error => {
        console.log('checkPayment error', error);
        InAppBrowser.close();
        Navigation.pop();
      });
  };

  // useEffect(() => {
  //   if (data.length > 0) {
  //     // AppNavigation.push({
  //     //   name: 'ChooseCart',
  //     //   passProps: {
  //     //     storeID: storeID,
  //     //     addressID: addressID,
  //     //     price: data[0].price,
  //     //     id: data[0].deliveryOptionId,
  //     //   },
  //     // });
  //   }
  // }, [data]);

  // useEffect(() => {
  //   if (error !== null) {
  //     showError(error);
  //     // setTimeout(() => {
  //     AppNavigation.pop();
  //     // }, 10);
  //   }
  // }, [error, setError]);


  const getDefaultAddress= async()=>{
    setLoading(true)
    const data = await addressRepo.getDefaultAddress();
    console.log('data address', data);
    setAddress(data[0]);
    loadData(data[0]?.id ? data[0]?.id : '')
  }
  const getDefaultAddress2= async()=>{
    setLoading(true)
    const data = await addressRepo.getDefaultAddress();
    console.log('data address', data);
    setAddress(data[0]);
    loadDataAfterBack(data[0]?.id ? data[0]?.id : '')
    setLoading(false)
  }

  const defaultAddress=()=>{
    return(
      <AppView stretch padding={3} style={styles.defaultAddressCon}>
         <AppView stretch row style={{justifyContent:'space-between'}}>
          <AppText flex  color={colors.black} size={7}>
              {address?.address_city}
          </AppText>
          <TouchableOpacity onPress={()=>{
            AppNavigation.push('ShippingAddress');
          }}>
            <AppText center color={colors.error1}  size={8}>
              {i18next.t('edit')}
            </AppText>
          </TouchableOpacity>
         </AppView>
         {/* <AppText flex  color={colors.black} size={7}>
              {address?.address_city}
        </AppText> */}
        <AppText flex  color={colors.grayText} size={7}>
              {address?.address?address?.address:i18next.t('no-address')}
        </AppText>


      </AppView>
    )
  }

  const renderItem = ({item, index}) => (
  <TouchableOpacity style={{width:'100%', alignItems:'center', flexDirection:lang.lang=='ar'?'row': 'row-reverse'}}>
    <AppText flex  color={colors.black} size={8} style={{textAlign:'right'}}>
        {item.price} {i18next.t('sar')}
    </AppText>

    <View style={{width:'75%' ,flexDirection:lang.lang=='ar'?'row': 'row-reverse',alignItems:'center'}}>
     <AppText  color={colors.black} size={7} style={{flex:1}}>
        {i18next.t('shipping-period')}
     </AppText>

     <AppText  color={colors.black} size={7} marginHorizontal={2} >
        {item.name} 
     </AppText> 
    </View>
   
    <RadioButton
     value=""
     status={ checked? 'checked' : 'unchecked' }
     onPress={() => {
       setChecked(!checked)
       setShippingID(item.id)
       setShippingName(item.name)
     }}
     color={colors.error}
   />
  </TouchableOpacity>
 )
  

  const shippingAddress=()=>{
    return(
      <AppView stretch marginTop={8} padding={3} style={styles.defaultAddressCon}>
        <AppText flex  color={colors.black} size={8}>
            {i18next.t('chosse-shipping-company')}
        </AppText>
        <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        {/* <View style={{width:'100%',height:50, marginTop:6}}>
         <ModalPicker
            hint={i18next.t('choose')}
            height={Dimensions.DEVICE_HEIGHT * 0.4}
            data={data}
            hasBg={true}
            onTouchEnd={() => {}}
            defaultColor={colors.black}
            onSelect={value => {
              setShippingID(value.id)
              setShippingName(value.name)
            }}
           showIcon={false}/>
        </View> */}
      </AppView>
    )
  }
  const orderSammery=()=>{
    return(
    <AppView width={93} marginTop={8} padding={3}>
      <AppText flex  color={colors.black} size={8}>
            {i18next.t('orderSummary')}
      </AppText>

      <View style={styles.itemsCon}>
      {orderData?.items?.map(item => {
        return (
          <>
          <ProductCard3
            item={item}
          />
           <View style={{width:'100%', height:1, backgroundColor:'#66002521',marginVertical:4}}/>
          </>
        );
      })}
    </View>
    </AppView>
    )
  }

  const couponView=()=>{
    return(
      <AppView stretch marginTop={6} padding={3}>
       <AppView row stretch style={styles.coupon} paddingHorizontal={2}>
       <TextInput
        style={[styles.input,{textAlign: lang.lang=='ar'?'right':'left'}]}
        onChangeText={(text)=>{
          if(checked) setCoupon(text)
          else showError(i18next.t('chosse-shipping-company-first'));
        }}
        value={coupon}
        placeholder={i18next.t('discount-coupon')}
        placeholderTextColor={colors.error}
      />
      <TouchableOpacity onPress={()=>{
        if(coupon){
          if(!isCoponApply) handleCopon()
          else deleteCopon()
        }else{
          showError(i18next.t('enter-coupon'))
        }
      }}>
        {loading_copon?<ActivityIndicator size={'small'} color={colors.error1}/>:
         <AppText stretch  color={colors.error} size={8}>
         {isCoponApply? i18next.t('delete'): i18next.t('implement')}
       </AppText>
        }
      </TouchableOpacity>
       </AppView>
      </AppView>
    )
  }

  const priceView=()=>{
    return(
      <AppView stretch marginTop={6} padding={3}>
        <AppView stretch row style={{justifyContent:'space-between'}}>
         <AppText flex  color={colors.grayText} size={6}>
          {i18next.t('order-coast')}
         </AppText>
         <AppText  color={colors.black} size={6}>
          {orderData.subtotal?orderData.subtotal:'0'} {i18next.t('sar')}
         </AppText>
        </AppView>

        <AppView stretch row style={{justifyContent:'space-between',marginTop:10}}>
         <AppText flex  color={colors.grayText} size={6}>
          {i18next.t('shipping-coast')}
         </AppText>
         <AppText  color={colors.black} size={6}>
         {
          checked?
          orderData.delivery_charge?orderData.delivery_charge:'0'
          :'0'
         } {i18next.t('sar')}
         </AppText>
        </AppView>

        <AppView stretch row style={{justifyContent:'space-between',marginTop:10}}>
         <AppText flex  color={colors.grayText} size={6}>
          {i18next.t('tax-coast')}
         </AppText>
         <AppText  color={colors.black} size={6}>
         {orderData.order_added_tax?orderData.order_added_tax:'0'} {i18next.t('sar')}
         </AppText>
        </AppView>

        <AppView stretch row style={{justifyContent:'space-between',marginTop:10}}>
         <AppText flex  color={colors.grayText} size={6}>
          {i18next.t('discount-coast')}
         </AppText>
         <AppText  color={colors.black} size={6}>
         {discountCoast} {i18next.t('sar')}
         </AppText>
        </AppView>

      
        <View style={{width:'90%', height:1, backgroundColor: colors.grayText,marginVertical:6}}/>
        <AppView stretch row style={{justifyContent:'space-between',marginVertical:10}}>
         <AppText flex  color={colors.black} size={8}>
          {i18next.t('order-total')}
         </AppText>
         <AppText  color={colors.error1} size={8}>
         {
         checked?
         orderData?.total-discountCoast
         :
         (orderData?.total-discountCoast)-orderData?.delivery_charge
         } 
        {' '} {i18next.t('sar')}
         </AppText>
        </AppView>
      </AppView>
    )
  }
  return (
    // <AppView flex stretch  backgroundColor={'#FAF9FA'}>
    //    <Header />
      <ScrollableContainer center title={i18next.t('complete-order')}>
      <AppView flex stretch marginHorizontal={6}>
      {loading && error === null ? <LoadingView /> : null}
        {!loading && error ? (
          <AppView flex stretch center>
            <AppText stretch center color={colors.error1}>
              {error}
            </AppText>
          </AppView>
        ) : null}

        {!loading && error === null && data.length > 0 ? (
          <AppView stretch>
            <AppView row stretch style={{justifyContent:'space-between'}}>
            <AppText flex  color={colors.black} size={8}>
              {i18next.t('shipping-delivery')}
            </AppText>

            <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}}
            onPress={()=>{
              AppNavigation.push({
                name: 'AddNewAddress',
              })
            }}>
             <AppText center color={colors.error1}  size={7}>
              {i18next.t('add-address')}
             </AppText>
             <Image source={require('../../../assets/imgs/add.png')} style={{width:27, height:27}} />
            </TouchableOpacity>
        </AppView>
        {defaultAddress()}
        {shippingAddress()}
        {orderSammery()}
        {couponView()}
        {priceView()}

        <AppButton
        processing={loading_pay}
        stretch
        marginVertical={3}
        title={i18next.t('complete-pay')}
        onPress={() => {
            if(address){
              if(checked){
                 handleSubmit()
              }else {
              showError(i18next.t('chosse-shipping-company-first'))
             }
            }else{
              showError(i18next.t('choose-address'))
            }

          
        }}
       />
        </AppView>
       ) : null} 
      
      </AppView>
      </ScrollableContainer>
    
    // </AppView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  textRight: {
    textAlign: 'right',
    fontFamily: fonts.normal,
  },

  categoryContainer: {
    height: Dimensions.DEVICE_HEIGHT * 0.65,
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
  },
  text2: {
    flex: 1,
    color: colors.black,
    fontFamily: fonts.normal,
    fontSize: 20,
    marginHorizontal: 7,
    textAlign: 'right',
  },
  payCart: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 5,
    backgroundColor: colors.grayC,
    borderRadius: 5,
    borderWidth: 1,
    marginHorizontal: 10,
  },
  defaultAddressCon:{
    marginTop:6,
    borderColor:'#66002521',
    borderWidth:1,
    borderRadius:8,
    backgroundColor: colors.white
  },
  coupon:{
    borderColor:'#66002521',
    borderWidth:1,
    borderRadius:8,
    backgroundColor: colors.white,
  },
  input:{
    flex:1,
    fontFamily: fonts.normal,
    color: colors.error
  },
  itemsCon:{
    width:'100%',
    borderColor:'#66002521',
    borderWidth:1,
    borderRadius:8,
    backgroundColor: colors.white,
  }
 
});

export default ShippingCompany;
