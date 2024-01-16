import {StyleSheet} from 'react-native';
import colors from '../../common/defaults/colors';
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingBottom: 100,
  },
  imgContainer: {
    width: 250,
    height: 250,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  textContainer: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 22,
    color: colors.darkText,
    fontWeight: '500',
    marginTop: 50,
    marginVertical: 20,
  },
  body: {
    fontSize: 15,
    color: colors.grayText,
  },
  arrow: {
    position: 'absolute',
    bottom: 58,
    left: 36,
  },
});
