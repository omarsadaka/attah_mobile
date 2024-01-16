import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { useSelector } from 'react-redux';
import Dimensions from '../common/defaults/Dimensions';
import colors from '../common/defaults/colors';
import fonts from '../common/defaults/fonts';

const DefaultInput = ({
  value,
  secure,
  onChange,
  onSecure,
  hint,
  iconName,
  editable,
  isRightIcon,
  style,
  isLeftIcon,
  iconName2,
  keyboardType,
}) => {
  const lang = useSelector(state => state.lang);
  return (
    <View style={[styles.input, style]}>
      <Input
        placeholder={hint}
        placeholderTextColor={colors.black}
        underlineColorAndroid="transparent"
        inputContainerStyle={{borderBottomWidth: 0}}
        containerStyle={{height: Dimensions.DEVICE_HEIGHT * 0.08}}
        defaultValue={value}
        secureTextEntry={secure}
        keyboardType={keyboardType}
        editable={editable}
        style={[
          styles.label_style,
          {textAlign: lang.lang == 'en' ? 'left' : 'right'},
        ]}
        leftIcon={
          isLeftIcon ? (
            <Icon
              name={iconName}
              type="feather"
              size={Dimensions.DEVICE_HEIGHT * 0.025}
              color={colors.darkGray}
            />
          ) : null
        }
        rightIcon={
          isRightIcon ? (
            <Icon
              name={iconName2}
              type="ionicon"
              size={Dimensions.DEVICE_HEIGHT * 0.03}
              color={colors.darkGray}
              onPress={() => onSecure()}
            />
          ) : null
        }
        onChangeText={value => onChange(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
  },
  input: {
    width: '100%',
    height: Dimensions.DEVICE_HEIGHT * 0.08,
    backgroundColor: colors.white,
    borderRadius: Dimensions.DEVICE_HEIGHT * 0.02,
    borderColor: colors.grayText,
    borderWidth: 0.5,
    alignItems: 'center',
    elevation: 3,
    shadowOpacity: 0.2,
  },
  label_style: {
    fontSize: Dimensions.DEVICE_HEIGHT * 0.022,
    fontFamily: fonts.normal,
    height: Dimensions.DEVICE_HEIGHT * 0.08,
    textAlign: 'right',
    color: colors.black,
  },
});

export default DefaultInput;
