import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import I18n from 'i18next';
import ReactNativePickerModule from 'react-native-picker-module';
import {
  AppIcon,
  AppImage,
  AppNavigation,
  AppSpinner,
  AppText,
  AppView,
  getTheme
} from '../common';
import colors from '../common/defaults/colors';
import InputError from '../common/micro/InputError';
import TouchableView from '../common/TouchableView';
import assets from './PickerImages';

const Picker = ({
  title,
  name,
  error,
  setFieldValue,
  reset,
  processing,
  onChangeValue,
  isDirty,
  value,
  label,
  noResultsLabel,
  noResultsLabelPickerModal,
  initialValue,
  setInitialValueAfterFetch,
  touchableOpacity,
  data,
  showImage,
  leftItems,
  address,
  extraData,
  headerRightItems,
  paddingVertical,
  borderColor,
  size,
  refresh,
  param,
  language,
  marginHorizontal,
  isSearch,
  ...rest
}) => {
  const placeholder = useMemo(() => `${title}`, [title]);
  const showError = useMemo(() => error && isDirty, [error, isDirty]);
  let pickerRef = useRef();
  const [selectedCode, setSelectedCode] = useState(
    initialValue
      ? initialValue
      : {
          label: placeholder,
          value: null,
        },
  );

  const onSelect = useCallback(
    pickerValue => {
      const indx = data.findIndex(item => item[`${label}`] === pickerValue);
      const val = data[indx][`${value}`];
      const image = data[indx]?.image;
      if (language) I18n.locale = val;
      setSelectedCode({
        label: language ? I18n.t(val) : pickerValue,
        value: val,
        image: image,
      });
      if (onChangeValue) {
        onChangeValue(val);
      }
      if (setFieldValue) {
        if (extraData) {
          console.log('3333333333 extraData', extraData, pickerValue);
          setFieldValue(extraData, pickerValue);
        }
        setFieldValue(name, val);
      }
    },
    [data, label, name, onChangeValue, setFieldValue, value],
  );
  const memoizedData = useMemo(() => {
    return data.length > 0
      ? data.map(item => item[`${label}`])
      : noResultsLabel
      ? [noResultsLabel]
      : [];
  }, [data, label]);

  useEffect(() => {
    console.log('c refresh xxxxx ', refresh);
    if (refresh) {
      setSelectedCode({
        label: placeholder,
        value: null,
      });
    }
    if (data && data.length > 0 && setInitialValueAfterFetch) {
      setSelectedCode({
        label: data[0][`${label}`],
        value: data[0].id,
      });
      if (setFieldValue) {
        setFieldValue(name, data[0].id);
        if (extraData) setFieldValue(extraData, data[0].address_details);
      }
    }
  }, [data, refresh, setInitialValueAfterFetch]);

  return (
    <AppView flex stretch {...{rest}}>
      <TouchableView
        spaceBetween
        row
        {...{touchableOpacity}}
        onPress={
          processing
            ? undefined
            : () => {
                // if (!isSearch) {
                //   pickerRef.show();
                // } else {
                AppNavigation.push({
                  name: 'pickerModal',
                  passProps: {
                    isSearch,
                    title,
                    noResultsLabelPickerModal,
                    headerRightItems,
                    searchTitle: I18n.t('searchHere'),
                    data: memoizedData,
                    selected: selectedCode,
                    label: selectedCode.label,
                    onChange: onSelect,
                  },
                });
                // }
              }
        }
        stretch
        paddingVertical={paddingVertical}
        borderColor={
          selectedCode.value
            ? colors.primary
            : error
            ? colors.error1
            : borderColor
        }
        {...rest}
        center
        height={
          selectedCode?.value && address && selectedCode?.label?.length > 50
            ? 0
            : Platform.OS === 'android' ? 7 : 6
        }>
        <AppView flex row stretch>
          {leftItems && leftItems}
          <AppView stretch row flex>
            {!processing ? (
              <>
                {showImage && selectedCode.value !== null ? (
                  <AppImage
                    width={12}
                    height={4.5}
                    borderRadius={5}
                    source={
                      selectedCode.image.includes('http')
                        ? {uri: selectedCode.image}
                        : assets[selectedCode.image]
                    }
                    resizeMode="contain"
                  />
                ) : null}

                <AppView stretch centerY marginHorizontal={marginHorizontal}>
                  <AppText
                    size={size}
                    paddingVertical={
                      selectedCode?.value &&
                      address &&
                      selectedCode?.label?.length > 50 &&
                      5
                    }>
                    {selectedCode.label + ''}
                  </AppText>
                  <ReactNativePickerModule
                    // pickerRef={pickerRef}
                    useNativeDriver
                    pickerRef={e => (pickerRef = e)}
                    selectedValue={selectedCode.value}
                    title={placeholder}
                    items={memoizedData}
                    onValueChange={onSelect}
                    cancelButton={I18n.t('Cancel')}
                    confirmButton={I18n.t('Confirm')}
                  />
                </AppView>
              </>
            ) : (
              <AppView flex stretch centerY marginHorizontal={5}>
                <AppSpinner />
              </AppView>
            )}
          </AppView>
        </AppView>

        <AppIcon
          name="keyboard-arrow-down"
          type="MaterialIcons"
          size={10}
          color={colors.graytext}
        />
      </TouchableView>
      {showError && <InputError error={error} size={size} />}
    </AppView>
  );
};

Picker.defaultProps = {
  ...getTheme().picker,
  paddingVertical: 4,
  isSearch: true,
  marginHorizontal: 3,
};
export default Picker;
