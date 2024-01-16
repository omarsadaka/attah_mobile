import React from 'react';
import { AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import I18n from 'i18next';

const ShipmentContent = ({ data }) => {
    const { content_type } = data;
    return (
        <AppView flex stretch backgroundColor={colors.white} borderRadius={15}
            padding={5} marginHorizontal={5} marginVertical={3}
        >
            <AppText size={8} marginVertical={3}>{`${I18n.t('shipmentContent')}`}</AppText>

            <AppView center flex stretch style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                {content_type.map((item, index) => {
                    return (
                        <AppView
                            key={item.id}
                            margin={2}
                            borderRadius={25}
                            borderWidth={1}
                            paddingHorizontal={5}
                            paddingVertical={3}
                            borderColor={colors.graytext}
                        >
                            <AppText color={colors.graytext} >{`${item.name}`}</AppText>
                        </AppView>
                    )
                })}
            </AppView>
        </AppView>
    );
};

export default ShipmentContent;
