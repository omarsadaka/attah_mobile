import React from 'react';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {
  withNavigationProvider,
  NavigationProvider,
} from 'react-native-navigation-hooks';
import Login from '../screens/login/Login';
import Welcome from '../screens/welcome/Welcome';

import TopBarBg from '../components/newComponents/TopBarBg';
import VerifyCode from '../screens/verifyCode/VerifyCode';
import RighButton from '../components/newComponents/rightBackButton';
import TestScreen from '../screens/TestScreen/TestScreen';
import UpdateProfile from '../screens/updateProfile/UpdateProfile';
import Header from '../components/newComponents/HeaderRightBackground';
import Home from '../screens/Home/Home';
import HeaderBgMenuItem from '../components/newComponents/HeaderBgMenuItem';
import CardScreen from '../screens/User/CardScreen';
import Tasks from '../screens/User/Orders';
import Notifications from '../screens/User/Notifications';
import ButtonIcon from '../screens/Home/components/bottomTabs/buttonIcon';
import SideMenu from '../components/newComponents/SideMenu';
import Profile from '../screens/User/Profile/Profile';

const WrapScreen = (ReduxScreen, store) => props =>
  (
    <Provider store={store}>
      <ReduxScreen {...props} />
    </Provider>
  );

export const registerScreens = store => {
  //=========================AppIntro======================//
  Navigation.registerComponent(
    'Welcome',
    () => withNavigationProvider(WrapScreen(Welcome, store)),
    () => Welcome,
  );
  //=========================Auth===========================//
  Navigation.registerComponent(
    'Login',
    () => withNavigationProvider(WrapScreen(Login, store)),
    () => Login,
  );
  Navigation.registerComponent(
    'VerifyCode',
    () => withNavigationProvider(WrapScreen(VerifyCode, store)),
    () => VerifyCode,
  );
  // SideMenu
  //=========================Main========================//
  Navigation.registerComponent('TopBarBg', () => TopBarBg);
  Navigation.registerComponent('SideMenu', () => SideMenu);
  Navigation.registerComponent('ButtonIcon', () => ButtonIcon);
  Navigation.registerComponent('HeaderBgMenuItem', () => HeaderBgMenuItem);
  Navigation.registerComponent('RightButton', () => RighButton);
  Navigation.registerComponent('Header', () => Header);
  Navigation.registerComponent(
    'TestScreen',
    () => withNavigationProvider(WrapScreen(TestScreen, store)),
    () => TestScreen,
  );
  Navigation.registerComponent(
    'UpdateProfile',
    () => withNavigationProvider(WrapScreen(UpdateProfile, store)),
    () => UpdateProfile,
  );
  Navigation.registerComponent(
    'Home',
    () => withNavigationProvider(WrapScreen(Home, store)),
    () => Home,
  );
  Navigation.registerComponent(
    'Profile',
    () => withNavigationProvider(WrapScreen(Profile, store)),
    () => Profile,
  );

  // ======================user screens=====================//
  Navigation.registerComponent('Notifications', () => Notifications);
  Navigation.registerComponent('Tasks', () => Tasks);
  Navigation.registerComponent('CardScreen', () => CardScreen);
};
