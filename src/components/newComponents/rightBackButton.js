import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import Icon from '../../assets/imgs/IconLeft.png';
import {Navigation} from 'react-native-navigation';
import {AppNavigation} from '../../common';
import {useSelector} from 'react-redux';
const RighButton = ({style, componentId, background}) => {
  const lang = useSelector(state => state.lang);
  console.log(componentId);
  if (background) {
    return (
      <TouchableOpacity
        style={{width: '100%'}}
        onPress={() => Navigation.pop(componentId)}>
        <ImageBackground
          style={{
            alignItems: 'flex-end',
          }} //in case its rtl
          source={require('../../assets/imgs/topBarBg.png')}>
          <Image
            style={{
              width: 30,
              height: 30,
              marginHorizontal: 20,
              marginVertical: 30,
            }}
            source={Icon}
          />
        </ImageBackground>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        alignItems: 'flex-end',
        // paddingHorizontal: 20,
        // paddingVertical: 30,
      }}
      onPress={() => {
        // Navigation.pop(componentId);
        AppNavigation.pop();
      }}>
      <Image
        style={[
          lang.lang == 'en' ? styles.en : null,
          {
            width: 30,
            height: 30,
            marginHorizontal: 20,
            marginVertical: 30,
          },
        ]}
        source={Icon}
      />
    </TouchableOpacity>
  );
};

export default RighButton;
const styles = StyleSheet.create({
  en: {
    transform: [{rotateY: '180deg'}],
  },
});
