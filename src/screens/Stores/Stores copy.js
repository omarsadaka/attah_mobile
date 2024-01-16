import i18next from 'i18next';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../api/utils/urls';
import {
  AppButton,
  AppInput,
  AppList,
  AppNavigation,
  AppText,
  AppView,
} from '../../common';
import Dimensions from '../../common/defaults/Dimensions';
import colors from '../../common/defaults/colors';
import fonts from '../../common/defaults/fonts';
import AddressRepo from '../../repo/address';
import AuthRepo from '../../repo/auth';
import StoreRepo from '../../repo/stores';
import SectionCard from './components/SectionCard';
import StoreCard from './components/StoreCard';

let addressRepo = new AddressRepo();
let storeRepo = new StoreRepo();
const Stores = props => {
  const {catID, category} = props;
  let authRepo = new AuthRepo();
  const lang = useSelector(state => state.lang);
  const rtl = useSelector(state => state.lang.rtl);
  const [subCatID, setSubCatID] = useState('all');
  const flatListRef = useRef(null);

  const [isSearch, setIsSearch] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [word, setWord] = useState('');
  const [checked, setChecked] = useState(false);
  const [nearBy, setNearBy] = useState('');
  const [number, setNumber] = useState('0');
  const [address, setAddress] = useState(null);
  const [sections, setSections] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    getUserAddress();
  }, []);
  const getUserAddress = async () => {
    let categories = [];
    categories = await storeRepo.getSubCategory(catID);
    const array = [];
    categories.forEach(element => {
      if (lang.lang == 'ar') {
        array.push(element.ar.name);
      } else {
        array.push(element.en.name);
      }
    });
    setLabels(array);
    setSections([
      {id: 'all', ar: {name: 'الكل'}, en: {name: 'All'}},
      ...categories,
    ]);
    setSelectedIndex(lang.lang === 'en' ? 0 : array);
    const data = await addressRepo.getDefaultAddress();
    setAddress(data[0]);
  };
  // useEffect(() => {
  //   const backAction = () => {
  //     // write code to handel navigation
  //     if (lang.lang == 'ar') AppNavigation.navigateToHomeAr(3);
  //     else AppNavigation.navigateToHome(0);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);

  const header = () => {
    return (
      <AppView row stretch marginHorizontal={5} marginTop={8}>
        <TouchableOpacity
          onPress={() => {
            AppNavigation.pop();
            // if (lang.lang == 'ar') AppNavigation.navigateToHomeAr(3);
            // else AppNavigation.navigateToHome(0);
          }}>
          <Image
            source={require('../../assets/imgs/IconLeft.png')}
            style={[lang.lang == 'en' ? styles.en : null, styles.icon]}
          />
        </TouchableOpacity>
        <AppView flex stretch>
          <AppText stretch marginHorizontal={5} size={9}>
            {category?.name}
          </AppText>
        </AppView>
        {/* <Text
          style={{
            color: colors.black,
            fontSize: 24,
            fontFamily: fonts.normal,
            marginHorizontal: 20,
            flex: 1,
            textAlign: 'auto',
            // fontWeight:'bold',
          }}>
          {category?.name}
        </Text> */}
        <View
          style={{
            alignItems: 'flex-start',
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={() => setIsSearch(true)}>
            <Image
              source={require('../../assets/imgs/search.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => {
              if (isFilter) setIsFilter(false);
              else setIsFilter(true);
            }}>
            <Image
              source={require('../../assets/imgs/filter.png')}
              style={styles.icon}
            />
          </TouchableOpacity> */}
        </View>
      </AppView>
    );
  };
  const renderSearch = () => {
    return (
      // <View style={styles.input}>
      //   <Input
      //     placeholder={i18next.t('search')}
      //     placeholderTextColor={colors.grayText}
      //     underlineColorAndroid="transparent"
      //     value={word}
      //     onChangeText={value => setWord(value)}
      //     style={{
      //       fontFamily: fonts.normal,
      //     }}
      //     leftIcon={
      //       // <Icon
      //       //   name="search"
      //       //   type="feather"
      //       //   size={Dimensions.DEVICE_HEIGHT * 0.025}
      //       //   color={colors.error}
      //       // />
      //       <Image
      //         source={require('../../assets/imgs/search.png')}
      //         style={styles.iconIput}
      //       />
      //     }
      //     rightIcon={
      //       // <Icon
      //       //   name="x"
      //       //   type="feather"
      //       //   size={Dimensions.DEVICE_HEIGHT * 0.03}
      //       //   color={colors.black}
      //       //   onPress={() => setIsSearch(false)}
      //       // />
      //       <TouchableOpacity onPress={() => setIsSearch(false)}>
      //         <Image
      //           source={require('../../assets/imgs/close.png')}
      //           style={styles.iconIput}
      //         />
      //       </TouchableOpacity>
      //     }
      //   />
      // </View>

      <AppInput
        marginHorizontal={5}
        borderWidth={0}
        borderBottomWidth={1}
        placeholder={i18next.t('search')}
        placeholderTextColor={colors.grayText}
        underlineColorAndroid="transparent"
        value={word}
        onChange={value => setWord(value)}
        leftItems={
          <Image
            source={require('../../assets/imgs/search.png')}
            style={styles.iconIput}
          />
        }
        rightItems={
          <TouchableOpacity
            onPress={() => {
              setIsSearch(false);
              setWord('');
            }}>
            <Image
              source={require('../../assets/imgs/close.png')}
              style={styles.iconIput}
            />
          </TouchableOpacity>
        }
      />
    );
  };

  const renderFilter = () => {
    return (
      <AppView
        srtetch
        width={101}
        height={57}
        backgroundColor={colors.white}
        elevation={3}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        paddingHorizontal={5}
        paddingVertical={5}
        style={{position: 'absolute', bottom: 0}}>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <AppText
            size={11}
            color={colors.error}
            onPress={() => setIsFilter(false)}>
            {'X'}
          </AppText>
          <AppText size={11} style={{flex: 1}}>
            {i18next.t('filter-by')}
          </AppText>
        </View>

        <AppText size={7} style={styles.textRight}>
          {i18next.t('saved-address')}
        </AppText>
        <View style={styles.listContainer}>
          <AppList
            flatlist
            flex
            mv={8}
            columns={1}
            centerColumns
            idPathInData={'id'}
            rowRenderer={(data, index) => (
              <View style={styles.cardContainer}>
                <View
                  style={{
                    width: '97%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.text}>{data.address_city}</Text>
                  <RadioButton
                    color="#FF9953"
                    value={checked}
                    status={checked == data.id ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(data.id);
                      setNearBy(
                        Number(data.latitude) + ',' + Number(data.longitude),
                      );
                    }}
                  />
                </View>

                {/* <Text style={styles.text}>{data.title}</Text> */}
                <Text style={styles.subText}>{data.address}</Text>
              </View>
            )}
            apiRequest={{
              url: `${BASE_URL}profile/user-addresses`,
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
        </View>
        <AppButton
          processing={false}
          stretch
          marginTop={5}
          marginHorizontal={5}
          title={number + ' ' + i18next.t('resutls')}
          onPress={() => {
            setIsFilter(false);
          }}
        />
      </AppView>
    );
  };

  const renderItem = ({item, index}) => (
    <SectionCard
      item={item}
      onPress={() => {
        flatListRef.current.scrollToIndex({index: index, animated: true});
        setSubCatID(item.id);
        setNearBy('');
        setChecked('');
      }}
      itemID={subCatID}
    />
  );

  const renderView = () => (
    <AppList
      flex
      idPathInData={'id'}
      rowRenderer={(data, index) => (
        <StoreCard item={data} bg={isFilter} catID={catID} />
      )}
      apiRequest={{
        url: `${BASE_URL}stores?category_id=${catID}&subcategory_id=${
          subCatID === 'all' ? '' : subCatID
        }&public_search=${word}&near_by=${nearBy}`,
        params: {
          paginate: 10,
        },
        responseResolver: response => {
          setNumber(response.data.length);
          return {
            data: response.data,
            // pageCount: response.meta.current_page,
          };
        },
        onError: error => {
          i18next.t('ui-error-happened');
        },
      }}
      noResultsLabel={i18next.t('No found data')}
    />
  );

  return (
    <>
      <AppView flex backgroundColor={isFilter ? '#2302022E' : '#FAF9FA'}>
        {isSearch ? renderSearch() : header()}
        <View style={[styles.sectionsContainer, {alignSelf: 'flex-end'}]}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={sections}
            ref={flatListRef}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            inverted={lang.lang == 'ar' ? true : false}
          />
        </View>
        {/* <SwiperFlatList
          index={0}
          showPagination
          paginationActiveColor={colors.primary}
          data={sections}
          inverted={lang.lang == 'ar' ? true : false}
          onChangeIndex={({index}) => {
            console.log('🚀 ~ file: Stores.js:382 ~ Stores ~ index:', index);
            // setSelectedIndex(index);
            // flatListRef.current.scrollToIndex({index: index, animated: true});
            setSubCatID(sections[index].id);
          }}
          renderItem={({item}) => {
            return renderView();
          }}
        /> */}
        {/* <Swiper
          index={0}
          style={styles.wrapper}
          showsButtons={false}
          showsPagination={false}
          loop={false}
          onIndexChanged={index => {
            flatListRef.current.scrollToIndex({index: index, animated: true});
            setSubCatID(sections[index].id);
          }}>
          {sections.map(() => {
            return renderView();
          })}
        </Swiper> */}

        <Carousel
          data={rtl ? sections.reverse() : sections}
          // autoPlayReverse
          width={Dimensions.DEVICE_WIDTH}
          onSnapToItem={index => {
            flatListRef.current.scrollToIndex({index: index, animated: true});
            setSubCatID(sections[index].id);
          }}
          renderItem={({item}) => {
            return renderView();
          }}
        />

        {/* <View style={[styles.sectionsContainer, {alignSelf: 'flex-end'}]}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={sections}
            ref={flatListRef}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            inverted={lang.lang == 'ar' ? true : false}
          />
          <AppView height={3} />
        </View>
        <AppList
          flex
          idPathInData={'id'}
          rowRenderer={(data, index) => (
            <StoreCard item={data} bg={isFilter} catID={catID} />
          )}
          apiRequest={{
            url: `${BASE_URL}stores?category_id=${catID}&subcategory_id=${
              subCatID === 'all' ? '' : subCatID
            }&public_search=${word}&near_by=${nearBy}`,
            params: {
              paginate: 10,
            },
            responseResolver: response => {
              setNumber(response.data.length);
              return {
                data: response.data,
                // pageCount: response.meta.current_page,
              };
            },
            onError: error => {
              i18next.t('ui-error-happened');
            },
          }}
          noResultsLabel={i18next.t('No found data')}
        /> */}
      </AppView>
      {isFilter ? renderFilter() : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    width: Dimensions.DEVICE_WIDTH,
  },
  textRight: {
    width: '100%',
    textAlign: 'right',
  },
  categoryContainer: {
    width: Dimensions.DEVICE_WIDTH * 0.95,
    alignItems: 'center',
    paddingTop: Dimensions.DEVICE_HEIGHT * 0.03,
  },
  sectionsContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  icon: {
    width: 25,
    height: 25,
    marginHorizontal: 5,
  },
  input: {
    width: Dimensions.DEVICE_WIDTH,
    height: Dimensions.DEVICE_HEIGHT * 0.09,
    elevation: 4,
    backgroundColor: colors.white,
    shadowOpacity: 0.3,
    shadowColor: colors.black,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginVertical: 1,
  },
  iconIput: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },

  listContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 5,
  },
  cardContainer: {
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.white,
    // elevation: 3,
    // shadowOpacity: 0.3,
    marginVertical: 4,
    marginHorizontal: 1,
    paddingVertical: 4,
  },
  subText: {
    width: '90%',
    color: colors.grayText,
    fontFamily: fonts.normal,
    fontSize: 17,
    marginVertical: 4,
    textAlign: 'right',
  },
  text: {
    width: '90%',
    color: colors.black,
    fontFamily: fonts.normal,
    fontSize: 22,
    marginVertical: 4,
    textAlign: 'right',
  },
  en: {
    transform: [{rotateY: '180deg'}],
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Stores;
