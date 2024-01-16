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
import Geocoder from 'react-native-geocoder';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { PERMISSIONS, request } from 'react-native-permissions';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../api/utils/urls';
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
import { Header, LoadingView, ScrollableContainer } from '../../components';
import ModalPicker from '../../components/ModalPicker';
import AddressRepo from '../../repo/address';
import PickersRepo from '../../repo/pickers';
import Geolocation from 'react-native-geolocation-service';

import { ANDROID_GOOGLE_API_KEY, IOS_GOOGLE_API_KEY } from '../../api/utils/urls';
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;
let pickerApi = new PickersRepo();
let addressRepo = new AddressRepo();
const EditAddress = props => {
  const userData = useSelector(state => state.auth);
  const lang = useSelector(state => state.lang);

  console.log('userData contact: ', userData);
  const {addressID} = props;
  const [loadingView, setLoadingView] = useState(true);
  const [address, setAddress] = useState({});
  const [loading, setLoading] = useState(false);
  const [loading_delete, setLoading_delete] = useState(false);
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [active, setActive] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [position, setPosition] = useState({
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [cityName, setCityName] = useState('');
  const [addressDetails, setAddressDetails] = useState('');
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [mapIsMove, setMapIsMove] = useState(false);
  const [currentLat, setCurretLat] = useState(position?.latitude);
  const [currentLon, setCurrentLon] = useState(position?.longitude);
  const [regionName, setRegionName] = useState('');
  const [selectedRigion, setSelectedRegion] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [regionID, setRegionID] = useState('');
  const [regionCode, setRegionCode] = useState('');
  const [cityID, setCityID] = useState('');
  const [loading_city, setLoading_city] = useState(false);
  const [show_city, setShow_city] = useState(false);
  const [show_region, setShow_region] = useState(false);
  const [city_search, setCity_search] = useState('');
  const [region_search, setRegion_search] = useState('');

  useEffect(() => {
    loadData();
    _requestPermission();
  }, [currentLat, currentLon, active, loading]);

  useEffect(() => {
    getAddressData();
  }, [loading]);

  const loadData = async () => {
    const region = await pickerApi.getStates('');
    setRegions(region);
  };

  const loadCities = async id => {
    setLoading_city(true);
    const data = await pickerApi.getCitites(id, '');
    console.log('getShippingCitites', data);
    setCities(data);
    setLoading_city(false);
  };

  const handleSubmit = () => {
    if (!selectedRigion) {
      showError(i18next.t('enter-region'));
      return;
    }
    if (!selectedCity) {
      showError(i18next.t('enter-city'));
      return;
    }
    const values = {
      latitude: lat.toString(),
      longitude: lon.toString(),
      address: addressDetails,
      address_city: selectedCity.toString(),
      city_id: cityID,
      region_id: regionID,
      country_id: '1',
    };
    setLoading(true);
    console.log('values', values);
    const data = addressRepo.updateAddress(values, addressID);
    setLoading(false);
  };

  const getAddressData = async () => {
    const data = await addressRepo.getAddress(addressID);
    console.log('address data', data);
    setAddress(data);
    setAddressDetails(data?.address);
    setCurretLat(data?.latitude);
    setPosition(prev => ({
      ...prev,
      latitude: parseFloat(data?.latitude),
      longitude: parseFloat(data?.longitude),
    }));
    setCurrentLon(data?.longitude);
    setLat(data?.latitude);
    setLon(data?.longitude);
    setCityName(data?.city?data.city.name: data?.city_name);
    setCityID(data?.city?.id);
    setRegionID(data?.city?.region?.id);
    loadCities(data?.city?.state.code);
    setSelectedCity(data?.city?.name);
    if (data?.city?.state) {
      setSelectedRegion(data?.city?.state?.name);
      setRegionName(data?.city?.state?.name);
      setRegionCode(data?.city?.state?.code);
    }
    // loadCities(data?.city?.state?.code);
    setLoadingView(false);
  };

  const deleteAddress = async () => {
    setLoading_delete(true);
    const data = await addressRepo.deleteAddress(addressID);
    clearTimeout(timeout);
    let timeout = setTimeout(() => {
      // AppNavigation.push('ShippingAddress');
      if (lang.lang == 'ar') AppNavigation.navigateToHomeAr(3);
      else AppNavigation.navigateToHome(0);
    }, 1000);
    setLoading_delete(false);
  };
  const _requestPermission = () => {
    let permission = PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION;
    request(permission).then(result => {
      console.log('result permission', result);
    });
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
      setCurretLat(region.latitude);
      setCurrentLon(region.longitude);
    }
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
          flatlist
          columns={1}
          centerColumns
          // refreshControl={region_search}
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
          reverseGeoLocation(obj);
          // getPlaceName(position.coords.latitude, position.coords.longitude);
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
  return (
    <ScrollableContainer
    flex
    width={100}
    stretch
    title={i18next.t('edit-address')}
    center
    >
    <AppView flex stretch marginTop={-5}>
      {/* <Header /> */}
      {loadingView ? (
        <LoadingView />
      ) : (
        <View style={{width: '100%', alignItems: 'center'}}>
          {/* <AppText size={13} marginHorizontal={4} mv={7}>
            {i18next.t('edit-address')}
          </AppText> */}
          {/* <AppText size={6} marginHorizontal={4} mv={7}>
            {i18next.t('edit-your-address')}
          </AppText> */}

          <AppView stretch height={6} marginTop={5} row marginHorizontal={5}>
            <AppView flex stretch>
              <ModalPicker
                hint={regionName ?? i18next.t('region')}
                height={Dimensions.DEVICE_HEIGHT * 0.4}
                top={Dimensions.DEVICE_HEIGHT * 0.23}
                width={Dimensions.DEVICE_WIDTH * 0.5}
                data={regions}
                // defaultIndex={regionID}
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
            <AppView flex stretch>
              {loading_city ? (
                <AppSpinner />
              ) : (
                <ModalPicker
                  hint={cityName ?? i18next.t('city')}
                  // style={{flex: 1}}
                  height={Dimensions.DEVICE_HEIGHT * 0.4}
                  top={Dimensions.DEVICE_HEIGHT * 0.23}
                  width={Dimensions.DEVICE_WIDTH * 0.5}
                  data={cities}
                  // defaultIndex={cityID}
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
          </AppView>

          {/* <View
            style={{
              width: '95%',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 4,
            }}>
            <TouchableOpacity
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
            </TouchableOpacity>
            <View style={{width: 5}} />
            <TouchableOpacity
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
                {regionName ? regionName : i18next.t('region')}
              </Text>
            </TouchableOpacity>
          </View> */}

          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}>
            {lat && lon ? (
              <View
                style={{
                  width: '100%',
                  height: Dimensions.DEVICE_HEIGHT * 0.68,
                  marginTop: 10,
                  alignItems: 'center',
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
                      height: Dimensions.DEVICE_HEIGHT * 0.66,
                      flex: 1,
                    },
                  ]}
                  region={position}
                  onRegionChangeComplete={handleChangeLocation}
                  provider={PROVIDER_GOOGLE}
                  scrollEnabled={mapIsMove || isLocationLoading ? false : true}>
                  {/* <Marker
                    coordinate={{
                      latitude: Number(currentLat),
                      longitude: Number(currentLon),
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
                <View style={styles.mapInfoContainer}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.value}>{addressDetails}</Text>
                    <Text style={styles.label}>
                      {i18next.t('addrress-details')}
                    </Text>
                  </View>
                  {/* <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 4,
                    }}>
                    <Text style={styles.value}>{cityName2}</Text>
                    <Text style={styles.label}>{i18next.t('city')}</Text>
                  </View> */}
                </View>
                {/* <Image
                  source={require('../../assets/imgs/pin2.png')}
                  style={styles.pin}
                /> */}
              </View>
            ) : null}
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <AppButton
                style={{width: '45%'}}
                processing={loading_delete}
                stretch
                marginVertical={2}
                title={i18next.t('delete-address')}
                onPress={deleteAddress}
              />
              <View style={{width: '5%'}} />
              <AppButton
                style={{width: '45%'}}
                processing={loading}
                stretch
                marginVertical={2}
                title={i18next.t('save')}
                onPress={handleSubmit}
              />
            </View>
          </View>
          {show_region ? renderModelRegion() : null}
          {show_city ? renderModelCity() : null}
        </View>
      )}
    </AppView>
    </ScrollableContainer>
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

  spinner: {
    width: Dimensions.DEVICE_WIDTH * 0.95,
    height: Dimensions.DEVICE_HEIGHT * 0.08,
    marginTop: 8,
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
  label: {
    color: colors.error,
    textAlign: 'right',
    textAlignVertical: 'center',
    fontFamily: fonts.normal,
    fontSize: 17,
  },
  mapInfoContainer: {
    width: '90%',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: colors.white,
    // elevation: 3,
    // shadowOpacity: 0.2,
    // shadowOffset: {height: 0, width: 1},
    padding: 7,
    position: 'absolute',
    top: 5,
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
    bottom: Dimensions.DEVICE_HEIGHT * 0.05,
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
    top: Dimensions.DEVICE_HEIGHT * 0.27,
    alignSelf: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  region_model: {
    height: Dimensions.DEVICE_HEIGHT * 0.5,
    width: Dimensions.DEVICE_WIDTH * 0.47,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 6,
    paddingHorizontal: 5,
    position: 'absolute',
    right: 10,
    top:
      Platform.OS == 'android'
        ? Dimensions.DEVICE_HEIGHT * 0.13
        : Dimensions.DEVICE_HEIGHT * 0.12,
    elevation: 3,
    shadowOpacity: 0.2,
    shadowOffset: {height: 0, width: 0},
  },
  city_model: {
    height: Dimensions.DEVICE_HEIGHT * 0.5,
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
        ? Dimensions.DEVICE_HEIGHT * 0.13
        : Dimensions.DEVICE_HEIGHT * 0.12,
    elevation: 3,
    shadowOpacity: 0.2,
    shadowOffset: {height: 0, width: 0},
  },
});
export default EditAddress;