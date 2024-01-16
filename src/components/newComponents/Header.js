import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import RighButton from './rightBackButton';
import colors from '../../common/defaults/colors';
import Navigation from '../../common/Navigation';
import {useSelector} from 'react-redux';

const Header = props => {
  const lang = useSelector(state => state.lang);

  return (
    <View
      style={{
        height: 50,
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginTop: 10,
      }}>
      <TouchableOpacity
        onPress={() => {
          if (props.customBack) props.onBackPressed();
          else Navigation.pop(props.componentId);
        }}>
        <Image
          style={[
            lang.lang == 'en' ? styles.en : null,
            {
              width: 30,
              height: 30,
              marginHorizontal: 17,
            },
          ]}
          source={require('../../assets/imgs/IconLeft.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  // container: {
  //   // justifyContent: 'space-between',
  //   height: 100,
  //   width: '100%',
  // },
  // button: {
  //   position: 'absolute',
  //   top: 40,
  //   right: 40,
  // },
  en: {
    transform: [{rotateY: '180deg'}],
  },
});
