import RighButton from './rightBackButton';

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../common/defaults/colors';

const HeaderBackButton = ({componentId, backgroundColor}) => {
  return (
    <View
      style={{
        marginTop: 30,
        marginRight: 30,
        backgroundColor: backgroundColor ? backgroundColor : colors.white,
      }}>
      <RighButton componentId={componentId} />
    </View>
  );
};

export default HeaderBackButton;
