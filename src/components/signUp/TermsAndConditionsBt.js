import React, { Component, useState } from 'react';
import { AppIcon, AppNavigation, AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import I18n from 'i18next';

const TermsAndConditionsBt = ({ setFieldValue, onAccept }) => {
    const [istermsAccepted, setIsTermsAccepted] = useState(false);

    return (
        <AppView
            touchableOpacity
            row flex stretch marginTop={5}
        >
            <AppIcon
                onPress={() => {
                    setIsTermsAccepted((prev) => !prev);
                    onAccept(!istermsAccepted);
                }}
                name={istermsAccepted ? 'check-box-outline' : 'checkbox-blank-outline'}
                color={istermsAccepted ? colors.primary : colors.graytextC}
                type={'MaterialCommunityIcons'}
                size={12}
                backgroundColor={colors.white}
                borderRadius={10}
            />
            <AppText stretch marginHorizontal={2} size={6}>
                {`${I18n.t('agreeAll')} `}
                <AppText color={colors.primary} size={6}
                    onPress={() => AppNavigation.push('termsAndConditions')}
                >
                    {I18n.t('termsAndConditions')}
                </AppText>
                <AppText size={6}>
                    {` ${I18n.t('and')} `}
                </AppText>
                <AppText color={colors.primary} size={6}
                    onPress={() => AppNavigation.push('UsagePolicy')}
                >
                    {I18n.t('usagePolicy')}
                </AppText>
            </AppText>
        </AppView>
    );
};

export default TermsAndConditionsBt;
