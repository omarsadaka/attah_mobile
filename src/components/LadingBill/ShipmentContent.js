import React from 'react';
import { useSelector } from 'react-redux';
import { AppText, AppView } from '../../common';
import colors from '../../common/defaults/colors';
import TitleSection from './TitleSection';

const ShipmentContent = ({ index }) => {
    const shipmentData = useSelector(state => state.shipment.shipmentData)
    console.log("shipmentData ", shipmentData?.content_types)
    return (
        <AppView flex stretch backgroundColor={colors.white} borderRadius={15}
            padding={5} marginHorizontal={5} marginVertical={3}
        >
            <TitleSection
                name='shipmentContent'
                screen='AddShipmentData'
                iconName='luggage-cart'
                iconType='FontAwesome5'
                backgroundColor={colors.primary}
                iconSize={7}
            />

            <AppView center flex stretch style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                {shipmentData?.content_types.map((data, index) => {
                    return (
                        <AppView
                            key={data.id}
                            margin={2}
                            borderRadius={25}
                            borderWidth={1}
                            paddingHorizontal={5}
                            paddingVertical={3}
                            borderColor={colors.graytext}
                        >
                            <AppText color={colors.graytext} >{`${data.id === 'other' ? shipmentData?.new_content_type : data.name}`}</AppText>
                        </AppView>
                    )
                })}
            </AppView>
        </AppView>
    );
};

export default ShipmentContent;
