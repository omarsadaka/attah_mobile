import { useMemo } from 'react';
import store from '../../store/store';
import {
  colorStyles, fontFamilyStyles, fontSizeStyles, textDirectionStyles
} from '../Base';
import { responsiveFontSize } from './responsiveDimensions';
import { isASCII } from './text';

const useTextStyles = (props, children) => {
  const {
    size,
    font,
    bold,
    left = !store.getState().lang.rtl,
    right = store.getState().lang.rtl,
    center,
    stretch,
    reverse,
    color,
    lineHeight,
    line,
  } = props;

  const memoizedTextStyles = useMemo(() => {
    let styles = {};
    if (left || right || center || stretch || reverse) {
      styles = textDirectionStyles({left, right, center, stretch, reverse});
    }

    if (size) {
      styles = {...styles, ...fontSizeStyles({size})};
    }

    // if (font || bold) {
    styles = {...styles, ...fontFamilyStyles({font, bold})};
    // }

    if (color) {
      styles = {...styles, ...colorStyles({color})};
    }

    if (typeof children === 'string') {
      styles = {...styles, writingDirection: isASCII(children) ? 'ltr' : 'rtl'};
    }

    if (lineHeight) {
      styles = {...styles, lineHeight: responsiveFontSize(lineHeight)};
    }
    if (line) {
      styles = {
        ...styles,
        textDecorationLine: 'underline',
      };
    }
    return styles;
  }, [
    left,
    right,
    center,
    stretch,
    reverse,
    size,
    font,
    bold,
    color,
    children,
    lineHeight,
    line,
  ]);
  return memoizedTextStyles;
};

export default useTextStyles;
