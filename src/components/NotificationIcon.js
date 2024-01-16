import React, { useEffect, useState } from 'react';
import { AppIcon, AppNavigation, AppText, AppView, TouchableView } from '../common';

import { useDispatch, useSelector } from 'react-redux';
import { NotificationsRepo } from "../repo";
import { refreshList } from '../actions/list';
const notificationsRepo = new NotificationsRepo()
const goToNotifications = () => AppNavigation.push('notifications');
const NotificationIcon = () => {
  const [notifCount, setNotifCount] = useState(0)
  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.userData)
  const rtl = useSelector(state => state.lang.rtl)
  const refreshNotif = useSelector(state => state.list.refreshNotif)

  const getNotifCount = async () => {
    const res = await notificationsRepo.getNotifCount()
    if (res && (res.notifications_count || res.notifications_count === 0)) {
      setNotifCount(res.notifications_count)
    }
  }


  const listenNotif = async () => {
    try {
      const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
        firebase.notifications().onNotification(async (notification) => {
          console.log('notificationListener ', notification);
          refreshList("refreshNotif")(dispatch)
          // const { title, body, data } = notification;
        });
      }
      else {
        await firebase.messaging().requestPermission();
      }
    }
    catch (error) {
      console.log("error", error);
      if (error.response) {
        console.log("error res", error.response);
      }
    }
  }

  useEffect(() => {
    if (userData) {
      getNotifCount()
    }

  }, [refreshNotif])

  useEffect(() => {
    if (userData) {
      listenNotif()
    }
  }, [])
  return (
    <TouchableView
      onPress={userData ? goToNotifications : () => { }}
      center paddingHorizontal={5}>
      <AppIcon
        name="notifications-outline"
        color="#000"
        size={12}
      />
      {notifCount > 0 ?
        <AppView
          style={{
            position: "absolute",
            top: 1,
            left: rtl ? undefined : 12,
            right: rtl ? 12 : undefined
          }}
          circleRadius={3}
          backgroundColor="#F34423" center>
          {/* <AppText bold color="#fff">
            {notifCount > 9 ? "+9" : notifCount}
          </AppText> */}
        </AppView>
        :
        null
      }
    </TouchableView>
  );
}

export default NotificationIcon;
