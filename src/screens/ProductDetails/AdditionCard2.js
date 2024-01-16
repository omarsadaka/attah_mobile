import i18next from 'i18next';
import React, { useState } from 'react';
import {
  StyleSheet
} from 'react-native';
import { useSelector } from 'react-redux';
import { AppView } from '../../common';
import AppInput from '../../components/newComponents/input';

const AdditionCard2 = ({onBlur, onFocus}) => {
  const lang = useSelector(state => state.lang);
  const [description, setDescription] = useState('');

  

  return (
    < AppView style={{width:'100%'}}>
      <AppInput
        // title={i18next.t('write-comment')}
        placeholder={i18next.t('write-comment')}
        isMultiline={true}
        value={description}
        onChangeText={value =>{
            setDescription(value)
        }}
        isEdit={true}
        onBlur={()=>{
          onBlur(description)
        }}
        isAddition={true}
        onFocus={()=> onFocus()}
        />
    </AppView>
  );
};
const styles = StyleSheet.create({

});

export default AdditionCard2;
