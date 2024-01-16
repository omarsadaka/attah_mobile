import React from 'react';
import { AppView, AppSpinner } from '../common';
import colors from '../common/defaults/colors';

export default () => {
    return (
        <AppView
            style={{
                zIndex: 3000,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
                backgroundColor: 'rgba(0,0,0,.7)',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
          <AppSpinner size={14} color={colors.primary} />
        </AppView>
    );
};
