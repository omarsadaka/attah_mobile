import i18next from 'i18next';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { AppIcon, AppText, AppView, TouchableView } from '../../../common';
import Dimensions from '../../../common/defaults/Dimensions';
import colors from '../../../common/defaults/colors';
import fonts from '../../../common/defaults/fonts';

const Row = ({item}) => {
  const lang = useSelector(state => state.lang);
  const [showAnswer, setShowAnswer] = useState(false);

  const renderItem = ({item}) => {
    return (
      <View
        style={[
          {
            alignItems: 'center',
            margin: 5,
          },
        ]}>
        <Image
          source={{uri: item.logo}}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.label}>{item.delivery_option_name}</Text>
      </View>
    );
  };

  return (
    <AppView
      stretch
      flex
      key={item.id}
      padding={5}
      borderBottomWidth={1}
      borderColor={colors.grayText}>
      <TouchableView
        flex
        stretch
        row
        onPress={() => setShowAnswer(pre => !pre)}>
        <Image
          source={require('../../../assets/imgs/market.png')}
          style={{
            width: 20,
            height: 20,
          }}
        />

        <AppText style={styles.title}>{item.label}</AppText>
        <AppIcon
          size={10}
          name={showAnswer ? 'chevron-up' : 'chevron-down'}
          type="Feather"
          color={colors.error}
        />
      </TouchableView>
      {showAnswer ? (
        <AppView flex stretch>
          {item.id == 0 ? (
            <Image
              source={{uri: item.answer}}
              style={{
                width: '90%',
                height: Dimensions.DEVICE_HEIGHT * 0.17,
              }}
              resizeMode="contain"
            />
          ) : item.id == 4 ? (
            <AppView flex stretch row spaceBetween marginTop={5}>
              <View style={{flex: 1, alignItems: 'center'}}>
                {item.answer.is_whatsapp_visible && item.answer.whatsapp ? (
                  <TouchableOpacity
                    onPress={() => {
                      if (item.answer.whatsapp) {
                        let url = `whatsapp://send?text=${''}&phone=+966${
                          item.answer.whatsapp
                        }`;
                        Linking.openURL(url)
                          .then(data => {
                            console.log('WhatsApp Opened');
                          })
                          .catch(() => {
                            alert(
                              'Make sure Whatsapp installed on your device',
                            );
                          });
                      }
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {/* <Text style={styles.title}>
                    {item?.answer?.whatsapp ? item.answer.whatsapp : '--'}
                  </Text> */}
                    <Image
                      source={require('../../../assets/imgs/whatsapp.png')}
                      style={{
                        width: 25,
                        height: 25,
                      }}
                    />
                  </TouchableOpacity>
                ) : null}
                {item.answer.is_email_visible && item.answer.email ? (
                  <TouchableOpacity
                    onPress={() => {
                      if (item.answer.email) {
                        const url = item.answer.email.startsWith('http')
                          ? item.answer.email
                          : 'https://' + item.answer.email;
                        //  Linking.openURL(item.answer.email)
                        // Linking.canOpenURL(url)
                        //   .then(supported => {
                        //     if (!supported) {
                        //       showError("Can't handle url: " + url);
                        //     } else {
                        //       return Linking.openURL(url);
                        //     }
                        //   })
                        //   .catch(err =>
                        //     console.error('An error occurred', err),
                        //   );
                        Linking.openURL(`mailto:${url}`);
                      }
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    {/* <Text style={styles.title}>
                    {item?.answer?.email ? item.answer.email : '--'}
                  </Text> */}
                    <Image
                      source={require('../../../assets/imgs/email.png')}
                      style={{
                        width: 25,
                        height: 25,
                      }}
                    />
                  </TouchableOpacity>
                ) : null}
                {item.answer.is_twitter_visible && item.answer.twitter ? (
                  <TouchableOpacity
                    onPress={() => {
                      if (item.answer.twitter) {
                        const url = item.answer.twitter.startsWith('http')
                          ? item.answer.twitter
                          : 'https://' + item.answer.twitter;

                        Linking.openURL(item.answer.twitter);
                        // Linking.canOpenURL(url)
                        //   .then(supported => {
                        //     if (!supported) {
                        //       showError("Can't handle url: " + url);
                        //     } else {
                        //       return Linking.openURL(url);
                        //     }
                        //   })
                        //   .catch(err =>
                        //     console.error('An error occurred', err),
                        //   );
                      }
                    }}
                    style={{
                      flexDirection: lang.lang == 'en' ? 'row-reverse' : 'row',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    {/* <Text style={styles.title}>
                    {item?.answer?.facebook ? item.answer.facebook : '--'}
                  </Text> */}
                    <Image
                      source={require('../../../assets/imgs/twitter.png')}
                      style={{
                        width: 25,
                        height: 25,
                      }}
                    />
                  </TouchableOpacity>
                ) : null}
                {item.answer.is_snapchat_visible && item.answer.snapchat ? (
                  <TouchableOpacity
                    onPress={() => {
                      if (item.answer.snapchat) {
                        const url = item.answer.snapchat.startsWith('http')
                          ? item.answer.snapchat
                          : 'https:' + item.answer.snapchat;

                        Linking.openURL(item.answer.snapchat);
                        // Linking.canOpenURL(url)
                        //   .then(supported => {
                        //     if (!supported) {
                        //       showError("Can't handle url: " + url);
                        //     } else {
                        //       return Linking.openURL(url);
                        //     }
                        //   })
                        //   .catch(err =>
                        //     console.error('An error occurred', err),
                        //   );
                      }
                    }}
                    style={{
                      flexDirection: lang.lang == 'en' ? 'row-reverse' : 'row',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    {/* <Text style={styles.title}>
                    {item?.answer?.facebook ? item.answer.facebook : '--'}
                  </Text> */}
                    <Image
                      source={require('../../../assets/imgs/snapchat.png')}
                      style={{
                        width: 25,
                        height: 25,
                      }}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                {item.answer.is_telegram_visible && item.answer.telegram ? (
                  <TouchableOpacity
                    onPress={() => {
                      if (item.answer.telegram) {
                        const url = item.answer.telegram.startsWith('http')
                          ? item.answer.telegram
                          : 'https://' + item.answer.telegram;

                        Linking.openURL(item.answer.telegram);
                        // Linking.canOpenURL(url)
                        //   .then(supported => {
                        //     if (!supported) {
                        //       showError("Can't handle url: " + url);
                        //     } else {
                        //       return Linking.openURL(url);
                        //     }
                        //   })
                        //   .catch(err =>
                        //     console.error('An error occurred', err),
                        //   );
                      }
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {/* <Text style={styles.title}>
                    {item?.answer?.telegram ? item.answer.telegram : '--'}
                  </Text> */}
                    <Image
                      source={require('../../../assets/imgs/telegram.png')}
                      style={{
                        width: 25,
                        height: 25,
                      }}
                    />
                  </TouchableOpacity>
                ) : null}
                {item.answer.is_facebook_visible && item.answer.facebook ? (
                  <TouchableOpacity
                    onPress={() => {
                      if (item.answer.facebook) {
                        const url = item.answer.facebook.startsWith('http')
                          ? item.answer.facebook
                          : 'https:' + item.answer.facebook;

                        Linking.openURL(item.answer.facebook);
                        // Linking.canOpenURL(url)
                        //   .then(supported => {
                        //     if (!supported) {
                        //       showError("Can't handle url: " + url);
                        //     } else {
                        //       return Linking.openURL(url);
                        //     }
                        //   })
                        //   .catch(err =>
                        //     console.error('An error occurred', err),
                        //   );
                      }
                    }}
                    style={{
                      flexDirection: lang.lang == 'en' ? 'row-reverse' : 'row',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    {/* <Text style={styles.title}>
                    {item?.answer?.facebook ? item.answer.facebook : '--'}
                  </Text> */}
                    <Image
                      source={require('../../../assets/imgs/facebook.png')}
                      style={{
                        width: 25,
                        height: 25,
                      }}
                    />
                  </TouchableOpacity>
                ) : null}
                {item.answer.is_instagram_visible && item.answer.instagram ? (
                  <TouchableOpacity
                    onPress={() => {
                      if (item.answer.instagram) {
                        Linking.openURL(item.answer.instagram);
                        const url = item.answer.instagram.startsWith('http')
                          ? item.answer.instagram
                          : 'https:' + item.answer.instagram;
                        // Linking.canOpenURL(url)
                        //   .then(supported => {
                        //     if (!supported) {
                        //       showError("Can't handle url: " + url);
                        //     } else {
                        //       return Linking.openURL(url);
                        //     }
                        //   })
                        //   .catch(err =>
                        //     console.error('An error occurred', err),
                        //   );
                      }
                    }}
                    style={{
                      flexDirection: lang.lang == 'en' ? 'row-reverse' : 'row',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    {/* <Text style={styles.title}>
                    {item?.answer?.facebook ? item.answer.facebook : '--'}
                  </Text> */}
                    <Image
                      source={require('../../../assets/imgs/instagram.png')}
                      style={{
                        width: 25,
                        height: 25,
                      }}
                    />
                  </TouchableOpacity>
                ) : null}
                {item.answer.is_tiktok_visible && item.answer.tiktok ? (
                  <TouchableOpacity
                    onPress={() => {
                      if (item.answer.tiktok) {
                        const url = item.answer.tiktok.startsWith('http')
                          ? item.answer.tiktok
                          : 'https:' + item.answer.tiktok;

                        Linking.openURL(item.answer.tiktok);
                        // Linking.canOpenURL(url)
                        //   .then(supported => {
                        //     if (!supported) {
                        //       showError("Can't handle url: " + url);
                        //     } else {
                        //       return Linking.openURL(url);
                        //     }
                        //   })
                        //   .catch(err =>
                        //     console.error('An error occurred', err),
                        //   );
                      }
                    }}
                    style={{
                      flexDirection: lang.lang == 'en' ? 'row-reverse' : 'row',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    {/* <Text style={styles.title}>
                    {item?.answer?.facebook ? item.answer.facebook : '--'}
                  </Text> */}
                    <Image
                      source={require('../../../assets/imgs/tik-tok.png')}
                      style={{
                        width: 25,
                        height: 25,
                      }}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            </AppView>
          ) : item.id == 3 ? (
            <View
              style={[
                // lang.lang == 'ar' ? styles.ar : null,
                styles.sectionsContainer,
              ]}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={item.answer}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                inverted={lang.lang == 'ar' ? true : false}
              />
              {/* {item.answer.length > 0 ? (
                <ScrollView horizontal>
                  {item?.answer.map(item => {
                    return (
                      <View
                        style={[
                          lang.lang == 'ar' ? styles.ar : null,
                          {
                            alignItems: 'center',
                            margin: 5,
                          },
                        ]}>
                        <Image
                          source={{uri: item.logo}}
                          style={styles.logo}
                          resizeMode="contain"
                        />
                        <Text style={styles.label}>
                          {item.deliveryCompanyName}
                        </Text>
                      </View>
                    );
                  })}
                </ScrollView>
              ) : (
                <Text style={styles.sub_title}>
                  {i18next.t('No found data')}
                </Text>
              )} */}
            </View>
          ) : item.id == '6' ? (
            <>
             {item.type!='individual'?
             <>
                <Text style={styles.sub_title}>
                  {i18next.t('about-title88')} {item.answer?item.answer:'--'}
                </Text>
                <Text style={styles.sub_title}>
                  {i18next.t('about-title10')} {item.answer3?item.answer3:'--'}
                </Text>
             </>
             :
              <Text style={styles.sub_title}>
                {i18next.t('about-title10')} {item.answer3?item.answer3:'--'}
              </Text>
             }
              
            </>
          ) : (
            <Text style={styles.sub_title}>{item.answer}</Text>
          )}
        </AppView>
      ) : null}
    </AppView>
  );
};
const styles = StyleSheet.create({
  row: {
    width: '98%',
    alignItems: 'center',
    marginVertical: 10,
  },

  view: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    width: '98%',
    height: 0.6,
    backgroundColor: colors.grayText,
    marginTop: 15,
  },
  title: {
    flex: 1,
    fontSize: 17,
    color: colors.black,
    fontFamily: fonts.normal,
    marginHorizontal: 5,
  },
  sub_title: {
    fontSize: 16,
    color: colors.black,
    marginTop: 5,
    fontFamily: fonts.normal,
  },
  sectionsContainer: {
    width: Dimensions.DEVICE_WIDTH * 0.9,
    flexDirection: 'row',
    marginTop: 4,
  },
  logo: {
    width: 70,
    height: 50,
    // transform: [{rotateY: '180deg'}],
  },
  label: {
    fontSize: 17,
    color: colors.black,
    fontFamily: fonts.normal,
    textAlign: 'center',
    // transform: [{rotateY: '180deg'}],
    marginTop: 2,
  },
  ar: {
    transform: [{rotateY: '180deg'}],
  },
});
export default Row;
