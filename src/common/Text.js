import React, { useMemo } from 'react';
import { Text as NativeText } from 'react-native';
import { useSelector } from 'react-redux';
import { getTheme } from './Theme';
import { convertNumbers } from './utils/numbers';
import useCommonStyles from './utils/useCommonStyles';
import useTextStyles from './utils/useTextStyles';

const Text = props => {
  const {children, style, translateNumbers, type,numberOfLines,  ...rest} = props;
  const rtl = useSelector(state => state.lang.rtl);
  const commonStyles = useCommonStyles(rest);
  const textStyles = useTextStyles(rest, children);
  return useMemo(() => {
    return (
      <NativeText
        dataDetectorType={type}
        numberOfLines={numberOfLines}
        {...rest}
        style={[commonStyles, textStyles, style]}>
        {convertNumbers(children, translateNumbers ? rtl : false)}
      </NativeText>
    );
  }, [rest, commonStyles, textStyles, style, children, translateNumbers, rtl]);
};

Text.defaultProps = {
  ...getTheme().text,
  stretch: true,
  type: 'none',
  
};
export default Text;
