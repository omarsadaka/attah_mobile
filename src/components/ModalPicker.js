import i18next from 'i18next';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import { useSelector } from 'react-redux';
import { AppText, AppView } from '../common';
import Dimensions from '../common/defaults/Dimensions';
import colors from '../common/defaults/colors';
import fonts from '../common/defaults/fonts';
const ModalPicker = ({
  data,
  hint,
  top,
  width,
  defaultIndex,
  defaultColor,
  onSelect,
  onTouchEnd,
  showIcon,
  iconName,
  height,
  style,
}) => {
  const {t} = useTranslation();
  const [color, setColor] = useState(defaultColor);
  const rtl = useSelector(state => state.lang.rtl);

  return (
    <AppView style={[styles.spinner]} flex stretch row spaceBetween>
      <ModalDropdown
        defaultIndex={defaultIndex ?? -1}
        options={data}
        style={[
          style,
          {flex: 1, paddingHorizontal: Dimensions.DEVICE_WIDTH * 0.02},
        ]}
        textStyle={[
          styles.spiner_text,
          rtl ? styles.ar : styles.en,
          {color: color},
        ]}
        defaultValue={hint}
        dropdownStyle={styles.dropdown_style}
        dropdownTextStyle={styles.label_style}
        dropdownTextHighlightStyle={styles.label_style}
        adjustFrame={() => {
          return {
            width: Dimensions.DEVICE_WIDTH * 0.8,
            alignItems: 'center',
            position: 'absolute',
            left: Dimensions.DEVICE_WIDTH * 0.1,
            top: top ?? Dimensions.DEVICE_HEIGHT * 0.35,
            paddingHorizontal: 3,
            height: height,
            elevation: 2,
            shadowOpacity: 0.2,
            backgroundColor: colors.white,
          };
        }}
        renderRow={(option, index, isSelected) => {
          return (
            <AppView
              stretch
              row
              center
              paddingHorizontal={5}
              flex
              style={{
                width: Dimensions.DEVICE_WIDTH * 0.8,
                backgroundColor: Platform.OS == 'android' ? colors.white : null,
              }}>
              <AppText style={styles.spiner_label}>
                {option.name
                  ? option.name
                  : option.option
                  ? option.option.name
                  : option.value}
              </AppText>
              {option.price ? (
                <AppText style={styles.spiner_label2}>
                  {option.price} {i18next.t('sar')}
                </AppText>
              ) : null}

              {isSelected ? (
                <Icon name="check" size={20} color="#49A0E3" />
              ) : null}
            </AppView>
          );
        }}
        renderButtonText={rowData =>
          rowData.name
            ? rowData.name
            : rowData.option
            ? rowData.option.name
            : rowData.value
        } // ba3d ma t5tar
        onTouchEnd={() => onTouchEnd()}
        onSelect={(index, value) => {
          onSelect(value);
          setColor(colors.black);
        }}
      />
      <Icon
        name="chevron-down"
        type="feather"
        size={15}
        color={colors.grayText}
      />
      {showIcon ? (
        <Icon
          name={iconName}
          type="feather"
          size={Dimensions.DEVICE_HEIGHT * 0.025}
          color={colors.black}
        />
      ) : null}
    </AppView>
  );
};

const styles = StyleSheet.create({
  label_style: {
    fontSize: Dimensions.DEVICE_HEIGHT * 0.02,
    fontFamily: fonts.normal,
    fontWeight: '200',
    color: 'black',
    height: Dimensions.DEVICE_HEIGHT * 0.07,
  },
  spiner_text: {
    flex: 1,
    // backgroundColor:'red',
    fontSize: Dimensions.DEVICE_HEIGHT * 0.02,
    fontFamily: fonts.normal,
    fontWeight: '200',
  },
  ar: {
    textAlign: 'right',
  },
  en: {
    textAlign: 'left',
  },
  spinner: {
    alignItems: 'center',
    borderRadius: Dimensions.DEVICE_HEIGHT * 0.01,
    paddingHorizontal: Dimensions.DEVICE_HEIGHT * 0.012,
    borderColor: colors.grayText,
    borderWidth: 1,
    backgroundColor: colors.white,
    elevation: 2,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 1},
  },
  dropdown_style: {
    borderRadius: Dimensions.DEVICE_WIDTH * 0.02,
    backgroundColor: colors.white,
    elevation: 3,
    overflow: 'hidden',
  },
  spiner_label: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.normal,
    marginVertical: Dimensions.DEVICE_HEIGHT * 0.02,
    marginHorizontal: Dimensions.DEVICE_HEIGHT * 0.03,
    color: 'black',
  },
  spiner_label2: {
    // flex: 1,
    fontSize: 14,
    fontFamily: fonts.normal,
    marginVertical: Dimensions.DEVICE_HEIGHT * 0.02,
    marginHorizontal: Dimensions.DEVICE_HEIGHT * 0.03,
  },
  img: {
    width: Dimensions.DEVICE_WIDTH * 0.1,
    height: Dimensions.DEVICE_WIDTH * 0.1,
    borderRadius: (Dimensions.DEVICE_WIDTH * 0.1) / 2,
    marginHorizontal: Dimensions.DEVICE_HEIGHT * 0.02,
  },
});
export default ModalPicker;
