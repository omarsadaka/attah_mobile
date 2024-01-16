import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  AppImage,
  AppNavigation,
  AppText,
  TouchableView,
} from '../../common';

const ShippingCompaniesCard = ({ image, id }) => {
  const rtl = useSelector(state => state.lang.rtl);

  return (
    <TouchableView
      key={id}
      stretch flex
      marginTop={5}
      marginHorizontal={3}
      style={{
        transform: [
          {
            scaleX: rtl ? -1 : 1,
          }
        ]
      }}
    >
      <AppImage
        backgroundColor="#fff"
        source={{ uri: image }}
        height={6}
        width={20}
        resizeMode={'contain'}
        borderRadius={5}
      />
    </TouchableView>
  );
};

export default ShippingCompaniesCard;
