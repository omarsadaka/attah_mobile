import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../api/utils/urls';
import { AppList, AppText, AppView } from '../../common';
import Dimensions from '../../common/defaults/Dimensions';
import colors from '../../common/defaults/colors';
import fonts from '../../common/defaults/fonts';
import { Header, ScrollableContainer } from '../../components';
import ProductItem from '../../components/ProductItem/ProductItem';
import FavouriteRepo from '../../repo/favourite';
import Image2 from '../Home/assets/storeicon2.png';
let favouriteRepo = new FavouriteRepo();
const Favourites = props => {
  const lang = useSelector(state => state.lang);
  const [products, setProducts] = useState([]);
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await favouriteRepo.getFavList();
    console.log('products', data);
    setProducts(data.data);
    setLoading(false);
  };

  const renderItem2 = ({item, index}) => (
    <ProductItem
      source={Image2}
      item={item}
      cardHeight={Dimensions.DEVICE_HEIGHT * 0.25}
      isEven={index % 2 == 0}
      index={index}
      isFav={true}
      refreshData={() => loadData()}
      lenght={number}
    />
  );
  return (
    <ScrollableContainer
    flex
    width={100}
    stretch
    title={i18next.t('fav-list')}
    center
    >
    <AppView flex stretch>
      {/* <Header />
      <AppText
        color={colors.black}
        marginTop={5}
        size={10}
        marginHorizontal={5}
        style={styles.textRight}>
        {i18next.t('whishlist')}
      </AppText> */}
      <AppText
        color={colors.black}
        marginTop={2}
        size={6}
        marginHorizontal={5}
        style={styles.textRight}>
        {i18next.t('You-have')} {products.length} {i18next.t('product')}
      </AppText>

      {/* <FlatList
            contentContainerStyle={[
              {flexGrow: 1},
              // {alignItems: lang.lang == 'en' ? 'flex-end' : 'flex-end'},
            ]}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={products}
            renderItem={renderItem2}
            keyExtractor={item => item.id}
          /> */}
      <AppList
        flex
        columns={2}
        idPathInData={'id'}
        rowRenderer={(item, index) => (
          <ProductItem
            source={Image2}
            item={item}
            cardHeight={Dimensions.DEVICE_HEIGHT * 0.25}
            isEven={index % 2 == 0}
            index={index}
            isFav={true}
            refreshData={() => loadData()}
            lenght={number}
          />
        )}
        apiRequest={{
          url: `${BASE_URL}favourites`,
          params: {},
          responseResolver: response => {
            console.log(
              '🚀 ~ file: Favourites.js:102 ~ Favourites ~ response:',
              response,
            );
            setNumber(response.data.data.length);
            return {
              data: response.data.data,
              pageCount: response.data.meta.total,
            };
          },
          onError: error => {
            i18next.t('ui-error-happened');
          },
        }}
        noResultsLabel={i18next.t('No found data')}
      />
    </AppView>
    </ScrollableContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  textRight: {
    fontFamily: fonts.normal,
  },
  categoryContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
  },
  en: {
    transform: [{rotateY: '180deg'}],
  },
});

export default Favourites;
