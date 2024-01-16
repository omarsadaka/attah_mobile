import { useNetInfo } from "@react-native-community/netinfo";
import React, { useState } from 'react';
import I18n from 'i18next';
import { useSelector } from 'react-redux';
import {
    AppButton,
    AppIcon, AppInput, AppScrollView, AppView, responsiveHeight
} from '../../common';
import colors from '../../common/defaults/colors';
import { MOBILE_LENGTH } from '../../common/utils/Constants';
import { PickersRepo } from '../../repo';
import NoNetworkConnection from '../NoNetworkConnection';
import LocationPickers from './LocationPickers';

const pickersRepo = new PickersRepo();

const ReceiverDataForm = ({ injectFormProps, isSubmitting, setFieldValue, handleSubmit, setError }) => {
    const senderData = useSelector(state => state.shipment.senderData);
    const [countryId, setCountryId] = useState();

    const netInfo = useNetInfo();
    if (!netInfo?.isConnected && netInfo.type !== 'unknown')
        return (<AppView flex stretch marginTop={responsiveHeight(1)} >
            <NoNetworkConnection />
        </AppView>
        )
    return (
        <AppScrollView flex stretch centerX paddingTop={responsiveHeight(1)} paddingHorizontal={5}>
            <AppInput
                marginVertical={3}
                {...injectFormProps('receiver_name')}
                placeholder={I18n.t('name')}
                leftItems={
                    <AppView width={10} stretch center backgroundColor={colors.secondary1}
                        margin={3} borderRadius={5}
                    >
                        <AppIcon stretch borderRadius={5} size={8} name="person-outline" />
                    </AppView>
                }
            />

            <AppInput
                phone
                marginVertical={3}
                {...injectFormProps('receiver_phone')}
                maxLength={MOBILE_LENGTH}
                onBlur={(name, text) => {
                    if (text === senderData.sender_phone) {
                        setError('receiver_phone', I18n.t('myPhoneCannotSend'))
                    }
                }}
                placeholder={I18n.t('phone')}
                leftItems={
                    <AppView width={10} stretch center backgroundColor={colors.primary1}
                        margin={3} borderRadius={5}
                    >
                        <AppIcon borderRadius={5} size={8} padding={3} name="phone" type="Feather" flip />
                    </AppView>
                }
            />

            <LocationPickers
                {...{ setCountryId }}
                {...{ pickersRepo }}
                {...{ setFieldValue }}
                {...{ injectFormProps }}
                {...{setError}}
            />

            <AppInput
                marginVertical={3}
                {...injectFormProps('receiver_address')}
                placeholder={I18n.t('address')}
                leftItems={
                    <AppView width={10} stretch center backgroundColor={colors.secondary}
                        margin={3} borderRadius={5}
                    >
                        <AppIcon borderRadius={5} size={7} padding={3} name="location-pin" type="SimpleLineIcons" reverse />
                    </AppView>
                }
            />

            <AppInput
                marginVertical={3}
                {...injectFormProps('receiver_address_url')}
                placeholder={I18n.t('addressLink')}
                leftItems={
                    <AppView width={10} stretch center backgroundColor={colors.primary1}
                        margin={3} borderRadius={5}
                    >
                        <AppIcon borderRadius={5} size={6} padding={3} name="link" type="FontAwesome5" reverse />
                    </AppView>
                }
            />

            {countryId !== 27 && <AppInput
                marginVertical={3}
                {...injectFormProps('zip_code')}
                placeholder={I18n.t('zipCode')}
                phone
                multiline={true}
                leftItems={
                    <AppView width={10} stretch center backgroundColor={colors.primary}
                        margin={3} borderRadius={5}
                    >
                        <AppIcon stretch borderRadius={5} size={9} name="email-outline" type='MaterialCommunityIcons' />
                    </AppView>
                }
            />
            }
            <AppButton
                disabled={isSubmitting}
                onPress={handleSubmit}
                stretch
                marginVertical={10}
                linearGradient
                title={I18n.t('Continue')}
            />
        </AppScrollView>
    );
};

export default ReceiverDataForm;
