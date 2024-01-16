import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';

import styles from './styles';
import arrow from '../../assets/imgs/arrow.png';
import {Navigation} from 'react-native-navigation';
import Login from '../login/Login';

const ArrowIcon = props => {
  return (
    <View style={styles.arrow}>
      {/* <TouchableOpacity
        onPress={() =>
          Navigation.push(props.componentId, {
            component: {
              name: Login,
            },
          })
        }> */}
      <Image source={arrow} />
      {/* </TouchableOpacity> */}
    </View>
  );
};

export default ArrowIcon;
