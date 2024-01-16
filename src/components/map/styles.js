import { StyleSheet } from 'react-native';
import {
  moderateScale,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../common';
import { elevationStyles } from '../../common/Base';
import fonts from '../../common/defaults/fonts';

import store from '../../store/store';

const rtl = store.getState().lang.rtl;
export default StyleSheet.create({
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  myLocationButton: {
    position: 'absolute',
    bottom: responsiveHeight(15),
    zIndex: 10000,
  },
});

export const autocompleteStyles = {
  container: {
    flex: 1,
    alignSelf: 'stretch',
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderRadius: moderateScale(3),
    marginHorizontal: responsiveWidth(1),
    ...elevationStyles({ elevation: 3 }),
  },
  textInput: {
    fontFamily: fonts.normal,
    color: '#979797',
    fontSize: responsiveFontSize(5.5),
    height: responsiveHeight(6),
    textAlign: 'left',
    writingDirection: 'ltr',
    paddingLeft: responsiveWidth(3),
    paddingRight: responsiveWidth(3),
    // flex: 1,
    alignSelf: 'stretch',
  },
};

export const autocompleteStylesAr = {
  container: {
    flex: 1,
    alignSelf: 'stretch',
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderRadius: moderateScale(3),
    marginHorizontal: responsiveWidth(1),
    ...elevationStyles({ elevation: 3 }),
  },
  textInput: {
    fontFamily: fonts.normal,
    color: '#979797',
    fontSize: responsiveFontSize(5.5),
    height: responsiveHeight(6),
    textAlign: 'right',
    writingDirection: 'rtl',
    paddingLeft: responsiveWidth(3),
    paddingRight: responsiveWidth(3),
    // flex: 1,
    alignSelf: 'stretch',
  },

  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 50,
    bottom: 0,
  },
  row: {
    backgroundColor: '#fff',
    flexDirection: 'row-reverse',
  },
  description: {
    backgroundColor: '#fff',
    fontWeight: 'bold',
  },
  poweredContainer: {
    flexDirection: 'row-reverse',
  }
};