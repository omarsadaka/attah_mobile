import React from 'react';
import {AppNavigation, AppText} from '../common';
import I18n from 'i18next';
const ReportButton = (props) => {
  return (
    <AppText
      onPress={() =>
        AppNavigation.push({
          name: 'report',
          passProps: {
            ...props,
          },
        })
      }
      color="black"
      bold
      size={7}>
      {I18n.t('report')}
    </AppText>
  );
};

export default ReportButton;
