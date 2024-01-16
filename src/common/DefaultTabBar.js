import React, { Component } from 'react';
import { Animated, FlatList } from 'react-native';
import { connect } from 'react-redux';

import Icon from './Icon';
import Text from './Text';
import View from './View';

import { AppView } from '.';
import store from '../store/store';
import { getColors, getTheme } from './Theme';
import TouchableView from './TouchableView';
import colors from './defaults/colors';
import { moderateScale, responsiveHeight } from './utils/responsiveDimensions';
// import * as titleActions from '../actions/changeTitle';

class DefaultTabBar extends Component {
  flatListRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      activePage: 0,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('this.props.activePage ', this.props.activePage);
    console.log('nextProps.activePage ', nextProps.activePage);
    if (
      nextProps.activePage !== this.props.activePage &&
      this.props.scrollable
    ) {
      this.setState({activePage: nextProps.activePage});
      this.flatListRef.current.scrollToIndex({
        index: nextProps.activePage,
        animated: true,
      });
    }
  }

  static defaultProps = {
    ...getTheme().tabBar,
  };

  renderTab = (
    name,
    page,
    isActive,
    onPressHandler,
    icon,
    left,
    right,
    bgc,
    countNotification,
    index,
    customView,
  ) => {
    const {
      activeTextColor,
      activeTextSize,
      activeTextBold,
      inactiveTextColor,
      inactiveTextSize,
      inactiveTextBold,
    } = this.props;
    const textColor = isActive ? activeTextColor : inactiveTextColor;
    const textSize = isActive ? activeTextSize : inactiveTextSize;
    const textBold = isActive ? activeTextBold : inactiveTextBold;

    return (
      <TouchableView
        key={index}
        flex
        stretch
        centerX
        centerY
        onPress={() => {
          onPressHandler(page);
          this.setState({activePage: index});
        }}
        style={{backgroundColor: 'transparent'}}>
        {countNotification && countNotification > 0 ? (
          <View>
            <Text
              backgroundColor="red"
              centerX
              style={{
                textAlign: 'center',
                position: 'absolute',
                top: 5,
                zIndex: 30000,
              }}
              circleRadius={5}
              color="white"
              size={6}>
              {countNotification}
            </Text>
          </View>
        ) : null}
        {icon ? (
          <View stretch flex centerX centerY center>
            {customView ? (
              <View center backgroundColor="#FAFAFA" circleRadius={30}>
                <View
                  center
                  elevation={3}
                  bc={'white'}
                  bw={8}
                  circleRadius={18}
                  mt={-10}>
                  <View
                    circleRadius={15}
                    backgroundColor={getColors().secondary}
                    center>
                    <Icon
                      name={icon.name}
                      type={icon.type}
                      size={10}
                      color={'white'}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <React.Fragment>
                <Icon
                  name={icon.name}
                  type={icon.type}
                  size={10}
                  pv={0}
                  color={isActive ? '#009DCD' : '#A0A0A0'}
                />
                <Text size={5} color={'black'} pv={0}>
                  {name}
                </Text>
              </React.Fragment>
            )}
          </View>
        ) : (
          <Text
            style={{textAlign: 'center', alignSelf: 'center'}}
            size={textSize}
            p={0}
            color={textColor}>
            {name}
          </Text>
        )}
      </TouchableView>
    );
  };

  renderItem = (tab, index, activePage) => {
    var isTabActive = false;

    isTabActive = activePage === tab.page;

    return this.renderTabScroll(
      tab.label,
      tab.page,
      isTabActive,
      goToPage,
      tab.icon,
      tab.left,
      tab.right,
      'green',
      tab.countNotification,
      index,
      tab.customView,
    );
  };

  renderTabScroll = (
    name,
    page,
    isActive,
    onPressHandler,
    icon,
    left,
    right,
    bgc,
    countNotification,
    index,
    customView,
  ) => {
    const {
      activeTextColor,
      activeTextSize,
      activeTextBold,
      inactiveTextColor,
      inactiveTextSize,
      inactiveTextBold,
      reverse,
    } = this.props;
    const textColor = isActive ? activeTextColor : 'black';
    const textSize = isActive ? activeTextSize : inactiveTextSize;
    const textBold = isActive ? activeTextBold : inactiveTextBold;

    return (
      <TouchableView
        key={index}
        flex
        stretch
        centerX
        centerY
        paddingHorizontal={10}
        marginHorizontal={3}
        onPress={() => {
          onPressHandler(page);
          this.setState({activePage: index});
          console.log(
            '🚀 ~ file: DefaultTabBar.js:197 ~ DefaultTabBar ~ index:',
            index,
          );
          this.flatListRef.current.scrollToIndex({
            index: index,
            animated: true,
          });
        }}
        style={{
          backgroundColor: isActive ? colors.primary : 'white',
          borderRadius: 10,
          borderWidth:1,
          borderColor:'#66002521'
          // transform: [{scaleX: store.getState().lang.rtl ? 1 : 1}],
        }}>
        {
          <Text
            style={{
              textAlign: 'center',
              alignSelf: 'center',
              // transform: [{scaleX: reverse ? 1 : -1}],
            }}
            size={textSize}
            color={textColor}>
            {name}
          </Text>
        }
      </TouchableView>
    );
  };

  render() {
    const {
      bgc,
      containerWidth,
      tabs,
      backgroundColor,
      decision,
      height,
      moreHeight,
      activePage,
      goToPage,
      scrollValue,
      rtl,
      underlineColor,
      underlineHeight,
      showUnderLine,
      underLineColor,
      compact,
      fullUnderLine,
      scrollable,
    } = this.props;

    const numberOfTabs = tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      left: 0, // fullUnderLine ? undefined : !compact ? this.props.rtl ? (containerWidth / numberOfTabs) / 2 - ((containerWidth / numberOfTabs) / 4) / 2 : (containerWidth / numberOfTabs) / 2 - ((containerWidth / numberOfTabs) / 4) / 2 : undefined,
      right: 0, //fullUnderLine ? undefined : !compact ? this.props.rtl ? (containerWidth / numberOfTabs) / 2 - ((containerWidth / numberOfTabs) / 4) / 2 : undefined : undefined,
      width: fullUnderLine
        ? containerWidth / numberOfTabs
        : compact
        ? containerWidth / numberOfTabs - moderateScale(20)
        : containerWidth / numberOfTabs,
      height: 6,
      backgroundColor: underLineColor ? underLineColor : colors.foreground,
      bottom: 0,
    };
    const translateX = scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        0,
        !compact
          ? (containerWidth / numberOfTabs) * (rtl ? -1 : 1)
          : (containerWidth / numberOfTabs - moderateScale(20)) *
            (rtl ? -1 : 1),
      ],
    });
    const newHeight = moreHeight
      ? height + responsiveHeight(moreHeight)
      : height;
    return scrollable ? (
      <AppView stretch height={7} >
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={this.props.tabs}
          ref={this.flatListRef}
          renderItem={({item, index}) => {
            var isTabActive = false;

            isTabActive = activePage === item.page;

            return this.renderTabScroll(
              item.label,
              item.page,
              isTabActive,
              goToPage,
              item.icon,
              item.left,
              item.right,
              'green',
              item.countNotification,
              index,
              item.customView,
            );
          }}
          keyExtractor={item => item.page.toString()}
          inverted={store.getState().lang.rtl ? true : false}
        />

        {/* <ScrollView
          ref={this.flatListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            height: 10,
            width: '100%',
            transform: [{scaleX: store.getState().lang.rtl ? -1 : 1}],
          }}
          inverted={store.getState().lang.rtl ? true : false}>
          {tabs.map((tab, index) => {
            var isTabActive = false;
            if (decision) {
              isTabActive = this.state.activePage === tab.page;
            } else {
              isTabActive = activePage === tab.page;
            }
            return this.renderTabScroll(
              tab.label,
              tab.page,
              isTabActive,
              goToPage,
              tab.icon,
              tab.left,
              tab.right,
              bgc,
              tab.countNotification,
              index,
              tab.customView,
            );
          })}
        </ScrollView> */}
      </AppView>
    ) : (
      <View
        row
        height={7}
        backgroundColor={backgroundColor ? backgroundColor : 'transparent'}
        >
        {tabs.map((tab, index) => {
          var isTabActive = false;
          if (decision) {
            isTabActive = this.state.activePage === tab.page;
          } else {
            isTabActive = activePage === tab.page;
          }
          return this.renderTab(
            tab.label,
            tab.page,
            isTabActive,
            goToPage,
            tab.icon,
            tab.left,
            tab.right,
            bgc,
            tab.countNotification,
            index,
            tab.customView,
          );
        })}
        {showUnderLine ? (
          <Animated.View
            style={[
              tabUnderlineStyle,
              {
                transform: [{translateX}],
              },
              this.props.underlineStyle,
            ]}
          />
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(DefaultTabBar);
