import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {AppText} from '../../../../common';
import avatar from '../../../../assets/imgs/avatar.png';
import colors from '../../../../common/defaults/colors';
import i18next from 'i18next';
import {useSelector} from 'react-redux';

const AvatarCard = ({name, email, image}) => {
  const lang = useSelector(state => state.lang);

  return (
    <View style={[styles.avatarCard]}>
      <Image source={{uri: image}} style={styles.image} />
      <View>
        <AppText style={styles.rightText} size={8} bold>
          {name}
        </AppText>
        <AppText style={styles.rightText} size={6} color={colors.darkGray} bold>
          {email}
        </AppText>
      </View>
    </View>
  );
};

export default AvatarCard;

const styles = StyleSheet.create({
  avatarCard: {
    width: '90%',
    height: 75,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
    backgroundColor: colors.white,
    elevation: 4,
    shadowOpacity: 0.3,
  },
  rightText: {
    textAlign: 'right',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginHorizontal: 20,
  },
});
