import React from 'react';
import { useSelector } from 'react-redux';
import { AppText, TouchableView } from '../../../common';
import colors from '../../../common/defaults/colors';

const SectionCard = ({item, onPress, itemID}) => {
  const lang = useSelector(state => state.lang);

  return (
    <TouchableView
      onPress={onPress}
      stretch
      paddingHorizontal={10}
      paddingVertical={5}
      borderRadius={10}
      marginVertical={5}
      marginHorizontal={3}
      backgroundColor={itemID == item.id ? '#9E0039' : colors.white}
      center>
      <AppText color={itemID === item.id ? colors.white : '#9E0039'}>
        {lang.lang == 'ar' ? item.ar.name : item.en.name}
      </AppText>
    </TouchableView>
  );
};

export default SectionCard;
