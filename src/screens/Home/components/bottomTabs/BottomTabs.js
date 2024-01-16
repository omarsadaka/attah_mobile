import React from 'react';
import ButtonIcon from './buttonIcon';
import HomeIcon from '../../assets/Iconly-Light-Home.png';
import colors from '../../../../common/defaults/colors';

export default {
  id: 'BOTTOM_TABS_LAYOUT',
  children: [
    {
      stack: {
        id: 'HOME_TAB',
        children: [
          {
            component: {
              id: 'Home',
              name: 'Home',
            },
          },
        ],
        options: {
          bottomTab: {
            icon: HomeIcon,
            text: 'رئيسية',
            selectedIconColor: colors.yellow,
            selectedTextColor: colors.yellow,
          },
        },
      },
    },

    {
      stack: {
        id: 'PROFILE_TAB',
        children: [
          {
            component: {
              id: 'CardScreen',
              name: 'CardScreen',
            },
          },
        ],
        options: {
          bottomTab: {
            icon: require('../../assets/Iconly-Light-Bag.png'),
          },
        },
      },
    },
    {
      stack: {
        id: 'PROFILE_TAB',
        children: [
          {
            component: {
              id: 'Notifications',
              name: 'Notifications',
            },
          },
        ],
        options: {
          bottomTab: {
            icon: require('../../assets/Iconly-Light-Notification.png'),
          },
        },
      },
    },
    {
      stack: {
        id: 'TASKS_TAB',
        children: [
          {
            component: {
              id: 'TASKS_SCREEN',
              name: 'Tasks',
            },
          },
        ],
        options: {
          bottomTab: {
            icon: require('../../assets/checked-box.png'),
          },
        },
      },
    },
  ],
};
