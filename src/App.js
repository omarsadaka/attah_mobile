import AsyncStorage from '@react-native-async-storage/async-storage';
import { Navigation } from 'react-native-navigation';
import { setDeviceToken } from './actions/auth';
import { AppNavigation } from './common';
import { AuthRepo } from './repo';
import registerScreens from './screens';
import store from './store/store';
import appLaunchConfig from './utils/AppLaunchConfig';
import "react-native-gesture-handler";
const authRepo = new AuthRepo();

export const initApp = () => {
  Navigation.events().registerAppLaunchedListener(async () => {
    AppNavigation.setNavigationDefaultOptions();

    registerScreens();
    await appLaunchConfig();
    const token = await AsyncStorage.getItem('@access_token');

    const showIntro = await AsyncStorage.getItem('@showIntro');
    if (token) {
      // const userData = await authRepo.checkPrincipalUser();
      await store.dispatch(setDeviceToken(token));
      if (store.getState().lang.lang == 'ar')
        AppNavigation.navigateToHomeAr(3, true);
      else AppNavigation.navigateToHome(0, false);
    } else {
      if (showIntro == 'no') AppNavigation.navigateToAuth();
      else AppNavigation.navigateToIntro();
    }
  });
};
