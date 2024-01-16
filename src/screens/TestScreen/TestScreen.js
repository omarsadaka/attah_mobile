import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollableContainer } from '../../components';
import RighButton from '../../components/newComponents/rightBackButton';
// to test components

const TestScreen = props => {
  return (
    <ScrollableContainer
      header
      rightItems={
        <RighButton
          componentId={props.componentId}
          // background
        />
      }
      statusBar
      hideBack
      // flex
      stretch>
      {/* <AppView
        stretch */}
      {/* // style={{alignItems: 'stretch', borderColor: 'red', borderWidth: 1}}>
      > */}
      {/* <Header /> */}
      {/* </AppView> */}
      {/* <AppView stretch style={{borderWidth: 1, borderColor: 'red'}}> */}
      {/* <AppText>Test screen</AppText> */}
      {/* </AppView> */}
      {/* <AppView stretch style={{borderWidth: 1, borderColor: 'red'}}> */}
      {/* <AppInput /> */}
      {/* </AppView> */}
      {/* <AppView stretch style={{borderWidth: 1, borderColor: 'red'}}> */}
      {/* <AppInput stretch /> */}
      {/* <CheckBox */}
      {/* value={false} */}
      {/* normalColor={colors.darkGray} */}
      {/* activeColor={colors.primary} */}
      {/* label="checkbox label" */}
      {/* /> */}
      {/* </AppView> */}
      {/* <AppButton stretch title="click" /> */}
    </ScrollableContainer>
  );
};

TestScreen.options = {
  topBar: {
    background: {
      component: {
        name: 'TopBarBg',
      },
    },
  },
};

export default TestScreen;

const styles = StyleSheet.create({});
