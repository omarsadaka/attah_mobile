import React from 'react';
import { useWindowDimensions } from 'react-native';
import HTML from 'react-native-render-html';
import { useSelector } from 'react-redux';

const SectionContent = ({content}) => {
  const contentWidth = useWindowDimensions().width;
  const rtl = useSelector(state => state.lang.rtl);

  return (
    <HTML
      source={{
        html:
          `<div style='text-align: ${rtl ? 'right' : 'left'};direction: ${
            rtl ? 'rtl' : 'ltr'
          };'>'${content}'</div>` || '<p></p>',
      }}
      contentWidth={contentWidth}
      // ignoredDomTags={['font']}
      enableExperimentalMarginCollapsing={true}
    />
  );
};
export default SectionContent;
