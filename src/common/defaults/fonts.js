import { Platform } from 'react-native';

export default {
  normal:
    Platform.OS === 'ios' ? 'Ara Hamah Homs' : 'ArbFONTS-AraHamahHoms-Regular',
  bold:
    Platform.OS === 'ios'
      ? 'Ara Hamah Homs'
      : 'ArbFONTS-AraHamahHoms-Regular-1',
  boldIsStyle: true,
};
