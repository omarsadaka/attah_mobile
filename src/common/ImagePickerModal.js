import React, {forwardRef, useCallback, useEffect, useRef} from 'react';

import useModal from '../components/useModal';
import I18n from 'i18next';
import {AppModal, AppView, AppNavigation, AppText, AppButton} from '../common';

export default forwardRef(({onClosed, ...rest}, ref) => {
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
        <AppText size={8}>{I18n.t('chooseImage')}</AppText>
        <AppView marginVertical={10} stretch row spaceBetween>
          <AppButton
            flex={0.48}
            stretch
            title={I18n.t('Gallery')}
            touchableOpacity
            onPress={() => onClosed(1)}
          />
          <AppButton
            flex={0.48}
            stretch
            touchableOpacity
            title={I18n.t('Camera')}
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
      changeState={v => {
        changeState(v);
      }}
      {...rest}>
      {renderContent()}
    </AppModal>
  );
});
