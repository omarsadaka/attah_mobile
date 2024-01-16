import i18next from 'i18next';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../../api/utils/urls';
import { AppList, AppText, AppView } from '../../../common';
import Dimensions from '../../../common/defaults/Dimensions';
import colors from '../../../common/defaults/colors';
import ProductItem from '../../../components/ProductItem/ProductItem';
import { BagRepo, StoreRepo } from '../../../repo';
import SectionCard from '../../Stores/components/SectionCard';

let storeRepo = new StoreRepo();
let bagRepo = new BagRepo();
const StoreProducts = ({Item, refreshHeader,storeStatus}) => {
  const lang = useSelector(state => state.lang);
  const [itemID, setItemID] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState([]);
  const [total, setTotal] = useState(0);
  const [isAddToFav, setIsAddToFav] = useState(false);

  const flatListRef = useRef(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    // const data = await storeRepo.getStoreProducts(Item.id, itemID);
    // setProducts(data);
    const categories = await storeRepo.getStoreCategory(Item.id);
    console.log(
      '🚀 ~ file: StoreProducts.js:34 ~ loadData ~ categories:',
      categories,
    );
    setSections([
      {id: 'all', ar: {name: 'الكل'}, en: {name: 'All'}},
      ...categories,
    ]);
    setLoading(false);
  };

  const loadData2 = async () => {
    // const data = await storeRepo.getStoreProducts(Item.id, itemID);
    // setProducts(data);
    const categories = await storeRepo.getStoreCategory(Item.id);
    console.log(
      '🚀 ~ file: StoreProducts.js:34 ~ loadData ~ categories:',
      categories,
    );
    setSections([
      {id: 'all', ar: {name: 'الكل'}, en: {name: 'All'}},
      ...categories,
    ]);
  };

  const renderItem = ({item, index}) => (
    <SectionCard
      item={item}
      onPress={async () => {
        setItemID(item.id);
        flatListRef.current.scrollToIndex({index: index, animated: true});
        // setLoading(true);
        // const data = await storeRepo.getStoreProducts(
        //   Item.id,
        //   item.id === 'all' ? '' : item.id,
        // );
        // setProducts(data);
        // setLoading(false);
      }}
      itemID={itemID}
    />
  );

  return (
    <AppView flex stretch backgroundColor={'#FAF9FA'}>
      {/* <AppText
        color={colors.black}
        marginTop={5}
        size={7}
        marginHorizontal={3}
        style={styles.textRight}>
        {i18next.t('You-have')} {total} {i18next.t('product')}
      </AppText> */}
      <View style={styles.sectionsContainer}>
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
 
       <AppList
       columns={2}
       centerColumns
       refreshControl={() => loadData2()}
       idPathInData={'id'}
       rowRenderer={(data, index) => (
         <ProductItem
           source={require('../../../assets/imgs/logo.png')}
           item={data}
           cardHeight={Dimensions.DEVICE_HEIGHT * 0.25}
           isEven={index % 2 == 0}
           index={index}
           isFav={false}
           refreshData={() => {
            loadData2()
           }}
           lenght={products.length}
         />
       )}
       apiRequest={{
         url: `${BASE_URL}products?type=stores&store=${Item.id}&category=${
           itemID === 'all' ? '' : itemID
         }`,
         // params: {
         //   paginate: 8,
         // },
         responseResolver: response => {
           setTotal(response.data.meta.total);
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  productContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
  },
  sectionsContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  textRight: {
    width: Dimensions.DEVICE_WIDTH * 0.9,
    // textAlign: 'auto',
  },
  en: {
    transform: [{rotateY: '180deg'}],
  },
});

export default StoreProducts;
