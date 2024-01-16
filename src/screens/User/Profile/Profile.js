import i18next from 'i18next';
import React from 'react';
import { StyleSheet } from 'react-native';
import { AppText } from '../../../common';

import { Navigation } from 'react-native-navigation';
import profileIcon from '../../../assets/imgs/Profile.png';
import colors from '../../../common/defaults/colors';
import Header from '../../../components/newComponents/Header';
// icons
import fonts from '../../../common/defaults/fonts';
import { ScrollableContainer } from '../../../components';
import store from '../../../store/store';
import AvatarCard from './components/AvatarCard';
import IconCard from './components/IconCard';

const Profile = props => {
  const userData = store.getState().auth.userData;
  console.log('userData', userData);

  return (
    <>
      <Header backgroundColor={colors.gray} componentId={props.componentId} />

      <ScrollableContainer
        header
        // rightItems={<RighButton id={props.componentId} />}
        hideBack
        // flex
        stretch
        center>
        <AppText
          style={styles.rightText}
          marginVertical={3}
          marginHorizontal={8}
          bold
          size={16}>
          {i18next.t('my-account')}
        </AppText>
        <AvatarCard
          name={userData?.first_name ? userData.first_name : ''}
          email={userData?.email ? userData.email : ''}
          image={userData?.avatar ? userData.avatar : ''}
        />
        <IconCard
          onPress={() =>
            Navigation.push(props.componentId, {
              component: {
                name: 'UpdateProfile',
              },
            })
          }
          source={profileIcon}
          title={i18next.t('update-profile')}
        />
        {/* <IconCard
          onPress={() =>
            Navigation.push(props.componentId, {
              component: {
                name: 'ShippingAddress',
              },
            })
          }
          source={pinIcon}
          title={i18next.t('shipping-address')}
        />
        <IconCard
          onPress={() =>
            Navigation.push(props.componentId, {
              component: {
                name: 'Favourites',
              },
            })
          }
          source={whishlistIcon}
          title={i18next.t('fav-list')}
        /> */}
        {/* <IconCard
          onPress={() =>
            Navigation.push(props.componentId, {
              component: {
                name: 'Payment',
              },
            })
          }
          source={payment}
          title={i18next.t('payment-options')}
        /> */}
      </ScrollableContainer>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '95%',
    alignItems: 'center',
    backgroundColor: colors.gray,
  },
  // avatar container

  rightText: {
    textAlign: 'right',
    fontFamily: fonts.normal,
  },
});
