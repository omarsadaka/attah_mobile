import { useNetInfo } from '@react-native-community/netinfo';
import React from 'react';
import { AppScrollView, AppView } from '../common';
import colors from '../common/defaults/colors';
import Header from './Header';
import NoNetworkConnection from './NoNetworkConnection';

const ScrollableContainer = props => {
  const {
    backHandler,
    header,
    hideBack,
    title,
    showMenu,
    bold,
    children,
    showNotif,
    rightItems,
    backgroundColor,
    linearBackgroundGradient,
    ...rest
  } = props;
  const netInfo = useNetInfo();

  return (
    <AppView flex stretch>
      {header && (
        <Header
          {...{showNotif}}
          {...{bold}}
          {...{backHandler}}
          {...{hideBack}}
          {...{showMenu}}
          {...{title}}
          {...{rightItems}}
          {...{backgroundColor}}
          {...{linearBackgroundGradient}}
        />
      )}
      {!netInfo?.isConnected && netInfo.type !== 'unknown' ? (
        <NoNetworkConnection />
      ) : (
        <AppScrollView {...rest} flex stretch backgroundColor={backgroundColor}>
          {children}
        </AppScrollView>
      )}
    </AppView>
  );
};

ScrollableContainer.defaultProps = {
  header: true,
  backgroundColor: colors.bg,
};

export default ScrollableContainer;
