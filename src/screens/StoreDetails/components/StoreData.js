import i18next from 'i18next';
import React,{ useEffect ,useState} from 'react';
import { useSelector } from 'react-redux';
import { AppScrollView } from '../../../common';
import Row from './RowItem';
import { BASE_URL } from '../../../api/utils/urls';
import { LoadingView } from '../../../components';
import axios from 'axios';

const StoreData = ({item, storeID,}) => {
  const lang = useSelector(state => state.lang);
  const [storeData, setStoreData] = useState({});
  const [loading, setLoading] = useState(false);
  const data = [
    {
      id: 1,
      label: i18next.t('about-title1'),
      answer:
        lang.lang == 'ar'
          ? storeData?.ar?.description
            ? storeData?.ar?.description
            : storeData?.description
          : storeData?.en?.description
          ? storeData?.en?.description
          : storeData?.description,
    },
    {
      id: 2,
      label: i18next.t('about-title2'),
      answer:
        lang.lang == 'ar'
          ? storeData?.ar?.refund_policy
            ? storeData?.ar?.refund_policy
            : storeData?.refund_policy
          : storeData?.en?.refund_policy
          ? storeData?.en?.refund_policy
          : storeData?.refund_policy,
    },
    {
      id: 3,
      label: i18next.t('about-title3'),
      answer: storeData?.shipping_companies,
    },
    {
      id: 4,
      label: i18next.t('about-title4'),
      answer: storeData?.contacts,
    },
    // {
    //   id: 5,
    //   label: i18next.t('about-title5'),
    //   answer: storeData.maaroof,
    // },
    {
      id: 6,
      label: i18next.t('about-title6'),
      answer: storeData?.commercial_register_no,
      label1: i18next.t('about-title9'),
      answer1: storeData?.work_document,
      label2: i18next.t('about-title8'),
      answer2: storeData?.vat_no,
      label3: i18next.t('about-title10'),
      answer3: storeData?.AuthNumBusiness,
      type: storeData.entity_type
    },
    // {
    //   id: 7,
    //   label: i18next.t('about-title9'),
    //   answer: storeData.work_document,
    // },
    // {
    //   id: 8,
    //   label: i18next.t('about-title8'),
    //   answer: storeData.vat_no,
    // },
  ];

  useEffect(()=>{
    getStoreData()
  },[])

  const getStoreData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}stores/${storeID}`);
      let data = res.data;
      console.log('🚀 ~ file: StoreDetails.js:65 ~ getStoreData ~ res:', res);
      console.log('getStoreData', data)
      setStoreData(data);
      setLoading(false);
    } catch (error) {
      console.log('error.response  get store', error);
      setLoading(false);
    }
  };

  return (
    <AppScrollView flex stretch>
      {loading?
       <LoadingView />
      :
      <>
      {data.map(item => {
        return <Row key={item.id} item={item} />;
      })}
      </>
      }
    </AppScrollView>
  );
};


export default StoreData;
