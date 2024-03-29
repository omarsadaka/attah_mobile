import {Text, View, Button, Image} from 'react-native';
import React, {Component} from 'react';
import i18next from 'i18next';

import styles from '../../styles';
import colors from '../../../../common/defaults/colors';
import image from '../../../../assets/imgs/startScreen1.png';
import ArrowIcon from '../../Icon';
import {AppText} from '../../../../common';

class ScreenOne extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <View style={styles.imgContainer}>
            <Image source={image} style={styles.image} />
          </View>
        </View>
        <View style={styles.textContainer}>
          <AppText style={styles.title}>
            {i18next.t('intro-message-title')}
          </AppText>
          <AppText style={styles.body}>
            {i18next.t('intro-message-body')}
          </AppText>
        </View>
      </View>
    );
  }
}

export default ScreenOne;
