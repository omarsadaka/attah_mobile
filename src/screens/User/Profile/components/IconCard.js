import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../../common/defaults/colors';
import {AppText} from '../../../../common';
import i18next from 'i18next';
import {useSelector} from 'react-redux';

const IconCard = ({source, title, onPress}) => {
  const lang = useSelector(state => state.lang);

  return (
    <TouchableOpacity style={[styles.iconCard]} onPress={onPress}>
      <View style={{flexDirection: 'row-reverse'}}>
        <Image style={{marginHorizontal: 5}} source={source} />
        <AppText color={colors.white}> {title}</AppText>
      </View>
      <Icon
        color={colors.white}
        name={
          lang.lang == 'en' ? 'keyboard-arrow-right' : 'keyboard-arrow-left'
        }
        size={25}
      />
    </TouchableOpacity>
  );
};

export default IconCard;

const styles = StyleSheet.create({
  iconCard: {
    width: '90%',
    height: 75,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderColor: 'red',
    borderWidth: 1,
    backgroundColor: colors.primary,
    color: colors.white,
    paddingHorizontal: 10,
    marginTop: 15,
  },
  en: {
    transform: [{rotateY: '180deg'}],
  },
});
