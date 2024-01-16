import React, { Component } from 'react';
import {
  AppView,
  AppText,
  AppIcon,
  getColors,
  AppImage,
  TouchableView
} from '../../common';
import styles from './styles';

export default class OptionButton extends Component {
  renderCheckBox = () => {
    const { tagScroll, onPress, selected, value, style, text } = this.props;
    return (
      <>
        {text ? (
          <AppView
            borderColor={selected ? getColors().primary : getColors().grey}
            borderWidth={1}
            borderRadius={3}
            paddingHorizontal={2}
            style={style}
            onPress={() => {
              onPress(value);
            }}
            marginHorizontal={2}
            marginBottom={5}>
            <AppView
              style={{ position: 'absolute', top: 0, right: 0 }}
              // borderColor="red"
              backgroundColor={selected && getColors().primary}>
              {selected && (
                <AppIcon
                  name="check"
                  type="Entypo"
                  size={4}
                  color="white"
                  backgroundColor="balck"
                />
              )}
            </AppView>
            <AppText paddingVertical={5} size={4.5} paddingHorizontal={2}>
              {text}
            </AppText>
          </AppView>
        ) : null}
      </>
    );
  };

  renderTagScrool = () => {
    const {
      tagScroll,
      style,
      onPress,
      value,
      index,
      selected,
      text,
      name,
      ...rest
    } = this.props;
    return (
      <AppView stretch style={style} centerX {...rest}>
        <AppView
          borderWidth={1.5}
          borderColor={selected ? getColors().primary : '#E9E9E9'}
          style={styles.radius}
          backgroundColor={selected ? getColors().primary : '#E9E9E9'}
          padding={5}
          center
          onPress={() => {
            onPress(value);
          }}>
          {tagScroll && (
            <AppText color={selected ? 'white' : '#8B8B8B'}>{text}</AppText>
          )}
        </AppView>
      </AppView>
    );
  };
  renderCategoriesFilterScroll = () => {
    const {
      tagScroll,
      style,
      onPress,
      value,
      index,
      categoriesFilter,
      selected,
      data,
      ...rest
    } = this.props;
    return (
      <AppView stretch style={style} center {...rest}>
        <TouchableView
          borderWidth={0.2}
          borderColor='#EFE8E9'
          backgroundColor='white'
          elevation={3}
          marginVertical={3}
          circleRadius={18}
          center
          onPress={() => {
            onPress(value);
          }}
        >
          {/* <AppIcon
            name={data.icon}
            type="custom"
            color="primary"
            size={12}
          /> */}
          <AppImage
            source={{uri:data.image}}
            resizeMode="cover"
            circleRadius={18}
          />
        </TouchableView>
        <AppView stretch center>
          <AppText size={5} color='#000' bold>
            {data.name}
          </AppText>
        </AppView>
      </AppView>
    );
  };


  renderDefault = () => {
    const {
      tagScroll,
      style,
      onPress,
      value,
      index,
      selected,
      text,
      name,
      checkBox,
      ...rest
    } = this.props;
    return (
      <AppView stretch style={style} centerX flex {...rest}>
        <AppView
          borderWidth={1.5}
          borderColor={selected ? getColors().primary : getColors().grey}
          circleRadius={12}
          center
          onPress={() => {
            onPress(value);
          }}
          touchableOpacity
          marginHorizontal={2}>
          {name && (
            <AppImage
              source={name}
              marginHorizontal={1}
              resizeMode="contain"
              equalSize={12}
            />
          )}
        </AppView>
        {text && (
          <AppView center marginTop={2}>
            <AppText
              color={selected ? '#676767' : '#8B8B8B'}
              center
              size={4.5}
              bold={selected}>
              {text}
            </AppText>
          </AppView>
        )}
      </AppView>
    );
  };

  render() {
    const {
      tagScroll,
      style,
      onPress,
      value,
      index,
      selected,
      text,
      name,
      checkBox,
      categoriesFilter,
      ...rest
    } = this.props;
    return (
      <React.Fragment>
        {checkBox
          ? this.renderCheckBox()
          : tagScroll
            ? this.renderTagScrool()
            : categoriesFilter
              ? this.renderCategoriesFilterScroll()
              : this.renderDefault()}
      </React.Fragment>
    );
  }
}
