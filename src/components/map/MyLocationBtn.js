import React, {useRef} from 'react';
import {useSelector} from 'react-redux';
import {AppButton, AppIcon, responsiveWidth} from '../../common';
import styles from './styles';
const MyLocationBtn = ({onPress}) => {
  const rtl = useSelector((state) => state.lang.rtl);
  const style = useRef([
    styles.myLocationButton,
    rtl ? {left: responsiveWidth(5)} : {right: responsiveWidth(5)},
  ]);
  return (
    <AppButton
      elevation={2}
      backgroundColor="white"
      circleRadius={15}
      style={style.current}
      onPress={onPress}>
      <AppIcon
        name="location-searching"
        type="MaterialIcons"
        color="foreground"
        size={11}
      />
    </AppButton>
  );
};

export default MyLocationBtn;
