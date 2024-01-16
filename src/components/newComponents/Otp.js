import React from 'react';
import { StyleSheet } from 'react-native';
import OTPInputView from '../@twotalltotems/react-native-otp-input';

const CustomOtp = ({
  pinCount,
  onCodeChanged,
  codeInputFieldStyle,
  codeInputHighlightStyle,
  onCodeFilled,
  code,
}) => {
  return (
    <OTPInputView
      onCodeChanged={onCodeChanged}
      pinCount={pinCount}
      codeInputFieldStyle={codeInputFieldStyle}
      codeInputHighlightStyle={codeInputHighlightStyle}
      onCodeFilled={onCodeFilled}
      code={code}
    />
  );
};

export default CustomOtp;

const styles = StyleSheet.create({});
