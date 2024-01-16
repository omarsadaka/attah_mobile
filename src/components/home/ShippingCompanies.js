//import liraries
import React, { useState } from 'react';
import { AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import I18n from 'i18next';
import ShippingCompaniesList from './ShippingCompaniesList';

const ShippingCompanies = () => {
    const [totalCompaneies, setTotalCompanies] = useState(0);
    return (
        <AppView flex stretch center marginVertical={10} borderRadius={15} padding={5}>
            <AppView backgroundColor={colors.white} borderRadius={15}
                style={{ opacity: 0.4, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} />
            <AppText color={colors.black}>{`${I18n.t('doBusiness')} ${totalCompaneies} ${I18n.t('registeredShippingCompanies')}`}</AppText>
            <ShippingCompaniesList {...{ setTotalCompanies }} />
        </AppView>
    );
};

export default ShippingCompanies;
