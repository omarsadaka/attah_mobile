import React, {useMemo, useRef, useEffect, useCallback, useState} from 'react';
import Picker from '../Picker';
import I18n from 'i18next';

import {getTheme} from '../../common/Theme';
import {
  AppView,
  TouchableView,
  AppText,
  AppSpinner,
  AppNavigation,
  AppIcon,
} from '../../common';
import InputError from '../../common/micro/InputError';
import CheckboxPicker from '../CheckboxPicker';
import BlockingView from '../BlockingView';
import colors from '../../common/defaults/colors';
import {useSelector} from 'react-redux';
const MultiSelectPicker = ({
  title,
  error,
  provider,
  setFieldValue,
  resetForm,
  isDirty,
  name,
  targetGroups,
  extraData,
  eventTypes,
  isEditable,
  setNewShipmentContent,
  setDocumentOnly,
  ...rest
}) => {
  const shipmentData = useSelector(state => state.shipment.shipmentData);
  const showError = useMemo(() => error && isDirty, [error, isDirty]);
  const [selectedValues, setSelectedValues] = useState(
    shipmentData?.content_types
      ? shipmentData?.content_types.map(item => item.id)
      : [],
  );
  const pickerRef = useRef();

  const [content, setContent] = useState({
    data: [],
    isLoading: true,
  });

  const showPicker = useCallback(() => {
    if (content.isLoading) {
      return;
    }
    AppNavigation.push({
      name: 'selection',
      passProps: {
        data: content.data,
        title: title + '',
        initialValue: selectedValues,
        onSelect: values => {
          console.log('----------- +++ +++ ', values);
          setFieldValue(name, values + '');
          if (values.filter(item => item === 'other').length > 0) {
            setNewShipmentContent(true);
            setFieldValue('newShipmentContent', true);
          } else {
            setNewShipmentContent(false);
            setFieldValue('newShipmentContent', false);
          }
          if (extraData) {
            const selectedData = content.data.filter(
              item => values.findIndex(val => val === item.id) >= 0,
            );
            setFieldValue(extraData, selectedData);
          }
          if (
            values.length === 1 &&
            values.filter(item => item === 1).length > 0
          ) {
            setDocumentOnly(true);
            setFieldValue('documentOnly', true);
            resetForm();
          } else {
            setDocumentOnly(false);
            setFieldValue('documentOnly', false);
          }
          setSelectedValues(values);
        },
      },
    });
  }, [content.isLoading, content.data, name, selectedValues, setFieldValue]);

  useEffect(() => {
    getData();
  }, [getData]);
  const getData = useCallback(async () => {
    setContent(prev => ({...prev, isLoading: true}));
    if (provider) {
      const data = await provider();
      setContent({
        data,
        isLoading: false,
      });
      if (targetGroups || eventTypes)
        setSelectedValues(targetGroups || eventTypes);
    }
    setContent(prev => ({...prev, isLoading: false}));
  }, [provider]);
  return (
    <AppView stretch>
      <TouchableView
        row
        spaceBetween
        onPress={isEditable && showPicker}
        stretch
        marginVertical={5}
        label="name"
        value="id"
        {...rest}>
        {!isEditable && <BlockingView />}
        <AppView flex stretch centerY>
          {content.isLoading ? (
            <AppSpinner centerSelf />
          ) : selectedValues.length === 0 ? (
            <AppText size={7}>{title + ''}</AppText>
          ) : (
            <AppText size={7}>
              {content?.data
                .filter(
                  item => selectedValues.findIndex(val => val === item.id) >= 0,
                )
                .map(item =>
                  selectedValues.length > 1 ? item.name + ' , ' : item.name,
                )}
            </AppText>
          )}
        </AppView>
        <AppIcon
          name="keyboard-arrow-down"
          type="MaterialIcons"
          size={10}
          color={colors.graytext}
        />
      </TouchableView>
      {showError && <InputError error={error} size={7} />}
      <CheckboxPicker data={content.data} {...rest} ref={pickerRef} />
    </AppView>
  );
};
MultiSelectPicker.defaultProps = {
  ...getTheme().input,
  isEditable: true,
};

export default MultiSelectPicker;
