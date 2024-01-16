import React, { Component } from 'react';
import { AppIcon, AppNavigation, AppText, AppView } from '../../common';
import I18n from 'i18next';
import colors from '../../common/defaults/colors';

const TitleSection = ({ name, screen, iconName, iconType, backgroundColor, iconSize, noEdit, statusBarColor, onPress }) => {
    return (
        <AppView flex stretch row spaceBetween>
            <AppView flex stretch row >
                <AppView backgroundColor={backgroundColor}
                    borderRadius={8} paddingVertical={1} >
                    <AppIcon borderRadius={5}
                        size={iconSize}
                        paddingHorizontal={2}
                        paddingVertical={1}
                        name={iconName}
                        type={iconType}
                    />

                </AppView>
                <AppView flex stretch>
                    <AppText size={9} margin={3} >{`${I18n.t(name)}`}</AppText>
                </AppView>
            </AppView>
            {noEdit ? null :
                <AppText
                    size={7}
                    color={colors.primary}
                    statusBarColor={colors.primary}
                    onPress={onPress ?
                        onPress
                        : () => {
                            AppNavigation.navigateToScreen(screen)
                            // AppNavigation.push({
                            //     name: screen,
                            //     statusBarColor: statusBarColor ? statusBarColor : undefined,
                            //     passProps: {

                            //     }
                            // })
                        }
                    }
                >{`${I18n.t('edit')}`}</AppText>
            }
        </AppView>
    );
};

TitleSection.defaultProps = {
    iconSize: 9,
    backgroundColor: colors.primary1,
}
export default TitleSection;
