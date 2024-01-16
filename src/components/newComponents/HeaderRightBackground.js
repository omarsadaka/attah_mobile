import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import React from 'react';
import RighButton from './rightBackButton';
import {AppImage} from '../../common';
import bgImage from '../../assets/imgs/topBarBg.png';
import colors from '../../common/defaults/colors';

const Header = props => {
  return (
    <ImageBackground
      source={bgImage}
      style={{
        height: 100,
        width: '100%',
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : colors.white,
      }}>
      <RighButton
        style={{position: 'absolute', top: 40, right: 40}}
        componentId={props.componentId}
      />
    </ImageBackground>
  );
};

export default Header;

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
});
