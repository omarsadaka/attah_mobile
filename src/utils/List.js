import {refreshList} from '../actions/list';
import store from '../store/store';

export const getResponseTransformed = response => {
  const {meta, data} = response?.data?.data;
  return {
    data: data || [],
    pageCount: Math.ceil(meta?.total / meta?.per_page),
    page: meta?.current_page,
  };
};

export const getFollowingResponseTransoformed = response => {
  return {
    data: response.data,
    pageCount: 1,
    page: 1,
  };
};

export const refreshTravelsList = () =>
  store.dispatch(refreshList('travelsList'));

export const refreshHomeList = () => store.dispatch(refreshList('homeList'));

export const refreshNotificationsList = () =>
  store.dispatch(refreshList('notificationsList'));

export const refreshAddressList = () =>
  store.dispatch(refreshList('addressList'));

export const refreshFavList = () =>
  store.dispatch(refreshList('favouriteList'));
