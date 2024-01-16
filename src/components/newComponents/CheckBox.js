import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CheckBox from '@react-native-community/checkbox';
import colors from '../../common/defaults/colors';

const CustomCheckBox = ({
  onValueChange,
  onBlur,
  value,
  activeColor,
  inActiveColor,
}) => {
  return (
    <CheckBox
      onValueChange={onValueChange}
      onBlur={onBlur}
      value={value}
      tintColors={{true: activeColor, false: inActiveColor}} // for android only
      tintColor={inActiveColor} // ios only when off
      onCheckColor={colors.white}
      onFillColor={activeColor}
      onTintColor={activeColor}
      style={{margin: Platform.OS == 'ios' ? 4 : 0}}
    />
  );
};

export default CustomCheckBox;

const styles = StyleSheet.create({});
