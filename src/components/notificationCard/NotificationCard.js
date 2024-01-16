import React, {useCallback, useState} from 'react';
import {
  AppImage,
  AppNavigation,
  AppText,
  AppView,
  TouchableView,
} from '../../common';
import I18n from 'i18next';
import moment from 'moment';
import colors from '../../common/defaults/colors';
import {Linking} from 'react-native';
import {NotificationsRepo} from '../../repo';
const notifications = require('../../assets/imgs/notifications.png');

const notificationsRepo = new NotificationsRepo();
const NotificationCard = props => {
  const {title, message, link, is_read, updated_at, id} = props;
  return (
    <TouchableView
      key={id}
      stretch
      flex
      padding={5}
      marginHorizontal={5}
      marginVertical={3}
      row
      backgroundColor={colors.white}
      spaceBetween
      borderRadius={15}
      onPress={
        is_read
          ? undefined
          : () => {
              const res = notificationsRepo.readNotif(id);
              if (res) {
                props.updateItemInList(id, {is_read: true});
              }
            }
      }>
      <AppImage source={notifications} equalSize={10} />
      <AppView stretch flex marginHorizontal={5}>
        <AppText size={8}>{title}</AppText>
        <AppText marginVertical={3}>{message}</AppText>
        {link ? (
          <AppText type="link" onPress={() => Linking.openURL(link)}>
            {link}
          </AppText>
        ) : null}
        <AppText color={colors.graytext} marginVertical={3}>
          {moment(updated_at).format('DD-MM-yyyy  hh:mm a')}
        </AppText>
      </AppView>
      {!is_read && (
        <AppView stretch flex={0.07} center>
          <AppView
            circleRadius={4}
            backgroundColor={colors.secondary}
            elevation={5}
          />
        </AppView>
      )}
    </TouchableView>
  );
};

export default NotificationCard;
