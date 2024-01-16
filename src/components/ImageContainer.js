import React from 'react';
import { useSelector } from 'react-redux';
import { AppScrollView, AppImage, AppView } from '../common';
import Header from './Header';
import { useNetInfo } from "@react-native-community/netinfo";
import NoNetworkConnection from './NoNetworkConnection';

const ImageContainer = (props) => {
  const {
    children,
    source,
    backHandler,
    header,
    hideBack,
    title,
    showMenu,
    bold,
    color,
    showNotif,
    rightItems,
    linearBackgroundGradient,
    center,
    ...rest
  } = props;
  const netInfo = useNetInfo();

  if (!netInfo?.isConnected && netInfo.type !== 'unknown')
    return (
      <AppView flex stretch  >
        <NoNetworkConnection />
      </AppView>
    )
  return (
    <AppImage flex stretch source={source}>
      {header && (
        <Header
          {...{ color }}
          {...{ showNotif }}
          {...{ bold }}
          {...{ backHandler }}
          {...{ hideBack }}
          {...{ showMenu }}
          {...{ title }}
          {...{ center }}
          {...{ rightItems }}
          {...{ linearBackgroundGradient }}
        />
      )}
      <AppScrollView {...rest} {...{ center }} flex stretch>
        {children}
      </AppScrollView>
    </AppImage>
  );
};

ImageContainer.defaultProps = {
  header: true,
};

export default ImageContainer;
