import React, { Component } from 'react';
import { AppText, AppView, TouchableView } from '../../common';
import colors from '../../common/defaults/colors';
import I18n from 'i18next';

const DimensionsTypes = ({ dimensionsType, setDimensionsType, weightType, setWeightType, setFieldValue, documentOnly }) => {
    return (
        <AppView flex stretch row spaceBetween marginVertical={5}>
            {!documentOnly &&
                <AppView flex={0.48} stretch row
                    borderRadius={10} backgroundColor={colors.graytext}>
                    <TouchableView flex stretch center paddingVertical={5}
                        onPress={() => {
                            setDimensionsType('cm');
                            setFieldValue('height_value', 'cm')
                        }}
                        backgroundColor={dimensionsType === 'cm' ? colors.primary : undefined}
                        borderTopLeftRadius={10}
                        borderBottomLeftRadius={10}
                    >
                        <AppText center color={dimensionsType === 'cm' ? colors.white : undefined}>{I18n.t('centimeter')}</AppText>
                    </TouchableView>
                    <TouchableView flex stretch center
                        onPress={() => {
                            setDimensionsType('inch');
                            setFieldValue('height_value', 'inch')
                        }}
                        backgroundColor={dimensionsType === 'inch' ? colors.primary : undefined}
                        borderTopRightRadius={10}
                        borderBottomRightRadius={10}
                    >
                        <AppText center color={dimensionsType === 'inch' ? colors.white : undefined}>{I18n.t('inch')}</AppText>
                    </TouchableView>
                </AppView>
            }
            <AppView flex={0.48} stretch row borderRadius={10} 
                borderRadius={10} backgroundColor={colors.graytext} >
                <TouchableView flex stretch center
                    onPress={() => {
                        setWeightType('kg');
                        setFieldValue('weight_value', 'kg')
                    }}
                    backgroundColor={weightType === 'kg' ? colors.primary : undefined}
                    borderTopLeftRadius={10}
                    borderBottomLeftRadius={10}
                >
                    <AppText center color={weightType === 'kg' ? colors.white : undefined}>{I18n.t('kilogram')}</AppText>
                </TouchableView>
                <TouchableView flex stretch center paddingVertical={5}
                    onPress={() => {
                        setWeightType('pound');
                        setFieldValue('weight_value', 'pound')
                    }}
                    backgroundColor={weightType === 'pound' ? colors.primary : undefined}
                    borderTopRightRadius={10}
                    borderBottomRightRadius={10}
                >
                    <AppText center color={weightType === 'pound' ? colors.white : undefined}>{I18n.t('pound')}</AppText>
                </TouchableView>
            </AppView>
        </AppView>
    );
};

export default DimensionsTypes;
