import React, { useMemo, useState } from 'react';
import {
    AppText,
    AppInput,
    AppView,
    AppButton,
    AppNavigation,
    AppIcon,
} from '../../common';
import I18n from 'i18next';
import { MOBILE_LENGTH } from '../../common/utils/Constants';
import colors from '../../common/defaults/colors';
import Picker from '../Picker';
import LocationInput from './LocationInput';
import LocationPickers from './LocationPickers';

import { PickersRepo } from '../../repo';

const pickersRepo = new PickersRepo();

const Form = ({ injectFormProps, isSubmitting, setFieldValue, handleSubmit, setError, initialValues, validateField, showAddToMyAddresses }) => {
    const [addToMyAddresses, setAddToMyAddresses] = useState(true);
    const [defaultAddress, serDefaultAddress] = useState(false);
    const [enablePositioning, setEnablePositioning] = useState(false);

    return (
        <AppView centerX stretch marginTop={10}>
            <AppInput
                marginVertical={3}
                {...injectFormProps('name')}
                placeholder={I18n.t('name')}
            />

            <AppInput
                phone
                marginVertical={3}
                {...injectFormProps('phone')}
                maxLength={MOBILE_LENGTH}
                placeholder={I18n.t('phone')}
            />

            <LocationPickers
                {...{ pickersRepo }}
                {...{ setFieldValue }}
                {...{ injectFormProps }}
                {...{ setError }}
            />

            <AppInput
                marginVertical={3}
                {...injectFormProps('street')}
                placeholder={I18n.t('streetName')}
            />
            <AppInput
                marginVertical={3}
                {...injectFormProps('building_no')}
                placeholder={I18n.t('buildingNumber')}
            />
            <AppInput
                marginVertical={3}
                {...injectFormProps('floor')}
                placeholder={I18n.t('floor')}
            />
            <AppInput
                marginVertical={3}
                {...injectFormProps('mark')}
                placeholder={I18n.t('specialMark')}
            />
            {/* <AppInput
                phone
                marginVertical={3}
                {...injectFormProps('zip_code')}
                placeholder={I18n.t('postalCode')}
            /> */}
            {showAddToMyAddresses &&
                <AppView row flex stretch marginTop={5}>
                    <AppIcon
                        onPress={() => {
                            setFieldValue('status', !addToMyAddresses ? 1 : 0);
                            setAddToMyAddresses(!addToMyAddresses);
                        }}
                        name={addToMyAddresses ? 'check-box-outline' : 'checkbox-blank-outline'}
                        color={addToMyAddresses ? colors.primary : colors.graytextC}
                        type={'MaterialCommunityIcons'}
                        size={12}
                        backgroundColor={colors.white}
                        borderRadius={10}
                    />
                    <AppText stretch marginHorizontal={2} size={7}>
                        {`${I18n.t('addToMyAddresses')} `} </AppText>
                </AppView>
            }
            <AppView row flex stretch marginTop={5}>
                <AppIcon
                    onPress={() => {
                        setFieldValue('default', !defaultAddress ? 1 : 0);
                        serDefaultAddress(!defaultAddress);
                    }}
                    name={defaultAddress ? 'check-box-outline' : 'checkbox-blank-outline'}
                    color={defaultAddress ? colors.primary : colors.graytextC}
                    type={'MaterialCommunityIcons'}
                    size={12}
                    backgroundColor={colors.white}
                    borderRadius={10}
                />
                <AppText stretch marginHorizontal={2} size={7}>
                    {`${I18n.t('defaultAddress')} `} </AppText>
            </AppView>

            <AppView row flex stretch marginTop={5}>
                <AppIcon
                    onPress={() => {
                        setFieldValue('enablePositioning', !enablePositioning);
                        validateField('lat');
                        setEnablePositioning(!enablePositioning);
                    }}
                    name={enablePositioning ? 'check-box-outline' : 'checkbox-blank-outline'}
                    color={enablePositioning ? colors.primary : colors.graytextC}
                    type={'MaterialCommunityIcons'}
                    size={12}
                    backgroundColor={colors.white}
                    borderRadius={10}
                />
                <AppText stretch marginHorizontal={2} size={7}>
                    {`${I18n.t('enablePositioning')} `} </AppText>
            </AppView>
            {enablePositioning &&
                <LocationInput {...injectFormProps('lat')} marginVertical={5} {...{ initialValues }} />
            }
            <AppButton
                disabled={isSubmitting}
                processing={isSubmitting}
                onPress={handleSubmit}
                stretch
                marginVertical={10}
                linearGradient
                title={I18n.t('add')}
            />

        </AppView >
    );
};

export default Form;
