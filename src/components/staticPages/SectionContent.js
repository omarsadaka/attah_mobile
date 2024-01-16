import React from 'react';
import { useWindowDimensions } from 'react-native';
import HTML from 'react-native-render-html';

const SectionContent = ({ content, ...rest }) => {
  const contentWidth = useWindowDimensions().width;
  return (
    <HTML
      source={{ html: content || '<p></p>' }}
      contentWidth={contentWidth}
    />
  );
};
export default SectionContent;
