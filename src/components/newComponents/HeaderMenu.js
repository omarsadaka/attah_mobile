import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { AppNavigation, AppView, AppText } from '../../common';

const HeaderMenu = props => {
  const lang = useSelector(state => state.lang);

  return (
    <AppView
      stretch
      marginHorizontal={5}
      row
      spaceBetween
      style={{
        height: 50,
      }}>
        <TouchableOpacity onPress={() => AppNavigation.openMenu()}>
        <Image
          style={[
            lang.lang == 'en' ? styles.en : null,
            {
              width: 25,
              height: 14,
              marginHorizontal: 17,
            },
          ]}
          source={require('../../assets/imgs/menu.png')}
        />
      </TouchableOpacity>
     <AppText size={12}>{props.title}</AppText> 
      <Image
        style={{
          width: 35,
          height: 35,
          marginHorizontal: 17,
        }}
        source={require('../../assets/imgs/logo.png')}
      />
      
    </AppView>
  );
};

export default HeaderMenu;

const styles = StyleSheet.create({
  // container: {
  //   // justifyContent: 'space-between',
  //   height: 100,
  //   width: '100%',
  // },
  // button: {
  //   position: 'absolute',
  //   top: 40,
  //   right: 40,
  // },
  en: {
    transform: [{rotateY: '180deg'}],
  },
});
