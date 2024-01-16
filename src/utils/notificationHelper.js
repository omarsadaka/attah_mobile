import {Navigation} from 'react-native-navigation';
import {refreshList} from '../actions/list';
import {SELECT_TAB} from '../actions/types';
import {AppNavigation} from '../common';
import store from '../store/store';
import {refreshTravelsList} from './List';

export const navigateToNotificationDetails = (type, id, post_id) => {
  const pushNotifications = () => {
    const currentTabIndex = 1;
    store.dispatch({type: SELECT_TAB, payload: 1});
    Navigation.mergeOptions('bottomTabs', {
      bottomTabs: {
        currentTabIndex,
      },
    });
  };
  const pushTripChat = () => {
    AppNavigation.push({
      name: 'TripChat',
      passProps: {
        tripId: id,
      },
    });
  };

  const pushPosts = () => {
    AppNavigation.push({
      name: 'posts',
      passProps: {
        event_id: id,
        post_id: post_id,
      },
    });
  };
  const pushEvent = () => {
    AppNavigation.push({
      name: 'eventDetails',
      passProps: {
        event_id: id,
      },
    });
  };
  const pushTrip = () => {
    AppNavigation.push({
      name: 'tripDetails',
      passProps: {
        trip_id: id,
      },
    });
  };
  const pushUserProfile = () => {
    AppNavigation.push({
      name: 'userProfile',
      passProps: {
        user: {id},
      },
    });
  };
  if (type === 'JoinTrip') {
    refreshTravelsList();
    const currentTabIndex = 3;
    store.dispatch({type: SELECT_TAB, payload: 3});
    Navigation.mergeOptions('bottomTabs', {
      bottomTabs: {
        currentTabIndex,
      },
    });
  } else if (type.includes('CancelTrip')) {
    pushNotifications();
  } else if (type === 'CancelJoinTrip') {
    pushNotifications();
  } else if (type === 'RejectJoinTrip') {
    pushNotifications();
  } else if (type.includes('Trip')) {
    pushTrip();
  } else if (type.includes('Event')) {
    pushEvent();
  } else if (type === 'NewPost') {
    pushPosts();
  } else if (type === 'RateDriver') {
    pushTrip();
  } else if (type === 'NewMessage') {
    pushTripChat();
  } else if (type.includes('User')) {
    pushUserProfile();
  }
};

export const refreshDetails = type => {
  if (type.includes('Trip')) {
    store.dispatch(refreshList('tripDetails'));
  } else if (type.includes('Event')) {
    store.dispatch(refreshList('eventDetails'));
  }
};
