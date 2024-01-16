import React, { useCallback, useMemo, useState } from 'react';
import {
  AppIcon,
  AppNavigation,
  AppText,
  AppView,
  getTheme,
  TouchableView,
} from '../../common';
import InputError from '../../common/micro/InputError';
import I18n from 'i18next';
import MapConfig from '../../utils/mapConfig';
import colors from '../../common/defaults/colors';
const LocationInput = ({
  initialValue,
  error,
  isDirty,
  onChange,
  name,
  borderColor,
  data,
  ...rest
}) => {
  // console.log("data ", data)
  const [address, setAddress] = useState(data?.address);
  const showError = useMemo(() => error && isDirty, [error, isDirty]);

  const setLocation = useCallback(
    async (loc) => {
      let addr = '';
      try {
        addr = await MapConfig.getPlaceName(loc.latitude, loc.longitude);
      } catch {
        addr = 'place name';
      }
      setAddress(addr);
      if (onChange) {
        onChange(name, loc.latitude);
        onChange('lng', loc.longitude);
        onChange('address', addr);
      }
    },
    [name, onChange],
  );
  return (
    <AppView
      stretch {...{ rest }}
    >
      <TouchableView
        row
        spaceBetween
        onPress={() =>
          AppNavigation.push({
            name: 'mapScreen',
            passProps: {
              onConfirm: setLocation,
              initialLocation: data?.lat ?
                {
                  latitude: parseFloat(data?.lat),
                  longitude: parseFloat(data?.lng)
                } : null,
            }
          })
        }
        stretch
        borderColor={address ? colors.primary : error ? colors.error : borderColor}
        {...rest}
      >
        <AppView stretch centerY width={65}>
          <AppText size={5} marginHorizontal={2}>
            {address ? address : I18n.t('place')}
          </AppText>
        </AppView>
        <AppView circleRadius={10} backgroundColor={colors.secondary} center>
          <AppIcon
            name="compass-outline"
            size={12}
            color={colors.white}
          />
        </AppView>
      </TouchableView>
      {showError && <InputError error={error} size={6} />}
    </AppView >
  );
};

LocationInput.defaultProps = {
  ...getTheme().input,
};

export default LocationInput;
