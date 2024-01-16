import React from 'react';
import {TouchableView, AppText, AppNavigation} from '../common';
import I18n from 'i18next';
const pushReturnPolices = () => AppNavigation.push('returnPolices');
const ReturnBtn = () => {
  return (
    <TouchableView onPress={pushReturnPolices} paddingHorizontal={2}>
      <AppText
        borderBottomWidth={1}
        borderBottomColor="primary"
        color="primary"
        size={7}
        >
        {I18n.t('return-polices')}
      </AppText>
    </TouchableView>
  );
};

export default ReturnBtn;
