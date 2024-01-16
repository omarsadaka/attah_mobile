import { useNetInfo } from "@react-native-community/netinfo";
import React, { useState } from 'react';
import I18n from 'i18next';
import { useSelector } from 'react-redux';
import {
    AppButton, AppIcon, AppInput, AppNavigation, AppScrollView, AppText, AppView, responsiveHeight
} from '../../common';
import colors from '../../common/defaults/colors';
import { MOBILE_LENGTH } from '../../common/utils/Constants';
import { PickersRepo } from '../../repo';
import NoNetworkConnection from '../NoNetworkConnection';
import LoadingPicker from './LoadingPicker';

const pickersRepo = new PickersRepo();

const SenderDataForm = ({ injectFormProps, isSubmitting, setFieldValue, handleSubmit }) => {
    const [refreshAddresses, setRefreshAddresses] = useState(false);
    const [newAddress, setNewAddress] = useState();
    const netInfo = useNetInfo();
    const senderData = useSelector(state => state.shipment.senderData);
    console.log("senderData ---------------", senderData?.sender_address)
    if (!netInfo?.isConnected && netInfo.type !== 'unknown')
        return (<AppView flex stretch marginTop={responsiveHeight(1)} >
            <NoNetworkConnection />
        </AppView>
        )

    return (
        <AppScrollView flex stretch centerX paddingTop={responsiveHeight(1)} paddingHorizontal={5}>
            <AppInput
                marginVertical={3}
                {...injectFormProps('sender_name')}
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
                {...injectFormProps('sender_phone')}
                maxLength={MOBILE_LENGTH}
                placeholder={I18n.t('phone')}
                leftItems={
                    <AppView width={10} stretch center backgroundColor={colors.primary1}
                        margin={3} borderRadius={5}
                    >
                        <AppIcon borderRadius={5} size={8} padding={3} name="phone" type="Feather" flip />
                    </AppView>
                }
            />

            <AppInput
                marginVertical={3}
                phone
                {...injectFormProps('sender_id_number')}
                placeholder={I18n.t('idNumber')}
                leftItems={
                    <AppView width={10} stretch center backgroundColor={colors.secondary1}
                        margin={3} borderRadius={5}
                    >
                        <AppIcon stretch borderRadius={5} size={8} name="person-outline" />
                    </AppView>
                }
            />

            {/* <LocationPickers
                cityInjectFormProps={'sender_city_id'}
                sender
                {...{ pickersRepo }}
                {...{ setFieldValue }}
                {...{ injectFormProps }}
            /> */}
            {console.log("================================== newAddress", newAddress)}
            <LoadingPicker
                provider={pickersRepo.getMyAddresses}
                title={I18n.t('address')}
                {...{ setFieldValue }}
                {...injectFormProps('sender_address_id')}
                paddingVertical={0}
                address
                isSearch={false}
                // refresh={refreshAddresses}
                setInitialValueAfterFetch={senderData?.sender_address_id ? false : true}
                {...{ newAddress }}
                initialValue={newAddress ? {
                    label: newAddress?.address_details,
                    value: newAddress?.id,
                } :
                    senderData?.sender_address_id ? {
                        label: senderData?.sender_address,
                        value: senderData?.sender_address_id,
                    }
                        :
                        {
                            label: I18n.t('address'),
                            value: null,
                        }}
                noResultsLabelPickerModal={I18n.t('noAddresses')}
                extraData='sender_address'
                label={'address_details'}
                headerRightItems={
                    <AppView stretch  >
                        <AppText center color={colors.secondary}
                            onPress={() => {
                                AppNavigation.pop();
                                setTimeout(() => {
                                    AppNavigation.push(
                                        {
                                            name: 'AddAddress',
                                            passProps: {
                                                showAddToMyAddresses: true,
                                                onDone: (res) => {
                                                    console.log("+++++++++++++", res)
                                                    setNewAddress(res);
                                                    setRefreshAddresses(true)
                                                },
                                            }
                                        })
                                }, 1000);
                            }}
                            marginVertical={5} >{I18n.t('addAddress')}</AppText>
                    </AppView>
                }
                // initialValue={}
                leftItems={
                    <AppView width={10} stretch center backgroundColor={colors.secondary}
                        borderRadius={5} marginVertical={3}
                    >
                        <AppIcon stretch borderRadius={5} size={8} name="location-pin" type="SimpleLineIcons" />
                    </AppView>
                }
            />

            <AppInput
                marginVertical={3}
                {...injectFormProps('sender_address_url')}
                placeholder={I18n.t('addressLink')}
                leftItems={
                    <AppView width={10} stretch center backgroundColor={colors.primary1}
                        margin={3} borderRadius={5}
                    >
                        <AppIcon borderRadius={5} size={6} padding={3} name="link" type="FontAwesome5" reverse />
                    </AppView>
                }
            />

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

export default SenderDataForm;
