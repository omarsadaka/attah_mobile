import React, { useState, useEffect, useCallback } from 'react';
import Picker from '../Picker';
import I18n from 'i18next';
import { AppView, AppText } from '../../common';

const TypesPicker = ({ setFieldValue, injectFormProps }) => {
  const data = [
    { name: I18n.t('order'), id: 'order' },
    { name: I18n.t('compliant'), id: 'suggest' },
    { name: I18n.t('suggest'), id: 'complaint' },
    { name: I18n.t('other'), id: 'other' },
  ];

  return (
    <AppView stretch marginVertical={3}>
      <Picker
        label="name"
        value="id"
        data={data}
        title={I18n.t('contact-goal')}
        {...{ setFieldValue }}
        {...injectFormProps('type')}
      />
    </AppView>
  );
};

export default TypesPicker;
