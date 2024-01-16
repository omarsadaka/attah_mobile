import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';

const customIcons = {};

export const registerCustomIconType = (id, customIcon) => {
  const IcoMoonIcon = createIconSetFromIcoMoon(customIcon);

  customIcons[id] = IcoMoonIcon;
};

export const getIconType = type => {
  switch (type) {
    case 'AntDesign':
      return AntDesign;
    case 'Entypo':
      return Entypo;
    case 'EvilIcons':
      return EvilIcons;
    case 'Feather':
      return Feather;
    case 'FontAwesome':
      return FontAwesome;
    case 'FontAwesome5':
      return FontAwesome5;
    case 'Foundation':
      return Foundation;
    case 'Ionicons':
      return Ionicons;
    case 'MaterialIcons':
      return MaterialIcons;
    case 'MaterialCommunityIcons':
      return MaterialCommunityIcons;
    case 'Octicons':
      return Octicons;
    case 'Zocial':
      return Zocial;
    case 'SimpleLineIcons':
      return SimpleLineIcons;
    case 'Fontisto':
      return Fontisto;
    default:
      if (Object.prototype.hasOwnProperty.call(customIcons, type)) {
        return customIcons[type];
      }
  }
  return null;
};

export const getIconSizeScaleFix = type => {
  switch (type) {
    case 'AntDesign':
      return 0.9;
    case 'Entypo':
      return 1;
    case 'EvilIcons':
      return 1.3;
    case 'Feather':
      return 0.95;
    case 'FontAwesome':
      return 1.1;
    case 'FontAwesome5':
      return 1.1;
    case 'Foundation':
      return 1.1;
    case 'Ionicons':
      return 1;
    case 'MaterialIcons':
      return 1.05;
    case 'MaterialCommunityIcons':
      return 1;
    case 'Octicons':
      return 0.9;
    case 'Zocial':
      return 0.8;
    case 'SimpleLineIcons':
      return 1.1;
    default:
      return 1;
  }
};
