import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useSelector } from 'react-redux';
import { NOTIFCOUNT } from '../../actions/types';
import { BASE_URL } from '../../api/utils/urls';
import { AppList, AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import fonts from '../../common/defaults/fonts';
import HeaderMenu from '../../components/newComponents/HeaderMenu';
import store from '../../store/store';
import NotificationCard from './component/NotificationCard';

const Notifications = props => {
  const userData = store.getState().auth.userData;
  const notif_count = store.getState().auth.notifCount;
  const [notificationsUnRead, setNotificationsUnRead] = useState([]);
  const [isRead, setIsRead] = useState(false);
  const refreshNotificationCount = useSelector(
    state => state.list.refreshNotificationCount,
  );
  useEffect(() => {
    if (userData) {
      Navigation.mergeOptions('Notifications', {
        bottomTab: {
          badge: notif_count > 0 ? notif_count.toString() : '0',
        },
      });
    }
  }, [notif_count, isRead]);

  return (
    <AppView flex stretch borderBottomWidth={1}>
      <HeaderMenu
        backgroundColor={colors.gray}
        componentId={props.componentId}
        title={i18next.t('notifications')}
      />
      {/* <AppText
        color={colors.black}
        marginTop={5}
        stretch
        size={10}
        marginHorizontal={5}>
        {i18next.t('notifications')}
      </AppText> */}
      <AppView stretch spaceBetween row marginVertical={3}>
        <AppView flex stretch>
          <AppText color={colors.black} size={6} marginHorizontal={5}>
            {i18next.t('You-have')} {isRead ? '0' : notificationsUnRead.length}{' '}
            {i18next.t('un-read')}
          </AppText>
        </AppView>

        <TouchableOpacity
          onPress={async () => {
            setIsRead(true);
            await store.dispatch({
              type: NOTIFCOUNT,
              payload: '0',
            });
          }}>
          <AppText
            color={'#9E0039'}
            size={6.5}
            marginHorizontal={5}
            style={styles.textLeft}>
            {i18next.t('save-all-read')}
          </AppText>
        </TouchableOpacity>
      </AppView>

      <AppList
        flex
        idPathInData={'id'}
        refreshControl={refreshNotificationCount}
        rowRenderer={(data, index) => <NotificationCard item={data} />}
        apiRequest={{
          url: isRead
            ? `${BASE_URL}user-notifications?is_read=1`
            : `${BASE_URL}user-notifications`,
          params: {
            paginate: 10,
          },
          responseResolver: response => {
            return {
              data: response.data.data,
              pageCount: response.data.meta.total,
            };
          },
          onError: error => {
            i18next.t('ui-error-happened');
          },
        }}
        noResultsLabel={i18next.t('No found data')}
      />
    </AppView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  textRight: {
    textAlign: 'right',
    fontFamily: fonts.normal,
  },
  textLeft: {
    flex: 1,
    textAlign: 'left',
    fontFamily: fonts.normal,
  },
  categoryContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
  },
});

export default Notifications;
