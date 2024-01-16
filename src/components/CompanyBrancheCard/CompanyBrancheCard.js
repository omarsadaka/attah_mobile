import React, { useCallback, useState } from 'react';
import {
  AppImage,
  AppNavigation,
  AppText,
  AppView,
  AppIcon,
} from '../../common';
import I18n from 'i18next';
import colors from '../../common/defaults/colors';

const CompanyBrancheCard = ({ title, index }) => {
  return (
    <AppView
      stretch flex
      padding={5}
      marginHorizontal={5}
      marginVertical={3}
      row backgroundColor={colors.white}
      borderRadius={10}
    >
      <AppView backgroundColor={colors.primary1}
        borderRadius={8} paddingVertical={2} paddingHorizontal={1}>
        <AppIcon borderRadius={5} size={7} paddingHorizontal={3}
          paddingVertical={2}
          name="location-pin" type="SimpleLineIcons" />
      </AppView>
      <AppText marginHorizontal={3}>{'إسم الفرع او عنوان الفرع'}</AppText>

    </AppView>
  );
};

export default CompanyBrancheCard;
