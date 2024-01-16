import React, { forwardRef, useCallback, useEffect, useRef } from 'react';

import I18n from 'i18next';
import {
    AppModal,
    AppView,
    AppNavigation,
    AppText,
    AppButton,
} from '../../common';
import useModal from '../useModal';

export default forwardRef(({ onClosed, file, ...rest }, ref) => {

    const [isVisible, changeState, hide] = useModal(ref);

    const renderContent = () => {
        return (
            <AppView
                // height={20}
                padding={5}
                backgroundColor="white"
                width={90}
                centerX
                borderRadius={10}>
                <AppText size={8}>{I18n.t('savedTo')}</AppText>
                <AppText >{file.filePath}</AppText>

                <AppView marginVertical={10} stretch row spaceBetween>
                    <AppButton flex={0.48} stretch linearGradient
                        title={I18n.t('share')}
                        touchableOpacity
                        onPress={() => onClosed(1)}
                    />
                    <AppButton flex={0.48} stretch linearGradient
                        touchableOpacity
                        title={I18n.t('cancel')}
                        onPress={() => onClosed(2)}
                    />
                </AppView>
            </AppView>
        );
    };

    return (
        <AppModal
            animationIn="bounceIn"
            animationOut="bounceOut"
            isVisible={isVisible}
            backdropDissmiss
            closeable
            changeState={(v) => {
                changeState(v);
            }}
            {...rest}>
            {renderContent()}
        </AppModal>
    );
});
