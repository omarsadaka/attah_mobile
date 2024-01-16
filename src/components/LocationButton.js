import React from 'react';
import {AppView, responsiveHeight, AppButton, responsiveWidth} from '../common';
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: responsiveHeight(5),
    zIndex: 10000,
    height: responsiveHeight(7),
    left: responsiveWidth(10),
    right: responsiveWidth(10),
  },
});
import Location from '../utils/Location';
import {StyleSheet} from 'react-native';
const LocationButton = ({error}) => {
  if (error)
    return (
      <AppButton
        style={styles.container}
        stretch
        title={error}
        onPress={Location.configure}
      />
    );
  return <AppView />;
};

export default LocationButton;
