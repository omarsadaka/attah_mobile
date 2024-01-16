import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { PERMISSIONS, request } from 'react-native-permissions';
import { useSelector } from 'react-redux';
import {
  AppButton,
  AppList,
  AppNavigation,
  AppSpinner,
  AppText,
  AppView,
  showError,
} from '../../common';
import Dimensions from '../../common/defaults/Dimensions';
import colors from '../../common/defaults/colors';
import fonts from '../../common/defaults/fonts';
import { Header, LoadingView } from '../../components';
import AddressRepo from '../../repo/address';
import PickersRepo from '../../repo/pickers';

import axios from 'axios';
import Geocoder from 'react-native-geocoder';
import Geolocation from 'react-native-geolocation-service';
import {
  ANDROID_GOOGLE_API_KEY,
  BASE_URL,
  IOS_GOOGLE_API_KEY,
} from '../../api/utils/urls';
import ModalPicker from '../../components/ModalPicker';

let pickerApi = new PickersRepo();
let addressRepo = new AddressRepo();
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;
const AddAddress = props => {
  const {shippingID, storeID, shippingList} = props;
  const userData = useSelector(state => state.auth);
  const lang = useSelector(state => state.lang);

  console.log('userData contact: ', userData);

  const [loading_view, setLoading_view] = useState(true);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState({
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [countryName, setCoutryName] = useState('');
  const [cityName, setCityName] = useState('');
  const [addressDetails, setAddressDetails] = useState('');
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [mapIsMove, setMapIsMove] = useState(false);
  const [lat, setLat] = useState(position.latitude);
  const [lon, setLon] = useState(position.longitude);

  const [cityID, setCityID] = useState('');
  const [loading_city, setLoading_city] = useState(false);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [city_search, setCity_search] = useState('');
  const [region_search, setRegion_search] = useState('');
  const [show_city, setShow_city] = useState(false);
  const [show_region, setShow_region] = useState(false);
  const [regionName, setRegionName] = useState('');
  const [regionID, setRegionID] = useState('');
  const [regionCode, setRegionCode] = useState('');
  var currentLat = position?.latitude;
  var currentLon = position?.longitude;

  useEffect(() => {
    loadData();
    _requestPermission();
  }, []);

  const loadData = async () => {
    setLoading_view(true);
    const region = await pickerApi.getStates('');
    setRegions(region);
    setLoading_view(false);
  };

  const loadCities = async id => {
    setLoading_city(true);
    const data = await pickerApi.getCitites(id, '');
    setCities(data);
    setLoading_city(false);
  };
  const _requestPermission = async () => {
    // const obj = {
    //   lat: Number(cityObj.latitude),
    //   lng: Number(cityObj.longitude),
    // };
    // const permissionStatus = await Permissions.check(
    //   PERMISSIONS.IOS.LOCATION_ALWAYS,
    // );

    let permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE //getCurrentLocation()
        : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION;

    request(permission).then(result => {
      console.log('result permission', result);
      if (result === 'granted') {
        getCurrentLocation();
        // reverseGeoLocation(obj);
      } else {
        setLoading_view(false);
      }
    });
  };
  const getCurrentLocation = () => {
    if (Platform === 'ios') {
      Geolocation.requestAuthorization();
    }
    if (isLocationLoading) {
      null;
    } else {
      Geolocation.getCurrentPosition(
        position => {
          setPosition(pre => ({...pre, ...position.coords}));
          console.log('position', position);
          const obj = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          currentLat = position.coords.latitude;
          currentLon = position.coords.longitude;
          reverseGeoLocation(obj);
        },
        error => {
          // Alert.alert(error.message.toString());
          console.log('asd', error.message);
        },
        {
          showLocationDialog: true,
          enableHighAccuracy: true,
          // timeout: 20000,
          // maximumAge: 0,
        },
      );
    }
  };
  const reverseGeoLocation = location => {
    setIsLocationLoading(true);
    const GeocoderOptions = {
      apiKey:
        Platform.OS === 'ios' ? IOS_GOOGLE_API_KEY : ANDROID_GOOGLE_API_KEY,
      locale: 'ar',
      fallbackToGoogle: true,
      maxResults: 1,
    };
    Geocoder.geocodePosition(location, GeocoderOptions)
      .then(res => {
        console.log('ssssssssssss', res);
        setCoutryName(res[0].country);
        setAddressDetails(res[0].formattedAddress + ', ' + res[0].adminArea);
        setTimeout(() => {
          setIsLocationLoading(false);
        }, 500);

        var add = res[0].formattedAddress;
        var value = add.split(',');
        var count = value.length;
        var city = value[count - 3];
        console.log('city', city);
        // setCityName(city);
      })
      .catch(err => {
        console.log('error address from map', err);
        setTimeout(() => {
          setIsLocationLoading(false);
        }, 500);
      });
  };

  const handleChangeLocation = region => {
    console.log('e=====>', region);
    if (mapIsMove || isLocationLoading) {
      null;
    } else {
      setPosition(region);
      setLat(region.latitude);
      setLon(region.longitude);
      const obj = {
        lat: region.latitude,
        lng: region.longitude,
      };
      reverseGeoLocation(obj);
    }
  };

  const handleSubmit = async () => {
    if (!regionID) {
      showError(i18next.t('enter-region'));
      return;
    }
    if (!cityID) {
      showError(i18next.t('enter-city'));
      return;
    }
    const values = {
      latitude: lat.toString(),
      longitude: lon.toString(),
      address: addressDetails,
      address_city: cityName.toString(),
      city_id: cityID,
    };
    setLoading(true);
    // const data = addressRepo.addAddress2(values);
    // console.log('data  address 2', data);
    try {
      const res = await axios.post(`${BASE_URL}profile/user-addresses`, values);
      console.log('data  address 222222', res.data);
      if (res.data.id) {
        AppNavigation.push({
          name: 'ShippingCompany',
          passProps: {
            // shippingID: shippingID,
            storeID: storeID,
            addressID: res.data.id,
            shippingList: shippingList,
          },
        });
      }
    } catch (error) {
      console.log('error.response  add address', error.response.data);
      showError(error.response.data.error);
    }
    setLoading(false);
  };

  const renderModelRegion = () => {
    return (
      <AppView style={styles.region_model}>
        {/* <AppInput
          placeholder={i18next.t('region-search')}
          placeholderColor={colors.grayText}
          value={region_search}
          onChange={value => {
            setRegion_search(value);
          }}
        /> */}
        <TextInput
          placeholder={i18next.t('region-search')}
          placeholderColor={colors.grayText}
          defaultValue={region_search}
          onChangeText={value => {
            setRegion_search(value);
          }}
          style={{
            width: '100%',
            height: Dimensions.DEVICE_HEIGHT * 0.048,
            borderRadius: 5,
            borderColor: colors.grayText,
            borderWidth: 1,
            paddingHorizontal: 5,
            fontFamily: fonts.normal,
            fontSize: 15,
            textAlign: lang.lang == 'ar' ? 'right' : 'left',
          }}
        />
        <AppList
          idPathInData={'id'}
          rowRenderer={(data, index) => (
            <AppView>
              <TouchableOpacity
                onPress={() => {
                  setCityName('');
                  setCityID('');
                  setRegionCode(data.code);
                  setRegionID(data.id);
                  setRegionName(data.name);
                  setShow_region(false);
                  setRegion_search('');
                }}
                style={{width: Dimensions.DEVICE_WIDTH * 0.4}}>
                <Text
                  style={{
                    marginHorizontal: 10,
                    fontFamily: fonts.normal,
                    marginVertical: 5,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: colors.grayText,
                    padding: 4,
                    paddingHorizontal: 7,
                    color: 'black',
                    textAlign: 'right',
                  }}>
                  {data.name}
                </Text>
              </TouchableOpacity>
            </AppView>
          )}
          apiRequest={{
            url: region_search
              ? `${BASE_URL}location/regions?county_id=1&public_search=${region_search}`
              : `${BASE_URL}location/regions?county_id=1&public_search=`,
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
      </AppView>
    );
  };
  const renderModelCity = () => {
    return (
      <AppView style={styles.city_model}>
        {/* <AppInput
          placeholder={i18next.t('city-search')}
          placeholderColor={colors.grayText}
          value={region_search}
          onChange={value => {
            setCity_search(value);
          }}
        /> */}
        <TextInput
          placeholder={i18next.t('city-search')}
          placeholderColor={colors.grayText}
          defaultValue={city_search}
          onChangeText={value => {
            setCity_search(value);
          }}
          style={{
            width: '100%',
            height: Dimensions.DEVICE_HEIGHT * 0.048,
            borderRadius: 5,
            borderColor: colors.grayText,
            borderWidth: 1,
            paddingHorizontal: 5,
            fontFamily: fonts.normal,
            fontSize: 15,
            textAlign: lang.lang == 'ar' ? 'right' : 'left',
          }}
        />
        <AppList
          flatlist
          columns={1}
          centerColumns
          // refreshControl={region_search}
          idPathInData={'id'}
          rowRenderer={(data, index) => (
            <AppView>
              <TouchableOpacity
                onPress={() => {
                  setCityID(data.id);
                  setCityName(data.name);
                  setPosition(prev => ({
                    ...prev,
                    latitude: data.latitude,
                    longitude: data.longitude,
                  }));
                  setLat(data.latitude);
                  setLon(data.longitude);
                  setShow_city(false);
                  setCity_search('');
                  const obj = {
                    lat: Number(data.latitude),
                    lng: Number(data.longitude),
                  };
                  reverseGeoLocation(obj);
                }}
                style={{width: Dimensions.DEVICE_WIDTH * 0.4}}>
                <Text
                  style={{
                    marginHorizontal: 10,
                    fontFamily: fonts.normal,
                    marginVertical: 5,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: colors.grayText,
                    padding: 4,
                    color: 'black',
                    paddingHorizontal: 7,
                    textAlign: 'right',
                  }}>
                  {data.name}
                </Text>
              </TouchableOpacity>
            </AppView>
          )}
          apiRequest={{
            url: city_search
              ? `${BASE_URL}location/cities?state=${regionCode}&public_search=${city_search}`
              : `${BASE_URL}location/cities?state=${regionCode}&public_search=`,
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
      </AppView>
    );
  };
  return (
    <>
      {/* <Header backgroundColor={colors.gray} componentId={props.componentId} /> */}
      <Header color={colors.primary} />
      <AppText size={13} marginHorizontal={4}>
        {i18next.t('shippingData')}
      </AppText>
      <View
        style={{width: '100%', alignItems: 'center', marginTop: 5}}
        // onMoveShouldSetResponder={nativeEvent => {
        //   console.log(
        //     '🚀 ~ file: AddAddress.js:711 ~ AddAddress ~ nativeEvent:',
        //     nativeEvent,
        //   );

        //   if (show_region) {
        //     setShow_region(false);
        //   }
        //   if (show_city) {
        //     setShow_city(false);
        //   }
        // }}
      >
        {/* <AppText size={13} mv={7} marginHorizontal={4}>
          {i18next.t('add-address')}
        </AppText> */}
        <AppView stretch paddingHorizontal={5}>
          <AppText size={8}>{`${i18next.t('name')} : ${
            userData.userData.first_name ?? ''
          } ${userData.userData.last_name ?? ''}`}</AppText>
          <AppText size={8}>
            {`${i18next.t('mobile')} : ${userData.userData.phone ?? ''}`}
          </AppText>
        </AppView>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginHorizontal: 10,
          }}>
          <AppText size={6} mv={7} marginTop={5} style={{flex: 1}}>
            {i18next.t('enter-address-data')}
          </AppText>
        </View>

        {loading_view ? (
            <LoadingView />
        ) : (
          <AppView flex stretch>
            <AppView stretch height={6} marginTop={5} row marginHorizontal={5}>
              <AppView flex stretch>
                <ModalPicker
                  hint={i18next.t('region')}
                  height={Dimensions.DEVICE_HEIGHT * 0.4}
                  top={Dimensions.DEVICE_HEIGHT * 0.3}
                  width={Dimensions.DEVICE_WIDTH * 0.5}
                  data={regions}
                  hasBg={true}
                  onTouchEnd={() => {}}
                  defaultColor={colors.black}
                  onSelect={value => {
                    setCityName('');
                    setCityID('');
                    setRegionCode(value.code);
                    setRegionID(value.id);
                    loadCities(value.code);
                  }}
                  showIcon={false}
                />
              </AppView>

              <View style={{width: 5}} />
              <AppView flex stretch center>
                {loading_city ? (
                  <AppSpinner />
                ) : (
                  <ModalPicker
                    hint={i18next.t('city')}
                    // style={{flex: 1}}
                    height={Dimensions.DEVICE_HEIGHT * 0.4}
                    top={Dimensions.DEVICE_HEIGHT * 0.3}
                    width={Dimensions.DEVICE_WIDTH * 0.5}
                    data={cities}
                    hasBg={true}
                    onTouchEnd={() => {}}
                    defaultColor={colors.black}
                    onSelect={value => {
                      console.log(
                        '🚀 ~ file: AddAddress.js:743 ~ AddAddress ~ value:',
                        value,
                      );

                      setCityID(value.id);
                      setCityName(value.name);
                      setPosition(prev => ({
                        ...prev,
                        latitude: parseFloat(value.latitude),
                        longitude: parseFloat(value.longitude),
                      }));
                      setLat(value.latitude);
                      setLon(value.longitude);
                      setShow_city(false);
                      setCity_search('');
                      const obj = {
                        lat: Number(value.latitude),
                        lng: Number(value.longitude),
                      };
                      reverseGeoLocation(obj);
                    }}
                    showIcon={false}
                  />
                )}
              </AppView>
              {/* <TouchableOpacity
                onPress={() => {
                  if (!regionName) {
                    showError(i18next.t('enter-region'));
                    return;
                  }
                  setShow_region(false);
                  if (show_city) setShow_city(false);
                  else setShow_city(true);
                }}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderColor: 'gray',
                  borderWidth: 1,
                  borderRadius: 6,
                  paddingVertical: 8,
                  paddingHorizontal: 6,
                }}>
                <Icon
                  name="keyboard-arrow-down"
                  type="MaterialIcons"
                  size={18}
                  color={colors.grayText}
                  mr={2}
                />
                <Text
                  style={{
                    flex: 1,
                    textAlign: 'right',
                    fontFamily: fonts.normal,
                    color: cityName ? colors.black : colors.grayText,
                  }}>
                  {cityName ? cityName : i18next.t('city')}
                </Text>
              </TouchableOpacity> */}
              {/* <TouchableOpacity
                onPress={() => {
                  setShow_city(false);
                  if (show_region) setShow_region(false);
                  else setShow_region(true);
                }}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderColor: 'gray',
                  borderWidth: 1,
                  borderRadius: 6,
                  paddingVertical: 8,
                  paddingHorizontal: 6,
                }}>
                <Icon
                  name="keyboard-arrow-down"
                  type="MaterialIcons"
                  size={18}
                  color={colors.grayText}
                  mr={2}
                />
                <Text
                  style={{
                    flex: 1,
                    textAlign: 'right',
                    fontFamily: fonts.normal,
                    color: regionName ? colors.black : colors.grayText,
                  }}>
                  {regionID ? regionName : i18next.t('region')}
                </Text>
              </TouchableOpacity> */}
            </AppView>

            <AppView
              style={{
                width: '100%',
                alignItems: 'center',
                height: Dimensions.DEVICE_HEIGHT * 0.48,
              }}>
              {currentLat && currentLon ? (
                <View
                  style={{
                    width: '100%',
                    height: '80%',
                    marginTop: 10,
                    // alignItems: 'center',
                  }}>
                  <Pressable
                    style={styles.myLocationIconWrapper}
                    disabled={isLocationLoading}
                    onPress={() => getCurrentLocation()}>
                    <Image
                      source={require('../../assets/imgs/pin2.png')}
                      style={styles.myLocationIcon}
                    />
                  </Pressable>
                  <MapView
                    zoomControlEnabled
                    zoomEnabled
                    zoomTapEnabled
                    showsUserLocation={false}
                    showsMyLocationButton={false}
                    style={[
                      styles.map,
                      {
                        width: '100%',
                        height: Dimensions.DEVICE_HEIGHT * 0.58,
                        // flex: 1,
                      },
                    ]}
                    region={position}
                    onRegionChangeComplete={handleChangeLocation}
                    provider={PROVIDER_GOOGLE}
                    scrollEnabled={
                      mapIsMove || isLocationLoading ? false : true
                    }>
                    {/* <Marker
                    coordinate={{
                      latitude: Number(lat),
                      longitude: Number(lon),
                      // latitudeDelta: position.latitudeDelta,
                      // longitudeDelta: position.longitudeDelta,
                    }}
                    style={{justifyContent: 'center', alignItems: 'center'}}
                    tracksViewChanges={true}></Marker> */}
                  </MapView>
                  <Image
                    source={require('../../assets/imgs/pin2.png')}
                    style={styles.pin}
                  />
                  {/* <View
                    style={{
                      width: '80%',
                      position: 'absolute',
                      bottom: Dimensions.DEVICE_HEIGHT * 0.03,
                    }}>
                    <AppButton
                      processing={loading}
                      stretch
                      marginVertical={10}
                      title={i18next.t('save')}
                      onPress={handleSubmit}
                    />
                  </View> */}
                  <AppView style={styles.mapInfoContainer}>
                    <AppView flex stretch row padding={5}>
                      <Text style={styles.label}>
                        {i18next.t('addrress-details')}
                      </Text>
                      <Text style={styles.value}>{addressDetails}</Text>
                    </AppView>
                    {/* <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 4,
                    }}>
                    <Text style={styles.value}>{cityName}</Text>
                    <Text style={styles.label}>{i18next.t('city')}</Text>
                  </View> */}
                  </AppView>
                </View>
              ) : null}
            </AppView>
            <AppView center stretch row marginHorizontal={10}>
              <AppButton
                processing={loading}
                stretch
                flex
                marginVertical={10}
                title={i18next.t('save')}
                onPress={handleSubmit}
              />
              <AppView width={5} />
              <AppButton
                // processing={loading}
                stretch
                flex
                marginVertical={10}
                // title={i18next.t('shipment-addresses')}
                title={i18next.t('myPreviousAddresses')}
                onPress={() => {
                  AppNavigation.push({
                    name: 'ChooseAddress',
                    passProps: {
                      shippingID: shippingID,
                      storeID: storeID,
                      shippingList: shippingList,
                    },
                  });
                }}
              />
              {/* <TouchableOpacit
                onPress={() => {
                  AppNavigation.push({
                    name: 'ChooseAddress',
                    passProps: {
                      shippingID: shippingID,
                      storeID: storeID,
                      shippingList: shippingList,
                    },
                  });
                }}>
                <AppText size={7} mv={7} color={colors.error}>
                  {i18next.t('shipment-addresses')}
                </AppText>
              </TouchableOpacity> */}
            </AppView>
          </AppView>
        )}
        {show_region ? renderModelRegion() : null}
        {show_city ? renderModelCity() : null}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: Dimensions.DEVICE_HEIGHT * 0.08,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: Dimensions.DEVICE_HEIGHT * 0.02,
    borderColor: colors.grayText,
    paddingHorizontal: Dimensions.DEVICE_WIDTH * 0.03,
    borderWidth: 0.5,
    alignItems: 'center',
    elevation: 3,
    shadowOpacity: 0.2,
  },
  error: {
    alignSelf: 'flex-end',
    color: colors.error,
    fontFamily: fonts.normal,
    marginTop: 3,
  },
  text: {
    flex: 1,
    height: Dimensions.DEVICE_HEIGHT * 0.08,
    color: colors.black,
    textAlign: 'right',
    textAlignVertical: 'center',
    fontFamily: fonts.normal,
  },
  label: {
    color: colors.error,
    textAlign: 'right',
    textAlignVertical: 'center',
    fontFamily: fonts.normal,
    fontSize: 17,
  },
  mapInfoContainer: {
    top: 10,
    left: 10,
    right: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
    position: 'absolute',
  },
  value: {
    flex: 1,
    color: colors.black,
    textAlign: 'right',
    textAlignVertical: 'center',
    fontFamily: fonts.normal,
    marginHorizontal: 7,
    fontSize: 17,
  },
  spinner: {
    width: Dimensions.DEVICE_WIDTH * 0.44,
    height: Dimensions.DEVICE_HEIGHT * 0.08,
  },
  defaultContainer: {
    flexDirection: 'row',
    width: '99%',
    backgroundColor: colors.white,
    elevation: 3,
    marginHorizontal: 1,
    borderColor: colors.grayText,
    borderWidth: 0.5,
    borderRadius: 10,
    shadowOpacity: 0.3,
  },
  myLocationIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    shadowColor: '#233B5D',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {height: 1, width: 1},
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: Dimensions.DEVICE_HEIGHT * 0.035,
    right: 10,
    zIndex: 1,
  },
  myLocationIcon: {
    width: 15,
    height: 15,
  },
  pin: {
    width: Dimensions.DEVICE_HEIGHT * 0.06,
    height: Dimensions.DEVICE_HEIGHT * 0.06,
    position: 'absolute',
    top: Dimensions.DEVICE_HEIGHT * 0.29,
    alignSelf: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  region_model: {
    height: Dimensions.DEVICE_HEIGHT * 0.53,
    width: Dimensions.DEVICE_WIDTH * 0.47,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 6,
    paddingHorizontal: 5,
    position: 'absolute',
    right: 10,
    zIndex: 2000,
    top:
      Platform.OS == 'android'
        ? Dimensions.DEVICE_HEIGHT * 0.1
        : Dimensions.DEVICE_HEIGHT * 0.08,
    elevation: 3,
    shadowOpacity: 0.2,
    shadowOffset: {height: 0, width: 0},
  },
  city_model: {
    height: Dimensions.DEVICE_HEIGHT * 0.53,
    width: Dimensions.DEVICE_WIDTH * 0.47,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 6,
    paddingHorizontal: 5,
    position: 'absolute',
    left: 10,
    top:
      Platform.OS == 'android'
        ? Dimensions.DEVICE_HEIGHT * 0.1
        : Dimensions.DEVICE_HEIGHT * 0.08,
    elevation: 3,
    shadowOpacity: 0.2,
    shadowOffset: {height: 0, width: 0},
  },
});
export default AddAddress;
