import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const ButtonIcon = ({title, source}) => {
  console.log('icon button');
  return (
    <TouchableOpacity style={{color: 'red'}}>
      <Text>{title ? title : ''}</Text>
      <Image source={source} />
    </TouchableOpacity>
  );
};

export default ButtonIcon;

const styles = StyleSheet.create({});
