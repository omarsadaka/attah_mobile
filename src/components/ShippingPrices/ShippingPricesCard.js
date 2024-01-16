import React, { useState } from 'react';
import { AppButton, AppIcon, AppImage, AppNavigation, AppRadioGroup, AppText, AppView, TouchableView } from '../../common';
import I18n from 'i18next';
import colors from '../../common/defaults/colors';
import RadioButton from '../../common/RadioButton';
import { useDispatch, useSelector } from 'react-redux';
import { setCompanytData } from '../../actions/shipment';
import { Switch } from 'react-native';

const ShippingPricesCard = ({ data }) => {
    const { company, price, price_from_home, insure, company_id, tax } = data;
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const companydata = useSelector(state => state.shipment.company);
    const [collectionPlace, setCollectionPlace] = useState(companydata?.collection_place || 'branch');
    const dispatch = useDispatch();
    return (
        <AppView
            key={company_id}
            stretch flex
            padding={5}
            marginHorizontal={5}
            marginVertical={3}
            backgroundColor={colors.white}
            borderRadius={15} >
            <TouchableView flex stretch bottom row onPress={() => AppNavigation.push({
                name: 'PriceDetails',
                passProps: { data, isEnabled, collectionPlace }
            })}>
                <AppText color={colors.graytext}>{`${I18n.t('priceDetails')}`}</AppText>
                <AppIcon name="keyboard-arrow-left" reverse type="MaterialIcons" size={10} color={colors.black} />
            </TouchableView>
            <AppView flex={3} stretch row>
                <AppImage equalSize={14} source={{ uri: company.image }} borderRadius={10} />
                <AppView flex stretch center>
                    <AppText size={9} margin={5}>{company.name}</AppText>
                </AppView>
            </AppView>

            {insure ?
                <AppView stretch row marginTop={5}>
                    <Switch
                        trackColor={{ false: "#767577", true: colors.primary1 }}
                        thumbColor={isEnabled ? colors.primary : colors.graytext}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}

                    />
                    <AppText marginHorizontal={3}>{I18n.t('addInsurancePrice')}</AppText>

                </AppView>
                : null}
            <AppRadioGroup
                initialValue={collectionPlace}
                showError
                childrenMargin={3}
                marginTop={5}
                onSelect={(value) => setCollectionPlace(value)}
            >
                <RadioButton
                    value="branch"
                    labelItem={
                        <AppText size={7} marginHorizontal={3}>
                            {`${I18n.t('branchDelivery')}`}
                            <AppText color={colors.primary}>{` ${isEnabled ? (price + insure).toFixed(2) : price}`}</AppText>
                            <AppText color={colors.graytext}>{` ${I18n.t('sar')}`}</AppText>
                        </AppText>
                    }
                />
                <RadioButton
                    value="home"
                    labelItem={
                        <AppText size={7} marginHorizontal={3}>
                            {`${I18n.t('receiptFromHome')}`}
                            <AppText color={colors.primary}>{` ${isEnabled ? (price_from_home + insure).toFixed(2) : price_from_home}`}</AppText>
                            <AppText color={colors.graytext}>{` ${I18n.t('sar')}`}</AppText>
                        </AppText>
                    }
                />
            </AppRadioGroup>
            <AppButton
                marginVertical={10}
                onPress={async () => {
                    await dispatch(setCompanytData(
                        {
                            collection_place: collectionPlace,
                            company_id: company_id,
                            company: company,
                            price: collectionPlace === 'home' ?
                                isEnabled ? (price_from_home + insure).toFixed(2) : price_from_home
                                :
                                isEnabled ? (price + insure).toFixed(2) : price,
                            insure: isEnabled,
                        }))
                    AppNavigation.push('LadingBill');
                }}
                stretch
                linearGradient
                title={I18n.t('next')}
            />
        </AppView >
    );
};


export default ShippingPricesCard;
