import React, { useCallback, useMemo, useRef, useState } from 'react';

import { default as I18n, default as i18next } from 'i18next';
import { Image, Text, TouchableOpacity } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { AppButton } from '.';
import colors from './defaults/colors';
import Dimensions from './defaults/Dimensions';
import fonts from './defaults/fonts';
import ImagePickerModal from './ImagePickerModal';
import InputError from './micro/InputError';
import { PICKER_OPTIONS } from './utils/Constants';
import { showError } from './utils/localNotifications';
import AppView from './View';

const ImagePicker = ({
  equalSize,
  backgroundColor,
  name,
  onChange,
  error,
  size,
  circleRadius,
  buttonToChangeImage,
  isDirty,
  initialValue,
  ...rest
}) => {
  const isShowError = useMemo(() => error && isDirty, [isDirty, error]);
  const [uri, setUri] = useState(initialValue);
  const ImagePickerModalRef = useRef();
  const [permissionGranted, setPermissionGranted] = useState(false);

  // const requestCameraPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use the camera');
  //       setPermissionGranted(true);
  //     } else {
  //       console.log('Camera permission denied');
  //       setPermissionGranted(false);
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  // const checkCameraPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.check(
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //     );
  //     console.log(
  //       '🚀 ~ file: ImagePicker.js ~ line 55 ~ checkCameraPermission ~ granted',
  //       granted,
  //     );
  //     if (granted) {
  //       console.log('check  => You can use the camera');
  //       // requestCameraPermission();
  //     } else {
  //       console.log('check  => Camera permission denied');
  //       // requestCameraPermission();
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  // const _requestPermission = () => {
  //   let permission = PERMISSIONS.IOS.CAMERA;
  //   request(permission).then(result => {
  //     console.log('result permission', result);
  //     if (result === 'granted') {
  //       setPermissionGranted(true);
  //     } else {
  //       setPermissionGranted(false);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   if (Platform.OS === 'android') {
  //     checkCameraPermission();
  //     requestCameraPermission();
  //   } else {
  //     _requestPermission();
  //   }
  // }, []);

  const setImageUri = useCallback(
    res => {
      if (onChange) {
        onChange(res);
      }
    },
    [name, onChange],
  );

  const _launchImageLibrary = useCallback(async () => {
    launchImageLibrary(PICKER_OPTIONS, response => {
      console.log('response', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        alert(
          'ImagePicker Error: ' +
            '\t' +
            response.error +
            '\t' +
            JSON.stringify(response.error),
        );
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('response  launchImageLibrary', response);
        resize(response?.assets[0]);
      }
    });
  }, [resize]);

  const _launchCamera = useCallback(async () => {
    console.log('xxxx _launchCamera');
    launchCamera(PICKER_OPTIONS, response => {
      console.log(' response ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        alert(
          'ImagePicker Error: ' +
            '\t' +
            response.error +
            '\t' +
            JSON.stringify(response.error),
        );
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('response launchCamera xxxxxxxxxx ', response);
        if (
          response &&
          response.errorCode &&
          response.errorCode === 'permission'
        ) {
          // setTimeout(() => {
          showError(I18n.t('allow-camera-permission'));
          // }, 100);
        } else {
          resize(response?.assets[0]);
        }
      }
    });
  }, [resize]);
  const pickImage = useCallback(async () => {
    ImagePickerModalRef.current.show();
  }, []);
  const resize = useCallback(
    res => {
      setImageUri(res);
      // ImageResizer.createResizedImage(unreizedUri, 5000, 5000, 'JPEG', 100, 0, undefined, false, { mode: 'contain' })
      //   .then(({ uri: resizedUri }) => {
      //     setImageUri(resizedUri);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     return Alert.alert(
      //       'Unable to resize the photo',
      //       // 'Check the console for full the error message',
      //     );
      //   });
    },
    [setImageUri],
  );
  return (
    <AppView stretch center row={buttonToChangeImage}>
      {/* <AppImage
        center
        onPress={() => ImagePickerModalRef.current.show()}
        margin={1}
        elevation={2}
        borderRadius={5}
        {...(circleRadius ? {} : {equalSize})}
        source={{uri: uri}}
        {...{circleRadius}}
        resizeMode="cover"
        {...{backgroundColor}}
        {...rest}>
        {!uri && (
          <AppIcon
            size={size}
            color="white"
            name="upload-cloud"
            type="Feather"
          />
        )}
      </AppImage> */}
      <TouchableOpacity
        style={{borderRadius: 10, borderWidth: 1, borderColor: colors.grayText}}
        onPress={() => {
          // if (permissionGranted)
          ImagePickerModalRef.current.show();
          // else showError(i18next.t('allow-permession'));
        }}>
        <Image
          source={{uri: uri ? uri : initialValue}}
          style={{
            width: Dimensions.DEVICE_WIDTH * 0.3,
            height: Dimensions.DEVICE_WIDTH * 0.3,
            elevation: 2,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.grayText,
          }}
          resizeMode="cover"
        />
      </TouchableOpacity>
      {buttonToChangeImage && (
        <AppView stretch bottom marginHorizontal={5}>
          <AppButton
            backgroundColor={colors.darkText}
            width={40}
            onPress={() => {
              // if (permissionGranted)
              pickImage();
              // else showError(i18next.t('allow-permession'));
            }}
            title={I18n.t('editPhoto')}
          />
        </AppView>
      )}
      <ImagePickerModal
        ref={ImagePickerModalRef}
        onClosed={async v => {
          ImagePickerModalRef.current.hide();
          setTimeout(async () => {
            if (v === 1) {
              _launchImageLibrary();
            } else {
              // if (permissionGranted) _launchCamera();
              // else {
              // if (Platform.OS === 'android') {
              //   await requestCameraPermission();
              // }
              _launchCamera();
              // }
            }
          }, 1000);
        }}
      />
      {isShowError && <InputError error={error} size={7} />}
      <TouchableOpacity
        onPress={() => {
          // if (permissionGranted)
          ImagePickerModalRef.current.show();
          // else showError(i18next.t('allow-permession'));
        }}
        style={{
          width: '100%',
          height: '30%',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.9,
          position: 'absolute',
          bottom: 0,
          borderBottomRightRadius: 8,
          borderBottomLeftRadius: 8,
          backgroundColor: colors.grayText,
        }}>
        <Text
          style={{color: colors.white, fontSize: 20, fontFamily: fonts.normal}}>
          {i18next.t('change')}
        </Text>
      </TouchableOpacity>
    </AppView>
  );
};

ImagePicker.defaultProps = {
  size: 7,
  equalSize: 8,
  backgroundColor: colors.white,
};

export default ImagePicker;
