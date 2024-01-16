import React from 'react';
import { Image, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import { AppIcon, AppText } from '../../common';
import Dimensions from '../../common/defaults/Dimensions';
import colors from '../../common/defaults/colors';
import fonts from '../../common/defaults/fonts';

const Input = props => {
  const lang = useSelector(state => state.lang);
  const {
    value,
    onChangeText,
    keyboardType,
    onBlur,
    onSubmit,
    iconName,
    iconType,
    isPhone,
    placeholder,
    isUpdate,
    isEdit,
    onEndEditing,
    isAddition,
    onFocus,
    isMultiline
  } = props;
  return (
    <View style={styles.container0}>
      {isPhone ? (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
          }}>
          <View style={styles.codeContainer}>
            <View
              style={[
                styles.right,
                {
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                },
              ]}>
              <AppText style={styles.text}>966</AppText>
              <Image
                source={require('../../assets/imgs/saudi-arabia.png')}
                style={{width: 35, height: 35}}
              />
            </View>
          </View>
          <View style={{width: 5}} />
          <View style={styles.phoneContainer}>
            {props.title ? (
              <AppText
                style={[
                  styles.titleStyles,
                  {marginHorizontal: isPhone ? 10 : 0},
                ]}>
                {props.title}
              </AppText>
            ) : null}
            <View
              style={{
                alignItems: 'center',
              }}>
              <TextInput
                placeholder={placeholder}
                placeholderTextColor={colors.black}
                value={value}
                editable={isEdit?true:false}
                style={[
                  styles.textInput,
                  {
                    textAlign:
                      value || isPhone
                        ? 'left'
                        : lang.lang == 'en'
                        ? 'left'
                        : 'right',
                    paddingStart: 30,
                  },
                ]}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                onBlur={onBlur}
                onSubmitEditing={onSubmit}
                onEndEditing={onEndEditing}
              />
              <Text
                style={[
                  styles.left2,
                  {
                    width: '5%',
                    position: 'absolute',
                    fontSize: 22,
                    color: colors.grayText,
                    fontFamily: fonts.normal,
                    top: Dimensions.DEVICE_HEIGHT * 0.017,
                  },
                ]}>
                5
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={[styles.container,{borderColor:isAddition?'#66002521':colors.black}]}>
          {props.title ? (
            <AppText style={[styles.titleStyles,{color:isAddition?'gey': colors.primary}]}>{props.title}</AppText>
          ) : null}
          <View
            style={{
              alignItems: 'center',
            }}>
            <TextInput
              placeholder={placeholder}
              placeholderTextColor={isAddition?'grey':colors.black}
              multiline={isMultiline}
              value={value}
              style={[
                styles.textInput,
                {
                  textAlign: isPhone
                    ? 'left'
                    : lang.lang == 'en'
                    ? 'left'
                    : 'right',
                  fontSize: isAddition?12:17
                  // marginEnd: isPhone ? (lang.lang == 'en' ? '40%' : -110) : 0,
                },
              ]}
              onChangeText={onChangeText}
              keyboardType={keyboardType}
              onBlur={onBlur}
              onFocus={onFocus}
            />
          </View>
          {/* {isPhone ? (
            <View
              style={[
                lang.lang == 'ar' ? styles.left : styles.right,
                {
                  flexDirection: lang.lang == 'ar' ? 'row' : 'row-reverse',
                  alignItems: 'center',
                  position: 'absolute',

                  top: 0,
                  bottom: 0,
                },
              ]}>
              <Image
                source={require('../../assets/imgs/saudi-arabia.png')}
                style={{width: 35, height: 35}}
              />
              <Text style={styles.text}>9665</Text>
            </View>
          ) : ( */}
          <AppIcon
            color={colors.black}
            name={iconName}
            type={iconType}
            size={18}
            style={styles.icon}
          />
          {/* )} */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderStyle: 'solid',
    height: 70,
    marginVertical: 4,
    // borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 9,
  },
  codeContainer: {
    width: 85,
    borderStyle: 'solid',
    height: 70,
    marginVertical: 4,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 9,
  },
  phoneContainer: {
    flex: 1,
    borderStyle: 'solid',
    height: 70,
    marginVertical: 4,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 10,
    // paddingHorizontal: 14,
    paddingVertical: 9,
  },
  container0: {
    width: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    height: Platform.OS == 'ios' ? '100%' : null,
    width: '100%',
    color: colors.darkText,
    fontFamily: fonts.normal,
  },
  titleStyles: {
    color: colors.primary,
    fontSize: 14,
    // fontWeight: 'bold',
    fontFamily: fonts.normal,
    // textAlign: 'right',
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.normal,
    textAlign: 'center',
    alignSelf:'center',
    marginHorizontal: 3,
  },
  right: {
    right: 10,
  },
  left: {
    left: 10,
  },
  right2: {
    right: 50,
  },
  left2: {
    left: 15,
  },
});

export default Input;
