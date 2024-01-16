import React, { useMemo } from 'react';
import View from './View';
import Text from './Text';
import Icon from './Icon';
import { getTheme } from './Theme';
import { responsiveWidth } from './utils/responsiveDimensions';
import { CHECK_BOX_DISPLAY_NAME } from './utils/Constants';
import TouchableView from './TouchableView';
import colors from './defaults/colors';

const CheckBox = ({
  size,
  labelSize,
  labelColor,
  label,
  onPress,
  style,
  checked,
  activeColor,
  normalColor,
  value,
  index,
  labelBold,
  customActiveRenderer,
  touchableOpacity,
  borderColor,
  paddingLeft,
  ...rest
}) => {
  const color = checked ? activeColor : normalColor;
  const memoizedDimStyles = useMemo(() => {
    return {
      width: responsiveWidth(size * 0.95),
      height: responsiveWidth(size * 0.95),
    };
  }, [size]);
  return (
    <View stretch {...rest} style={style} marginVertical={3}>
      <TouchableView
        {...{ touchableOpacity }}
        // height={6}
        row flex stretch
        onPress={() => {
          onPress(value, index);
        }}>
        <View
          borderColor={color}
          borderWidth={1.5}
          center
          borderRadius={2}
          style={memoizedDimStyles}>
          {checked ? (
            customActiveRenderer ? (
              customActiveRenderer(size, color)
            ) : (
              <Icon
                name="check"
                type="Entypo"
                size={size * 1.2}
                color={colors.primary}
              />
            )
          ) : null}
        </View>
        <View flex stretch center>
          <Text
            stretch
            paddingLeft={paddingLeft ? paddingLeft : 0}
            bold={labelBold}
            size={labelSize || size}
            color={labelColor}>
            {label}
          </Text>
        </View>
      </TouchableView>
    </View>
  );
};

CheckBox.displayName = CHECK_BOX_DISPLAY_NAME;
CheckBox.defaultProps = {
  checked: false,
  ...getTheme().checkBox,
  onPress: () => { },
  labelBold: false,
};
export default CheckBox;
