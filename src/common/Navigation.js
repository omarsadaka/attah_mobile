import React, { Component } from 'react';
import { BackHandler, Dimensions, Platform, SafeAreaView } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Navigation as NativeNavigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { AppView } from '.';
import store from '../store/store';
import colors from './defaults/colors';
import fonts from './defaults/fonts';
import { showInfo } from './utils/localNotifications';
import { responsiveFontSize } from './utils/responsiveDimensions';

const {width} = Dimensions.get('window');

class Navigation {
  static MAIN_STACK = 'MAIN_STACK';
  static ORDER_STACK = 'ORDER_STACK';
  static menuComponentId = 0;

  static INITED = false;

  static lastCommand = '';

  static currentTabID = '';

  static modalIsOn = false;

  static currentScreen = '';

  static prevScreen = '';

  static backHandler;

  static didAppearListener;

  static commandCompletedListener;

  static didDisappearListener;
  static rtl = true;
  static count = 0;
  static sideMenuIsOpen = false;

  constructor() {
    throw new Error('Cannot construct singleton');
  }

  static setNavigationDefaultOptions = () => {
    NativeNavigation.setDefaultOptions({
      statusBar: {
        visible: true,
        style: Platform.Version < 23 ? 'light' : 'dark',
        backgroundColor: colors.statusBar,
      },
      topBar: {
        drawBehind: true,
        visible: false,
        animate: false,
      },
      layout: {
        backgroundColor: 'transparent',
        orientation: ['portrait'],
      },
      bottomTab: {
        selectedIconColor: colors.primaryDark,
        selectedTextColor: colors.primaryDark,
        textColor: 'gray',
        iconColor: 'gray',
        fontFamily: fonts.normal,
        fontSize: responsiveFontSize(6.5),
        selectedFontSize: responsiveFontSize(7),
      },
      bottomTabs: {
        titleDisplayMode: 'alwaysShow', //alwaysHide ،showWhenActive, alwaysShow
        visible: true,
        backgroundColor: colors.white,
        elevation: 5,
      },
      // animations: {
      //   push: {
      //     waitForRender: true,
      //   },
      //   showModal: {
      //     waitForRender: true,
      //   },
      // },
    });
  };

  // register screen with  gesturHandler
  // static registerScreen(name, component) {
  //   NativeNavigation.registerComponentWithRedux(
  //     name,
  //     () => gestureHandlerRootHOC(component),
  //     Provider,
  //     store,
  //   );
  // }

  // register screen with  gesturHandler
  static createScene = InternalComponent => () =>
    gestureHandlerRootHOC(
      class SceneWrapper extends Component {
        render() {
          return (
            <Provider store={store}>
              <SafeAreaView
                style={{
                  alignSelf: 'stretch',
                  flex: 1,
                  backgroundColor: 'white',
                }}>
                <AppView flex stretch backgroundColor="white">
                  <InternalComponent {...this.props} />
                </AppView>
              </SafeAreaView>
            </Provider>
          );
        }
      },
    );
  static registerScreen(name, Screen) {
    NativeNavigation.registerComponent(name, this.createScene(Screen));
  }
  static registerBackHandlerListener = () => {
    Navigation.backHandler = BackHandler;
    Navigation.backHandler.addEventListener('hardwareBackPress', async () => {
      try {
        await Navigation.pop();
      } catch (error) {
        if (this.sideMenuIsOpen) {
          this.closeMenu();
          return false;
        }
        if (this.count === 0) {
          this.count += 1;
          showInfo(
            this.rtl
              ? 'انقر نقرا سريعا مرة أخري للخروج'
              : 'Press back again to exit the app',
          );
        } else if (this.count === 1) {
          BackHandler.exitApp();
        }
        setTimeout(() => {
          this.count = 0;
        }, 2000);
        return false;
      }

      return true;
    });
  };

  static clearBackHandlerListener = () => {
    if (Navigation.backHandler) {
      this.backHandler.removeEventListener();
    }
  };

  static registerDidAppearListener = () => {
    Navigation.didAppearListener =
      NativeNavigation.events().registerComponentDidAppearListener(
        ({componentId, componentName}) => {
          if (componentName === 'SideMenu') {
            this.sideMenuIsOpen = true;
          }
          Navigation.currentScreen = componentName;
          this.currentComponentId = componentId;
        },
      );
  };

  static clearDidAppearListener = () => {
    if (Navigation.didAppearListener) {
      Navigation.didAppearListener.remove();
    }
  };

  static registerDidDisappearListener = () => {
    Navigation.didDisappearListener =
      NativeNavigation.events().registerComponentDidDisappearListener(
        ({componentName}) => {
          if (componentName === 'SideMenu') {
            this.sideMenuIsOpen = false;
          }
          Navigation.prevScreen = componentName;
        },
      );
  };

  static clearDidDisappearListener = () => {
    if (Navigation.didDisappearListener) {
      Navigation.didDisappearListener.remove();
    }
  };

  static registerCommandCompletedListener = () => {
    Navigation.commandCompletedListener =
      NativeNavigation.events().registerCommandCompletedListener(
        ({commandId}) => {
          Navigation.lastCommand = commandId.replace(/[0-9]/g, '');

          if (Navigation.lastCommand === 'showModal') {
            Navigation.modalIsOn = true;
          } else if (
            Navigation.lastCommand === 'dismissModal' ||
            Navigation.lastCommand === 'dismissAllModals'
          ) {
            Navigation.modalIsOn = false;
          }
        },
      );
  };

  static clearCommandCompletedListener = () => {
    if (Navigation.commandCompletedListener) {
      Navigation.commandCompletedListener.remove();
    }
  };

  static getScreenLayout = layout => {
    // cosnt screenName = '';

    if (typeof layout === 'string') {
      return {
        component: {
          name: layout,
          options: {
            statusBar: {backgroundColor: colors.statusBar, style: 'dark'},
          },
        },
      };
    }
    if (typeof layout === 'object') {
      return {
        component: {
          name: layout.name,
          passProps: layout.passProps,
          options: {
            statusBar: {backgroundColor: colors.statusBar, style: 'dark'},
          },
        },
      };
    }
  };

  static getBottomTabsLayout = layout => {
    if (typeof layout !== 'object') {
      return null;
    }
    if (!layout.bottomTabs) {
      return null;
    }

    const children = layout.bottomTabs.map((tab, index) => {
      // if (index === 0) {
      return {
        stack: {
          id: tab.screen,
          children: [
            {
              component: {
                id: tab.screen,
                name: tab.screen,
                options: {
                  bottomTab:
                    // tab.screen === "Notifications" ?
                    //   {
                    //     icon: tab.icon,
                    //     text: tab.text,
                    //     badge: store.getState().auth.userData && store.getState().auth.notifCount,
                    //   }
                    //   :
                    {
                      icon: tab.icon,
                      text: tab.text,
                    },
                },
              },
            },
          ],
        },
      };
      // } else {
      //   return {
      //     component: {
      //       id: tab.screen,
      //       name: tab.screen,
      //       passProps: tab.passProps,
      //       options: {
      //         bottomTab: {
      //           // text: tab.label,
      //           icon: tab.icon,
      //           iconInsets: tab.icon,
      //           dotIndicator: {color: 'red', visible: true},
      //           IconInsets: {bottom: 0},
      //           badge: 5,
      //           selectedIcon: 50,
      //         },
      //         bottomTabs: {
      //           visible: true,
      //         },
      //       },
      //     },
      //   };
      // }
    });
    return {
      bottomTabs: {
        id: 'bottomTabs',
        children: children,
      },
    };
  };

  static getSideMenuLayout = layout => {
    if (typeof layout !== 'object') {
      return null;
    }
    if (!layout.sideMenu) {
      return null;
    }

    const menu = {};

    if (typeof layout.rtl === 'boolean') {
      if (layout.rtl) {
        menu.right = {
          component: {
            name: layout.sideMenu,
            options: {
              statusBar: {backgroundColor: colors.statusBar, style: 'dark'},
            },
          },
        };
        Navigation.menuDirection = 'right';
      } else {
        menu.left = {
          component: {
            name: layout.sideMenu,
            options: {
              statusBar: {backgroundColor: colors.statusBar, style: 'dark'},
            },
          },
        };
        Navigation.menuDirection = 'left';
      }
    } else if (Navigation.menuDirection) {
      if (Navigation.menuDirection === 'right') {
        menu.right = {
          component: {
            name: layout.sideMenu,
            options: {
              statusBar: {backgroundColor: colors.statusBar, style: 'dark'},
            },
          },
        };
      } else if (Navigation.menuDirection === 'left') {
        menu.left = {
          component: {
            name: layout.sideMenu,
            options: {
              statusBar: {backgroundColor: colors.statusBar, style: 'dark'},
            },
          },
        };
      }
    }

    Navigation.menuComponentId += 1;

    const MainLayout = layout.bottomTabs
      ? Navigation.getBottomTabsLayout(layout)
      : Navigation.getScreenLayout(layout);

    return {
      sideMenu: {
        id: `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        center: {
          stack: {
            children: [{...MainLayout}],
          },
        },
        ...menu,
        options: {
          statusBar: this.defaultStatusBar,
          sideMenu: {
            left: {
              width: width * 0.8,
              // height: height * 0.9,
            },
            right: {
              width: width * 0.8,
              // height: height * 0.9,
            },
          },
        },
      },
    };
  };

  static init = (initialStack, layout, bt) => {
    if (this.INITED) {
      this.clearBackHandlerListener();
      this.clearCommandCompletedListener();
      this.clearDidAppearListener();
      this.clearDidDisappearListener();
    }
    Navigation.modalIsOn = false;
    this.initialStack = initialStack;
    this.currentStack = initialStack;
    this.mainLayout = null;
    this.mainStack = initialStack;

    // /listener
    this.registerBackHandlerListener();
    this.registerCommandCompletedListener();
    this.registerDidAppearListener();
    this.registerDidDisappearListener();

    this.mainLayoutRaw = layout;
    this.mainLayout = Navigation.getLayout(layout);
    this.rtl = layout.rtl ? layout.rtl : true;
    Navigation.currentScreen = '';
    if (bt) {
      NativeNavigation.setRoot({
        root: this.mainLayout,
      });
    } else {
      NativeNavigation.setRoot({
        root: {
          stack: {
            id: initialStack,
            children: [this.mainLayout],
          },
        },
      });
    }

    this.INITED = true;
  };

  // if setMainLayout = true, layout must be defined
  static setStackRoot = (layout, stack, setMainLayout) => {
    try {
      if (setMainLayout && !layout) {
        throw new Error('Navigation.setStackRoott() ERROR');
      }
    } catch (error) {
      return;
    }

    // const newLayout = layout
    //   ? Navigation.getLayout(layout)
    //   : Navigation.getLayout(this.mainLayoutRaw);

    const newLayout = layout
      ? Navigation.getLayout(layout)
      : Navigation.getLayout(this.mainLayoutRaw);
    if (setMainLayout) {
      this.mainLayoutRaw = layout;
      this.mainLayout = newLayout;
    }

    NativeNavigation.setStackRoot(stack || this.mainStack, newLayout);
  };

  static getLayout = layout =>
    Navigation.getSideMenuLayout(layout) ||
    Navigation.getBottomTabsLayout(layout) ||
    Navigation.getScreenLayout(layout);

  static setTab = componentId => {
    Navigation.currentTabID = componentId;
  };

  static getTab = () => {
    return Navigation.currentTabID;
  };

  static push = async (layout, bt) => {
    if (layout.bottomTabs) {
      await NativeNavigation.push('MAIN_STACK', Navigation.getLayout(layout));
      return;
    }
    const screenName = typeof layout === 'string' ? layout : layout.name;
    const passProps = typeof layout === 'string' ? {} : layout.passProps;
    const stackName = typeof layout === 'object' ? layout.stackName : null;

    if (screenName === Navigation.currentScreen) {
      return;
    }
    Navigation.currentScreen = screenName;

    if (stackName) {
      await NativeNavigation.showModal({
        stack: {
          id: stackName,
          children: [
            {
              component: {
                name: screenName,
                passProps,
                options: {
                  statusBar: {
                    backgroundColor: colors.statusBar,
                    style: 'dark',
                  },
                  bottomTabs: {
                    visible: bt ? bt : false,
                  },
                },
              },
            },
          ],
        },
      });
      this.currentStack = stackName;
      Navigation.modalIsOn = true;
    } else {
      const componentId =
        Platform.OS === 'ios'
          ? this.currentComponentId || this.currentStack
          : this.currentStack;

      await NativeNavigation.push(componentId, {
        component: {
          id: screenName,
          name: screenName,
          passProps,
          options: {
            statusBar: layout.statusBarColor
              ? layout.statusBarColor
              : {backgroundColor: colors.statusBar, style: 'dark'},
            bottomTabs: {
              visible: bt ? bt : false,
            },
            sideMenu: !store.getState().lang.rtl
              ? {
                  left: {
                    enabled: false,
                    visible: false,
                  },
                }
              : {
                  right: {
                    enabled: false,
                    visible: false,
                  },
                },
          },
        },
      });
    }
  };

  static pop = async () => {
    const componentId = this.currentComponentId || this.currentStack;
    // Platform.OS === 'ios'
    //   ? this.currentComponentId || this.currentStack
    //   : this.currentStack;
    if (
      componentId === 'Bag' ||
      componentId === 'Notifications' ||
      componentId === 'Orders'
    ) {
      NativeNavigation.mergeOptions('bottomTabs', {
        bottomTabs: {
          currentTabIndex: store.getState().lang.rtl ? 3 : 0,
          visible: true,
        },
      });
      return;
    }
    if (Navigation.modalIsOn && this.currentStack === this.initialStack) {
      NativeNavigation.dismissAllModals();
      return;
    }

    try {
      await NativeNavigation.pop(componentId);
    } catch (error) {
      if (Navigation.modalIsOn) {
        this.currentStack = this.initialStack;
        NativeNavigation.dismissAllModals();
      } else {
        throw error;
      }
    }
  };

  static showModal = layout => {
    const resolvedLayout = Navigation.getLayout(layout);

    NativeNavigation.showModal({
      stack: {
        children: [resolvedLayout],
      },
    });
  };

  static dismissBranchStack = async () => {
    await NativeNavigation.dismissAllModals();
  };

  static dismissAllModal = async () => {
    await NativeNavigation.dismissAllModals();
  };

  static openMenu = () => {
    if (Navigation.menuDirection === 'right') {
      NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            right: {
              visible: true,
            },
          },
        },
      );
    } else if (Navigation.menuDirection === 'left') {
      NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            left: {
              visible: true,
            },
          },
        },
      );
    }
  };

  static closeMenu = () => {
    if (Navigation.menuDirection === 'right') {
      NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            right: {
              visible: false,
            },
          },
        },
      );
    } else if (Navigation.menuDirection === 'left') {
      NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            left: {
              visible: false,
            },
          },
        },
      );
    }
  };

  static enableMenu = async () => {
    if (Navigation.menuDirection === 'left') {
      await NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            left: {
              enabled: true,
            },
          },
        },
      );
    } else if (Navigation.menuDirection === 'right') {
      await NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            right: {
              enabled: true,
            },
          },
        },
      );
    }
  };

  static disableMenu = async () => {
    if (Navigation.menuDirection === 'right') {
      await NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            right: {
              visible: false,
              enabled: false,
            },
          },
        },
      );
    } else if (Navigation.menuDirection === 'left') {
      await NativeNavigation.mergeOptions(
        `MAIN_SIDE_MENU${Navigation.menuComponentId}`,
        {
          sideMenu: {
            left: {
              visible: false,
              enabled: false,
            },
          },
        },
      );
    }
  };

  static navigateToHome = (index = 0) => {
    Navigation.init(
      'Home',
      {
        rtl: false,
        sideMenu: 'Menu',
        bottomTabs: [
          {
            screen: 'Home',
            icon: require('../assets/imgs/tabs/home.png'),
            text: 'Home',
          },
          {
            screen: 'Bag',
            icon: require('../assets/imgs/tabs/bag.png'),
            text: 'Cart',
          },
          {
            screen: 'Notifications',
            icon: require('../assets/imgs/tabs/noti.png'),
            text: 'Notificatios',
          },
          {
            screen: 'Orders',
            icon: require('../assets/imgs/tabs/orders.png'),
            text: 'Orders',
          },
        ],
      },
      false,
    );
    NativeNavigation.mergeOptions('bottomTabs', {
      bottomTabs: {
        currentTabIndex: index,
      },
    });
    Navigation.currentTabID = index;
  };

  static navigateToHomeAr = (index = 3) => {
    Navigation.init(
      'Home',
      {
        rtl: true,
        sideMenu: 'Menu',
        bottomTabs: [
          {
            screen: 'Orders',
            icon: require('../assets/imgs/tabs/orders.png'),
            text: 'طلباتي',
          },
          {
            screen: 'Notifications',
            icon: require('../assets/imgs/tabs/noti.png'),
            text: 'الاشعارات',
          },
          {
            screen: 'Bag',
            icon: require('../assets/imgs/tabs/bag.png'),
            text: 'سلة الشراء',
          },

          {
            screen: 'Home',
            icon: require('../assets/imgs/tabs/home.png'),
            text: 'رئيسية',
          },
        ],
      },
      false,
    );
    NativeNavigation.mergeOptions('bottomTabs', {
      bottomTabs: {
        currentTabIndex: index,
      },
    });
    Navigation.currentTabID = index;
  };

  static navigateToAuth = () => {
    Navigation.init(Navigation.MAIN_STACK, 'Login');
  };
  static navigateToIntro = () => {
    Navigation.init(Navigation.MAIN_STACK, 'Welcome');
  };

  static navigateToRoot = () => {
    const componentId =
      Platform.OS === 'ios'
        ? this.currentComponentId || this.currentStack
        : this.currentStack;
    NativeNavigation.popToRoot(componentId);
    NativeNavigation.mergeOptions(componentId, {});
  };

  static navigateToScreen = async screenName => {
    try {
      await NativeNavigation.popTo(screenName);
    } catch (error) {
      console.log(
        '🚀 ~ file: Navigation.js ~ line 826 ~ Navigation ~ navigateToScreen= ~ error',
        error,
      );
    }
  };
}

export default Navigation;
