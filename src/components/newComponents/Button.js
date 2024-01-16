import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import colors from '../../common/defaults/colors';
import fonts from '../../common/defaults/fonts';

const CustomButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.container, {width: props.width}]}>
      {props.loading ? (
        <ActivityIndicator size={'small'} color={colors.white} />
      ) : (
        <Text style={styles.text}>{props.title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: 0,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.primary,
    marginVertical: 25,
    paddingVertical: 14,
  },
  text: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.normal,
    // fontWeight: '900',
  },
});
