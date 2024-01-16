import React from 'react';
import { AppSpinner, AppView } from '../common';
import colors from '../common/defaults/colors';

const LoadingAbsoluteView = ({ }) => {
  return (
    <AppView center
      style={{
        position: 'absolute', opacity: 0.9,
        zIndex: 10000, top: 0, bottom: 0, left: 0, right: 0
      }}
      backgroundColor={colors.white}
    >
      <AppSpinner size={15} />
    </AppView>
  );
};

export default LoadingAbsoluteView;
