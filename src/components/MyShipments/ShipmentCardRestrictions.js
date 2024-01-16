import React from 'react';
import { AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import I18n from 'i18next';

const ShipmentCardRestrictions = ({ data }) => {
    const { id, name } = data;
    return (
        <AppView flex stretch backgroundColor={colors.white} borderRadius={15}
            padding={5} marginHorizontal={5} marginVertical={3}
            key={id}
        >
            <AppText >{`${name}`}</AppText>
        </AppView>
    );
};

export default ShipmentCardRestrictions;
