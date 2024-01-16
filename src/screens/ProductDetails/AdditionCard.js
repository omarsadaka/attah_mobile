import i18next from 'i18next';
import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { AppText, showError } from '../../common';
import colors from '../../common/defaults/colors';

const AdditionCard = ({item,onSelect,onRemove,isContain}) => {
  const lang = useSelector(state => state.lang);
  const [checkedID, setCheckedID] = useState('');
  const [ids, setIds] = useState([]);

  

  return (
    <>
    <View style={{alignItems:'center', flexDirection:lang.lang=='ar'?'row':'row-reverse' ,marginVertical:2}}>
      <AppText color={colors.black} size={8}>
          {item?.price} {i18next.t('sar')}
       </AppText>
       <AppText color={colors.black}  marginHorizontal={3} size={6.5} style={{flex:1}}>
          {item?.name}
       </AppText>
       <TouchableOpacity style={[styles.uncheckedView,{borderColor: checkedID==item?.id?colors.error:colors.grayText}]} 
       onPress={()=> {
        if(checkedID==item.id){
          setCheckedID('')
          onRemove(item)
        }else{
          if(isContain()){
           showError('يجب إختيار إضافة واحدة فقط يجب عليك حذف الإختيار السابق أولا')
          }else{
            setCheckedID(item.id)
            setIds(oldArray => [item.id,...oldArray] );
            onSelect(item)
          }
        }
        }}>
        {checkedID==item?.id?
         <View style={styles.checkedView}></View>
        :null}
       </TouchableOpacity>
    </View>
    </>
  );
};
const styles = StyleSheet.create({
  uncheckedView:{
    width:18,
    height:18,
    borderRadius:18/2,
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center'
  },
  checkedView:{
    width:10,
    height:10,
    borderRadius:10/2,
    backgroundColor: colors.error,
  }
});

export default AdditionCard;
