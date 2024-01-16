import React from 'react';
import {Image} from 'react-native';
import {TouchableView, AppView, AppIcon, AppText} from '../../common';
import colors from '../../common/defaults/colors';

const Item = ({title, onPress, color, selected, source}) => {
  return (
    <TouchableView
      {...{onPress}}
      stretch
      // paddingHorizontal={18}
      paddingVertical={5}
      row
      spaceBetween>
      <AppView row>
        <AppView marginHorizontal={2}>
          <Image source={source}  style={{width: 25,height: 25,}} resizeMode='contain'/>
        </AppView>
        <AppText size={7} color={color}>
          {title}
        </AppText>
      </AppView>
    </TouchableView>
  );
};

export default Item;
