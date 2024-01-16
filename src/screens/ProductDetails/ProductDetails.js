import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard
} from 'react-native';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useSelector } from 'react-redux';
import {
  AppButton,
  AppImage,
  // AppInput,
  AppText,
  AppView,
  showError,
  showSuccess,
} from '../../common';
import AppInput from '../../components/newComponents/input';
import Navigation from '../../common/Navigation';
import Dimensions from '../../common/defaults/Dimensions';
import colors from '../../common/defaults/colors';
import fonts from '../../common/defaults/fonts';
import { LoadingView, ScrollableContainer } from '../../components';
import { AuthRepo, BagRepo, FavouriteRepo, StoreRepo } from '../../repo';
import store from '../../store/store';
import AdditionCard from './AdditionCard';
import AdditionCard2 from './AdditionCard2';

const systemFonts = [...defaultSystemFonts, fonts.normal, fonts.bold];

let storeRepo = new StoreRepo();
let favouriteRepo = new FavouriteRepo();
let bagRepo = new BagRepo();
const authRepo = new AuthRepo();
const ProductDetails = props => {
  const radioButtonsData = [
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Option 1',
      value: 'option1',
    },
    {
      id: '2',
      label: 'Option 2',
      value: 'option2',
    },
  ];
  const {item} = props;
  const lang = useSelector(state => state.lang);
  const [loadingView, setLoadingView] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [loading_fav, setLoading_fav] = useState(false);
  const [product, setProduct] = useState(null);
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [propertiesPrice, setPropertiesPrice] = useState('0');
  const [productPrice, setProductPrice] = useState('');
  const [description, setDescription] = useState('');
  const [flag_view, setFlag_view] = useState(false);
  const [inx, setInx] = useState(1);
  const [images, setImages] = useState([]);
  const [qnty, setQnty] = useState(1);
  const [properties, setProperties] = useState([]);
  const [propertyID, setPropertyID] = useState('');
  const [propertyOptionID, setPropertyOptionID] = useState('');
  const [optionData, setOptionData] = useState([]);
  const [desc_view_flag, setDesc_view_flag] = useState(true);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [checkedID, setCheckedID] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await storeRepo.getProductByID(item.id);
    console.log('product by iddd', data);
    const arr = [];
    data?.attachments.forEach(element => {
      arr.push(element.file);
    });
    setImages([data.image, ...arr]);
    setProduct(data);
    if (!product?.property) {
      setFlag_view(true);
    }
    setProductPrice(
      product?.price_after_discount
        ? product.price_after_discount
        : product?.product_cost,
    );
    setLoadingView(false);
  };

  const addToFav = async () => {
    setLoading_fav(true);
    const data = await favouriteRepo.addToFav({product_id: item.id});
    console.log('addToFav', data);
    setLoading_fav(false);
    loadData();
  };

  const delFromFav = async () => {
    setLoading_fav(true);
    const data = await favouriteRepo.deleteFromFav(item.id);
    console.log('deleteToFav', data);
    setLoading_fav(false);
    loadData();
  };
  const addToCart = async () => {
    console.log('properties', properties);
    setLoading(true);
    const dataToSend = {
      product_id: item.id,
      quantity: qnty.toString(),
      device_id: '',
    };
    if (properties.length > 0) {
      dataToSend.property = properties;
    }
    console.log('dataToSend', dataToSend);
    const data = await bagRepo.addToBag(dataToSend);
    console.log('addToCart', data);
    if (data.error) {
      showError(data.error);
    }

    await authRepo.getCartCount();
    setLoading(false);
    if (data) {
      showSuccess(i18next.t('add-toCart-success'));
      Navigation.pop();
    }
  };
  const onPressRadioButton = radioButtonsArray => {
    setRadioButtons(radioButtonsArray);
  };

  const header = () => {
    return (
      <AppView row srtetch>
        <AppView flex stretch height={28}>
          {images.length > 0 ? (
            <SwiperFlatList
              autoplay
              autoplayDelay={2}
              autoplayLoop
              autoplayInvertDirection
              // index={lang === 'en' ? 0 : images.length - 1}
              showPagination
              paginationActiveColor={colors.primary}
              data={images.length > 0 ? images : []}
              renderItem={({item}) => {
                return (
                  <AppView flex stretch>
                    <AppImage
                      width={100}
                      stretch
                      // height={25}
                      flex
                      resizeMode={'contain'}
                      source={{uri: item}}
                    />
                  </AppView>
                );
              }}
            />
          ) : null}
        </AppView>
        <AppView stretch row spaceBetween style={styles.btnsCotainer}>
          <TouchableOpacity
            onPress={() => Navigation.pop(props.componentId)}
            style={{
              backgroundColor: colors.grayText,
              width: Dimensions.DEVICE_HEIGHT * 0.06,
              height: Dimensions.DEVICE_HEIGHT * 0.06,
              borderRadius: (Dimensions.DEVICE_HEIGHT * 0.06) / 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../assets/imgs/back1.png')}
              style={[lang.lang == 'en' ? styles.en : null, styles.icon]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.fav}
            onPress={() => {
              if (product.is_favourite) delFromFav();
              else addToFav();
            }}>
            {loading_fav ? (
              <ActivityIndicator size={'small'} color={colors.error} />
            ) : (
              <Image
                source={
                  product?.is_favourite
                    ? require('../../assets/imgs/heart2.png')
                    : require('../../assets/imgs/heart-w.png')
                }
                style={{with: 22, height: 22}}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
        </AppView>
      </AppView>
    );
  };

  return (
    <AppView flex backgroundColor={colors.grayC}>
      {header()}
      {loadingView ? (
        <LoadingView />
      ) : (
        <>
          <ScrollableContainer center hideBack marginTop={-20}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingHorizontal: 15,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: 7,
                }}>
                <AppText size={8} style={{flex: 1}}>
                  {lang.lang == 'ar' ? product?.ar?.name : product?.en?.name}
                </AppText>
              </View>
              {product.has_discount || product.has_discount == 1 ? (
                <AppText
                  size={6.5}
                  color={colors.grayText}
                  marginVertical={1}
                  style={{
                    textDecorationLine: 'line-through',
                    textDecorationStyle: 'solid',
                  }}>
                  {product?.price_pre_discount} {i18next.t('sar')}
                </AppText>
              ) : null}
              <View
                style={{
                  backgroundColor: '#FF9953',
                  borderRadius: 6,
                  padding: 5,
                  alignSelf: store.getState().lang.rtl
                    ? 'flex-end'
                    : 'flex-start',
                }}>
                {product.has_discount ? (
                  <AppText size={8} center color={colors.white}>
                    {parseInt(product.price_after_discount) +
                      parseInt(propertiesPrice)}{' '}
                    {i18next.t('sar')}
                  </AppText>
                ) : (
                  <AppText size={8} center color={colors.white}>
                    {parseInt(product.price) + parseInt(propertiesPrice)}{' '}
                    {i18next.t('sar')}
                  </AppText>
                )}
              </View>
              {product?.ar?.description || product?.en?.description ? (
                <AppText
                  size={8}
                  style={{flex: 1, marginTop: 10, marginBottom: '3%'}}
                  color={colors.black}>
                  {i18next.t('product-details')}
                </AppText>
              ) : null}

              {product.description.length > 150 ? (
                <>
                  {desc_view_flag ? (
                    <AppView  stretch>
                      <View style={{flex: 1}}>
                        <RenderHtml
                          source={{
                            html: product.description,
                          }}
                          containerStyle={{width: '100%'}}
                          defaultTextProps={{
                            numberOfLines: 1,
                          }}
                          ignoredTags={['img']}
                          systemFonts={systemFonts}
                          baseStyle={{fontFamily: fonts.normal, fontSize: 16}}
                        />
                      </View>
                      <View style={{width:'100%',alignItems:'flex-start',marginTop: -10}}> 
                      <TouchableOpacity
                        onPress={() => setDesc_view_flag(false)}
                        style={{ alignContent:'flex-end'}}>
                        <AppText
                          size={6}
                          color={colors.error}
                          style={{marginTop: 15}}>
                          {i18next.t('show-more')}
                        </AppText>
                      </TouchableOpacity>
                      </View>
                    </AppView>
                  ) : (
                    <AppView stretch>
                      <View style={{flex: 1}}>
                        <RenderHtml
                          source={{
                            html: product.description,
                          }}
                          containerStyle={{width: '100%'}}
                          ignoredTags={['img']}
                          systemFonts={systemFonts}
                          baseStyle={{fontFamily: fonts.normal, fontSize: 16}}
                        />
                      </View>
                      <TouchableOpacity
                        onPress={() => setDesc_view_flag(true)}
                        style={{marginTop: -10, alignSelf: 'flex-start'}}>
                        <AppText size={6} color={colors.error}>
                          {i18next.t('show-less')}
                        </AppText>
                      </TouchableOpacity>
                    </AppView>
                  )}
                </>
              ) : (
                <RenderHtml
                  source={{
                    html: product.description,
                  }}
                  containerStyle={{width: '100%'}}
                  ignoredTags={['img']}
                  systemFonts={systemFonts}
                  baseStyle={{fontFamily: fonts.normal, fontSize: 16}}
                />
              )}

              {/* <View style={styles.line} /> */}
              {product?.property.length > 0 ? (
                <AppText
                  size={8}
                  color={colors.black}
                  marginBottom={3}
                  marginTop={desc_view_flag? 3: -3}>
                  {i18next.t('product-chooise')}
                </AppText>
              ) : null}

              {product?.property.length > 0 ? (
                <AppView
                  flex
                  stretch
                  backgroundColor={colors.grayC}
                  padding={3}
                  style={{
                    borderRadius: 8,
                    borderColor: '#66002521',
                    borderWidth: 1,
                  }}>
                  {product?.property.map((el, index) => {
                    return (
                      <AppView flex stretch>
                        <AppView row>
                          <AppText
                            size={7}
                            color={'grey'}
                            style={{marginTop: 5}}>
                            {el.has_options ? i18next.t('choose') : ''}{' '}
                            {el?.name}
                          </AppText>
                          {el.is_required ? (
                            <AppText
                              size={9}
                              color={colors.error1}
                              style={{marginTop: 5}}>
                              {'*'}
                            </AppText>
                          ) : (
                            <AppText
                              size={6}
                              color={'grey'}
                              style={{marginHorizontal: 5, marginTop: 5}}>
                              {i18next.t('optional')}
                            </AppText>
                          )}
                        </AppView>
                        {el.has_options ? (
                          <View style={[styles.spinner]}>
                            <FlatList
                              data={el?.options}
                              renderItem={({item}) => (
                                //   <View style={{alignItems:'center', flexDirection:lang.lang=='ar'?'row':'row-reverse' ,marginVertical:2}}>
                                //   <AppText color={colors.black} size={8}>
                                //       {item?.price} {i18next.t('sar')}
                                //    </AppText>
                                //    <AppText color={colors.black}  marginHorizontal={3} size={6.5} style={{flex:1}}>
                                //       {item?.name}
                                //    </AppText>
                                //    <TouchableOpacity style={[styles.uncheckedView,{borderColor: checkedID==item?.id?colors.error:colors.grayText}]}
                                //    onPress={()=> {
                                //     setCheckedID(item.id)
                                //        const obj={
                                //         id: el.id,
                                //         property_option_id : item.id,
                                //         property_option_qty : qnty.toString(),
                                //         txt_property_value : ""
                                //       }
                                //         const i = properties.findIndex(e => e.id === el.id);
                                //         if (i > -1) {
                                //            properties[i].property_option_id=item.id
                                //         }else{
                                //           setProperties(oldArray => [obj,...oldArray] );
                                //         }
                                //     }}>
                                //     {checkedID==item?.id?
                                //      <View style={styles.checkedView}></View>
                                //     :null}
                                //    </TouchableOpacity>
                                // </View>

                                <AdditionCard
                                  item={item}
                                  onSelect={item => {
                                    const obj = {
                                      id: el.id,
                                      property_option_id: item.id,
                                      property_option_qty: qnty.toString(),
                                      txt_property_value: '',
                                    };
                                    const i = properties.findIndex(
                                      e => e.id === el.id,
                                    );
                                    if (i > -1) {
                                      properties[i].property_option_id =
                                        item.id;
                                    } else {
                                      setProperties(oldArray => [
                                        obj,
                                        ...oldArray,
                                      ]);
                                    }
                                  }}
                                  onRemove={item => {
                                    const arr = properties.filter(
                                      ob => ob.property_option_id != item.id,
                                    );
                                    setProperties(arr);
                                  }}
                                  isContain={() => {
                                    const i = properties.findIndex(
                                      e => e.id === el.id,
                                    );
                                    if (i > -1) return true;
                                    else return false;
                                  }}
                                />
                              )}
                              keyExtractor={item => item.id}
                            />
                          </View>
                        ) : (
                          <>
                            <Text
                              style={[
                                styles.checkboxLabel,
                                {
                                  textAlign:
                                    lang.lang == 'ar' ? 'left' : 'right',
                                },
                              ]}>
                              {el?.price} {i18next.t('sar')}
                            </Text>
                            <AppView row stretch>
                              {/* <AppInput
                                flex
                                isAddition={true}
                                placeholderColor={colors.grayText}
                                onChangeText={(text)=>{
                                   setDescription(text)
                                }}
                                value={description}
                                onBlur={description => {
                                  const obj = {
                                    id: el.id,
                                    property_option_id: null,
                                    property_option_qty: null,
                                    txt_property_value: description,
                                  };
                                  const i = properties.findIndex(
                                    e => e.id === el.id,
                                  );
                                  if (i > -1) {
                                    if (description) {
                                      properties[i].txt_property_value =
                                        description;
                                    } else {
                                      properties?.splice(i, 1);
                                    }
                                  } else {
                                    if (description)
                                      setProperties(oldArray => [
                                        obj,
                                        ...oldArray,
                                      ]);
                                  }
                                }}
                                placeholder={i18next.t('write-comment')}
                              /> */}
                              {/* <AppForm
                                schema={{
                                  description: '',
                                }}
                                render={renderContent}
                                {...{onSubmit}}
                              /> */}
                              <AdditionCard2
                                onBlur={description => {
                                  setIsKeyboardVisible(false);
                                  const obj = {
                                    id: el.id,
                                    property_option_id: null,
                                    property_option_qty: null,
                                    txt_property_value: description,
                                  };
                                  const i = properties.findIndex(
                                    e => e.id === el.id,
                                  );
                                  if (i > -1) {
                                    if (description) {
                                      properties[i].txt_property_value =
                                        description;
                                    } else {
                                      properties?.splice(i, 1);
                                    }
                                  } else {
                                    if (description)
                                      setProperties(oldArray => [
                                        obj,
                                        ...oldArray,
                                      ]);
                                  }
                                }}
                                onFocus={() => setIsKeyboardVisible(true)}
                              />
                              {/* 
                              <AppInput
                    title={i18next.t('write-comment')}
                    value={description}
                    onChangeText={value =>{
                       setDescription(value)
                    }}
                    isEdit={true}
                    onBlur={()=>{
                      const obj={
                        id: el.id,
                        property_option_id : null,
                        property_option_qty : null,
                        txt_property_value : description
                      }
                      
                      const i = properties.findIndex(e => e.id === el.id);
                      if (i > -1) {
                        properties[i].txt_property_value=description
                      }else{
                        setProperties(oldArray => [obj,...oldArray] );
                      }
                    }}
                  /> */}
                            </AppView>
                          </>
                        )}
                      </AppView>
                    );
                  })}

                  {/* <View style={styles.row}>
                  <AppText size={8} color={colors.black}>
                    {i18next.t('product-chooise')}
                  </AppText>

                  <View
                    style={{
                      alignItems: 'center',
                      width: '100%',
                    }}>
                    <AppText
                      size={7}
                      color={colors.black}
                      style={{marginTop: 5}}>
                      {product?.property[0]?.name}
                    </AppText>

                    <View
                      style={[
                        styles.spinner,
                      ]}>
                      {product?.property?.has_options ? (
                        <ModalPicker
                          hint={i18next.t('choose')}
                          // style={{flex: 1}}
                          height={Dimensions.DEVICE_HEIGHT * 0.4}
                          data={product?.property?.options}
                          hasBg={true}
                          onTouchEnd={() => {}}
                          defaultColor={colors.black}
                          onSelect={value => {
                            setPropertiesID(value.id);
                            setPropertiesPrice(value.price);
                          }}
                          showIcon={false}
                        />
                      ) : null}
                    </View>
                  </View>
                  {product?.property[0]?.price != '0.00' ? (
                    <Text style={[styles.checkboxLabel, {textAlign: 'right'}]}>
                      {product?.property[0]?.price} {i18next.t('sar')}
                    </Text>
                  ) : null}
                </View>

                {!product?.property?.has_options ? (
                  <AppInput
                    title={i18next.t('write-comment')}
                    value={description}
                    onChangeText={value => setDescription(value)}
                    isEdit={true}
                  />
                ) : null} */}

                  {/* <AppButton
              processing={loading}
              stretch
              marginVertical={5}
              title={i18next.t('add-additional-fields')}
              onPress={() => {
               
              }}
            /> */}
                </AppView>
              ) : null}

              {!flag_view ? (
                <View style={{width: '100%', marginTop: 10}}>
                  {/* {product?.sku ? (
                  <View style={[styles.row, {alignSelf: 'flex-end'}]}>
                    <AppText size={8} color={colors.black}>
                      {i18next.t('product-code')}
                    </AppText>
                    <AppText
                      size={7}
                      color={colors.grayText}
                      style={{marginTop: 5}}>
                      {product?.sku}
                    </AppText>
                  </View>
                ) : null} */}
                  {/* <View style={styles.line} /> */}
                  <View style={styles.row}>
                    <AppText size={8} color={colors.black}>
                      {i18next.t('product-availability')}
                    </AppText>
                    <AppText
                      size={7}
                      color={colors.grayText}
                      style={{marginTop: 5}}>
                      {product?.is_available
                        ? i18next.t('available')
                        : i18next.t('not-available')}
                    </AppText>
                  </View>
                  <View style={styles.line} />
                  <View style={styles.row}>
                    <AppText size={8} color={colors.black}>
                      {i18next.t('product-weight')}
                    </AppText>
                    <AppText
                      size={7}
                      color={colors.grayText}
                      style={{marginTop: 5}}>
                      {`${product?.weight} ${product?.weight_type}`}
                    </AppText>
                  </View>
                  <View style={styles.line} />
                  {/* <View style={styles.row}>
                  <AppText size={8} color={colors.black}>
                    {i18next.t('product-qnty')}
                  </AppText>
                  <AppText
                    size={7}
                    color={colors.grayText}
                    style={{marginTop: 5}}>
                    {item.quantity != 0
                      ? item.quantity
                      : item.unspecified_quantity == 1
                      ? i18next.t('unspecified_quantity')
                      : i18next.t('no_quantity')}
                  </AppText>
                </View>
                <View style={styles.line} /> */}
                  {/* <View style={styles.row}>
                  <AppText size={8} color={colors.black}>
                    {i18next.t('product-shipping')}
                  </AppText>
                  <AppText
                    size={7}
                    color={colors.grayText}
                    style={{marginTop: 5}}>
                    {product?.require_shipping == 1
                      ? i18next.t('yes')
                      : i18next.t('no')}
                  </AppText>
                </View>
                <View style={styles.line} /> */}
                </View>
              ) : null}

              <TouchableOpacity
                style={{marginVertical: '2%'}}
                onPress={() => {
                  if (flag_view) setFlag_view(false);
                  else setFlag_view(true);
                }}>
                <AppText color={colors.error}>
                  {flag_view ? i18next.t('show-more') : i18next.t('show-less')}
                </AppText>
              </TouchableOpacity>
            </View>
          </ScrollableContainer>

          {item.store.status ? (  
            <AppView row stretch paddingHorizontal={3}>
              <AppView style={styles.qnty} height={7} paddingHorizontal={6}>
                <TouchableOpacity
                  onPress={async () => {
                    setQnty(qnty + 1);
                  }}>
                  <Text style={[styles.text, {}]}>{'+'}</Text>
                </TouchableOpacity>
                <Text style={[styles.text, {flex: 1, textAlign: 'center'}]}>
                  {qnty}
                </Text>
                <TouchableOpacity
                  onPress={async () => {
                    if (qnty > 1) {
                      setQnty(qnty - 1);
                    }
                  }}>
                  <Text style={[styles.text, {}]}>{'-'}</Text>
                </TouchableOpacity>
              </AppView>
              <View style={{width: '1%'}} />
              <AppButton
                processing={loading}
                stretch
                marginVertical={5}
                disabled={isKeyboardVisible? true : false}
                backgroundColor={isKeyboardVisible? colors.grayText: colors.error}
                title={i18next.t('add-to-bag')}
                onPress={() => {
                  addToCart();
                }}
                style={{flex: 1}}
                height={7}
              />
            </AppView>
          ) : null}
        </>
      )}
    </AppView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  productImage: {
    width: '100%',
    height: Dimensions.DEVICE_HEIGHT * 0.35,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colors.grayText,
    marginVertical: 15,
  },
  image: {
    width: Dimensions.DEVICE_WIDTH * 0.18,
    height: Dimensions.DEVICE_WIDTH * 0.15,
    borderRadius: 10,
  },
  row: {
    width: '100%',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#FF9953',
  },

  btnsCotainer: {
    paddingHorizontal: 10,
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
  ar: {
    transform: [{rotateY: '0deg'}],
  },
  en: {
    transform: [{rotateY: '180deg'}],
  },
  fav: {
    width: Dimensions.DEVICE_HEIGHT * 0.06,
    height: Dimensions.DEVICE_HEIGHT * 0.06,
    borderRadius: (Dimensions.DEVICE_HEIGHT * 0.06) / 2,
    backgroundColor: colors.grayText,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    width: '100%',
    flexDirection: 'row-reverse',
    alignItems: 'center',

    text: {
      color: colors.error,
      fontSize: 16,
      fontFamily: fonts.normal,
    },
  },
  checkboxLabel: {
    width: '100%',
    color: colors.black,
    fontFamily: fonts.normal,
    fontSize: 20,
  },
  spinner: {
    width: '100%',
    // height: Dimensions.DEVICE_HEIGHT * 0.07,
    marginTop: 5,
  },

  child: {
    height: Dimensions.DEVICE_HEIGHT * 0.25,
    alignItems: 'center',
  },
  image2: {
    width: Dimensions.DEVICE_WIDTH,
    height: '100%',
    backgroundColor: colors.grayLight,
    opacity: 0.9,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
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
  container: {
    width: Dimensions.DEVICE_WIDTH,
    height: Dimensions.DEVICE_HEIGHT * 0.3,
  },
  qnty: {
    width: Dimensions.DEVICE_WIDTH * 0.35,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  text: {
    color: colors.black,
    fontFamily: fonts.normal,
    fontSize: 25,
    marginVertical: 4,
  },
  picker: {
    width: Dimensions.DEVICE_WIDTH * 0.93,
    marginBottom: Dimensions.DEVICE_HEIGHT * 0.01,
    elevation: 3,
    borderRadius: Dimensions.DEVICE_HEIGHT * 0.01,
    paddingHorizontal: Dimensions.DEVICE_HEIGHT * 0.01,
    borderColor: colors.grayText,
    borderWidth: 1,
    backgroundColor: colors.white,
    elevation: 2,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 1},
  },
  addBtn: {
    backgroundColor: colors.error,
    borderRadius: 6,
    paddingHorizontal: '3%',
    justifyContent: 'center',
    height: Dimensions.DEVICE_HEIGHT * 0.07,
  },
  addToBagCon: {
    borderRadius: 6,
    borderColor: '#66002521',
    borderWidth: 1,
  },
  uncheckedView: {
    width: 18,
    height: 18,
    borderRadius: 18 / 2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedView: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: colors.error,
  },
});
