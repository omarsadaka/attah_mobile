/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, StyleSheet, Picker as NPicker} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {BasePropTypes, paddingStyles} from './Base';
import Network from './Base/Network';
import View from './View';
import ScrollView from './ScrollView';
import Text from './Text';
import Icon from './Icon';
import Input from './Input';
import Indicator from './Indicator';
import InputError from './micro/InputError';
import {getTheme} from './Theme';
import {moderateScale, responsiveHeight} from './utils/responsiveDimensions';
import i18next from 'i18next';
import Image from './Image';

const styles = StyleSheet.create({
  modalReset: {
    padding: 0,
    margin: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
// TODO add dropdown menu option
// TODO customize dialog modal
// TODO refactoring insurance
class Picker extends Network {
  static propTypes = {
    ...BasePropTypes,
    ...Network.propTypes,
    name: PropTypes.string,
    onChange: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.object),
    placeholder: PropTypes.string,
    leftItems: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
    rightItems: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
    farArrow: PropTypes.bool,
    error: PropTypes.string,
    noValidation: PropTypes.bool,
    setInitialValueAfterFetch: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
      PropTypes.string,
    ]),
  };
  static defaultProps = {
    ...Network.defaultProps,
    ...getTheme().picker,
    paging: false,
    data: [],
    leftItems: [],
    rightItems: [],
  };
  constructor(props) {
    super(props);
    // const obj = props.initialValue
    //   ? props.data.find(i => i.value === props.initialValue)
    //   : null;
    // const label = obj ? obj.label : props.placeholder;
    this.mainIndicator = 'loading';
    this.state = {
      label: this.props.placeholder ? this.props.placeholder : null,
      visible: false,
      data: this.props.data,
      loading: false,
      networkError: false,
      filterText: '',
    };
  }
  async componentDidMount() {
    if (this.props.noApi) {
      const {setInitialValueAfterFetch, onChange, name, data} = this.props;
      if (setInitialValueAfterFetch) {
        let label = data.length ? data[0].label : this.state.label;
        let {value} = data[0];
        if (typeof setInitialValueAfterFetch === 'number') {
          if (this.props.isObject) {
            const target = data.find(
              item => item.value.id === setInitialValueAfterFetch,
            );
            if (target) {
              label = target.label;
              value = target.value;
            }
          } else {
            const target = data.find(
              item => item.value === setInitialValueAfterFetch,
            );
            if (target) {
              label = target.label;
              value = target.value;
            }
          }
        } else if (typeof setInitialValueAfterFetch === 'string') {
          if (this.props.isObject) {
            const target = data.find(
              item => item.value.id === setInitialValueAfterFetch,
            );
            if (target) {
              label = target.label;
              value = target.value;
            }
          } else {
            const target = data.find(
              item => item.value === setInitialValueAfterFetch,
            );
            if (target) {
              label = target.label;
              value = target.value;
            }
          }
        }
        this.setState(prevState => ({
          label,
        }));
        if (onChange) {
          if (name) onChange(name, value);
          else onChange(value);
        }
      }
    }
    super.componentDidMount();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.isinMap) {
      this.setState({
        label: nextProps.placeholder,
      });
    }
    super.componentWillReceiveProps(nextProps, () => {
      this.setState({
        label: this.props.placeholder,
      });
      if (this.props.onChange && this.props.name) {
        this.props.onChange(this.props.name, undefined, true);
      }
    });
  }
  componentWillUnmount() {
    super.componentWillUnmount();
  }
  setStartFetching() {
    this.setState({
      networkError: false,
    });
  }
  setData = (data, cb) => {
    this.setState({data}, cb);
  };
  setError = errorLabel => {
    this.setState({
      networkError: true,
    });
  };
  setEndFetching(data) {
    const {setInitialValueAfterFetch, onChange, name} = this.props;
    if (setInitialValueAfterFetch) {
      let label = data.length ? data[0].label : this.state.label;
      let {value} = data[0];
      if (typeof setInitialValueAfterFetch === 'number') {
        if (this.props.isObject) {
          const target = data.find(
            item => item.value.id === setInitialValueAfterFetch,
          );
          if (target) {
            label = target.label;
            value = target.value;
          }
        } else {
          const target = data.find(
            item => item.value === setInitialValueAfterFetch,
          );
          if (target) {
            label = target.label;
            value = target.value;
          }
        }
      } else if (typeof setInitialValueAfterFetch === 'string') {
        if (this.props.isObject) {
          const target = data.find(
            item => item.value.id === setInitialValueAfterFetch,
          );
          if (target) {
            label = target.label;
            value = target.value;
          }
        } else {
          const target = data.find(
            item => item.value === setInitialValueAfterFetch,
          );
          if (target) {
            label = target.label;
            value = target.value;
          }
        }
      }
      this.setState(prevState => ({
        label,
      }));
      if (onChange) {
        if (name) onChange(name, value);
        else onChange(value);
      }
    }
  }
  renderItems = items => {
    const {size, color} = this.props;
    const nodes = items.map(item => {
      if (
        item.type.WrappedComponent &&
        (item.type.WrappedComponent.displayName === 'Button' ||
          item.type.WrappedComponent.displayName === 'Icon')
      ) {
        return React.cloneElement(item, {
          key: String(Math.random()),
          flat: true,
          stretch: true,
          color: item.props.color || color,
          size: item.props.size || size * 1.5,
          backgroundColor: 'transparent',
          ph: item.props.ph || size / 1.5,
          pv: 0,
        });
      }
      return React.cloneElement(item, {
        key: String(Math.random()),
      });
    });
    return nodes;
  };
  setting() {}
  render() {
    const monthsPicker = [
      {label: i18next.t('1'), value: '1'},
      {label: i18next.t('2'), value: '2'},
      {label: i18next.t('3'), value: '3'},
      {label: i18next.t('4'), value: '4'},
      {label: i18next.t('5'), value: '5'},
      {label: i18next.t('6'), value: '6'},
      {label: i18next.t('7'), value: '7'},
      {label: i18next.t('8'), value: '8'},
      {label: i18next.t('9'), value: '9'},
      {label: i18next.t('10'), value: '10'},
      {label: i18next.t('11'), value: '11'},
      {label: i18next.t('12'), value: '12'},
    ];
    const {
      rtl,
      size,
      color,
      backgroundColor,
      width,
      height,
      borderRadius,
      center,
      farArrow,
      error,
      flex,
      elevation,
      onChange,
      name,
      months,
      noValidation,
      m,
      mh,
      mv,
      mt,
      mb,
      ml,
      mr,
      bw,
      btw,
      bbw,
      blw,
      brw,
      bc,
      btc,
      bbc,
      blc,
      brc,
      pv,
      pb,
      pt,
      ph,
      useNative,
      tansparent,
      colorfarArrow,
      placeholderColor,
      modal,
      customArrow,
    } = this.props;
    let {leftItems, rightItems} = this.props;
    if (months && this.state.data.length === 0) {
      this.setState({data: monthsPicker});
    }
    if (leftItems && !leftItems.map) leftItems = [leftItems];
    if (rightItems && !rightItems.map) rightItems = [rightItems];

    return (
      <View
        stretch
        flex={flex}
        m={m}
        mh={mh}
        mv={mv}
        mt={mt}
        mb={mb}
        ml={ml}
        mr={mr}
        pv={pv ? pv : undefined}
        width={width}>
        {!useNative ? (
          <React.Fragment>
            <View
              stretch
              row
              height={height}
              backgroundColor={backgroundColor}
              borderRadius={borderRadius}
              elevation={elevation}
              bw={bw}
              btw={btw}
              bbw={bbw}
              blw={blw}
              brw={brw}
              bc={bc}
              btc={btc}
              bbc={bbc}
              blc={blc}
              brc={brc}>
              {tansparent && (
                <View
                  backgroundColor={'black'}
                  style={{
                    opacity: 0.3,
                    zIndex: -1,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                  }}
                />
              )}
              {leftItems.length ? this.renderItems(leftItems) : null}
              <View
                touchableOpacity
                spaceBetween
                row
                onPress={() => {
                  this.setting();
                  if (this.state.loading || this.state.networkError) {
                    return;
                  }
                  if (this.props.changeState) {
                    this.props.changeState(false);
                  }
                  this.setState({
                    visible: true,
                    filterText: '',
                  });
                }}
                style={[
                  {
                    flexDirection: rtl ? 'row-reverse' : 'row',
                    alignItems: 'center',
                    justifyContent:
                      this.state.loading || this.state.networkError
                        ? 'center'
                        : farArrow
                        ? 'space-between'
                        : center
                        ? 'center'
                        : 'flex-start',
                    flex: 1,
                    alignSelf: 'stretch',
                    padding: 0,
                  },
                ]}>
                {this.state.loading ? (
                  <Indicator size={size} />
                ) : this.state.networkError ? (
                  <Text size={size}>{i18next.t('ui-error')}</Text>
                ) : (
                  <React.Fragment>
                    <View stretch row spaceBetween flex>
                      <Text
                        color={
                          this.props.placeholder === this.state.label
                            ? placeholderColor
                            : color
                        }
                        size={size}
                        mh={3}>
                        {this.state.label}
                      </Text>
                      {!customArrow ? (
                        <Icon
                          name="keyboard-arrow-down"
                          type="MaterialIcons"
                          size={size * 1.3}
                          color={
                            this.props.placeholder === this.state.label
                              ? placeholderColor
                              : color
                          }
                          mr={2}
                        />
                      ) : (
                        customArrow
                      )}
                    </View>
                  </React.Fragment>
                )}
              </View>
              {rightItems.length ? this.renderItems(rightItems) : null}
            </View>
            {!noValidation && error ? (
              <InputError error={error} size={size} />
            ) : null}
            <Modal
              isVisible={this.state.visible}
              transparent
              onRequestClose={() => {
                this.setState({
                  visible: false,
                });
                if (this.props.changeState) {
                  this.props.changeState(true);
                }
              }}
              style={styles.modalReset}
              useNativeDriver
              onBackdropPress={() => this.setState({visible: false})}
              onBackButtonPress={() => this.setState({visible: false})}>
              <View
                backgroundColor="white"
                width={85}
                height={this.props.fewData ? 15 : 50}
                borderRadius={4}
                center
                elevation={4}
                style={{
                  marginTop: responsiveHeight(4),
                }}>
                {this.props.showSearchFilter ? (
                  <Input
                    stretch
                    backgroundColor="#F9F9F9"
                    borderRadius={0}
                    height={8}
                    color={'gray'}
                    size={7}
                    placeholder={i18next.t('ui-search-dots')}
                    onChange={text => {
                      this.setState({
                        filterText: text,
                      });
                    }}
                  />
                ) : null}
                <ScrollView stretch>
                  {this.state.data
                    .filter(item =>
                      this.state.filterText
                        ? item.label.startsWith(this.state.filterText)
                        : true,
                    )
                    .map((item, index) => (
                      <TouchableOpacity
                        key={String(item.id)}
                        style={{
                          alignSelf: 'stretch',
                          paddingVertical: moderateScale(5),
                          paddingHorizontal: moderateScale(5),
                          // borderTopColor: 'gray',
                          // borderTopWidth: index !== 0 ? 0.5 : 0,
                        }}
                        onPress={() => {
                          this.setState({
                            visible: false,
                            label: item.label
                              ? item.label
                              : item?.name
                              ? item?.name
                              : item.translations
                              ? rtl
                                ? item.translations[0].name
                                : item.translations[0].name
                              : null,
                          });
                          if (this.props.changeState) {
                            this.props.changeState(true);
                          }
                          if (onChange) {
                            if (name)
                              onChange(
                                item?.name?.name,
                                this.props.valKey
                                  ? item[this.props.valKey]
                                  : item,
                              );
                            else onChange(item);
                          }
                        }}>
                        <View stretch row>
                          {item.image ? (
                            <Image
                              source={item.image}
                              height={5}
                              width={10}
                              mh={3}
                              resizeMode={'contain'}
                            />
                          ) : null}
                          <Text color={'gray'} size={size}>
                            {item.label
                              ? item.label
                              : item?.name
                              ? item?.name
                              : item.translations
                              ? this.props.rtl
                                ? item.translations[0].name
                                : item.translations[0].name
                              : item.slug
                              ? item.slug
                              : null}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              </View>
            </Modal>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <View
              stretch
              row
              height={height}
              backgroundColor={backgroundColor}
              borderRadius={borderRadius}
              elevation={elevation}
              bw={bw}
              btw={btw}
              bbw={bbw}
              blw={blw}
              brw={brw}
              bc={bc}
              btc={btc}
              bbc={bbc}
              blc={blc}
              brc={brc}>
              {tansparent && (
                <View
                  backgroundColor={'black'}
                  style={{
                    opacity: 0.3,
                    zIndex: -1,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                  }}
                />
              )}
              {this.state.loading ? (
                <View flex centerX centerY>
                  <Indicator size={size} />
                </View>
              ) : this.state.networkError ? (
                <Text stretch center size={size}>
                  {'ui-errora'}
                </Text>
              ) : (
                <NPicker
                  mode="dialog"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{width: '100%', color: 'gray'}}
                  placeholder={this.props.placeholder}
                  placeholderStyle={{color: '#4c4c4c'}}
                  //placeholderIconColor=""
                  itemStyle={{
                    color: 'red',
                    textAlign: 'center',
                    backgroundColor: 'red',
                  }}
                  itemTextStyle={{
                    textAlign: 'center',
                    color: 'gray',
                    backgroundColor: 'red',
                  }}
                  selectedValue={this.state.label}
                  onValueChange={value => {
                    if (onChange) {
                      onChange(value);
                      this.setState({label: value});
                    }
                  }}>
                  {this.state.data.map((item, index) => (
                    <NPicker.Item
                      label={item.label}
                      value={item.value}
                      key={index}
                    />
                  ))}
                </NPicker>
              )}
            </View>
            {!noValidation && error ? (
              <InputError error={error} size={size} />
            ) : null}
          </React.Fragment>
        )}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});
export default connect(mapStateToProps)(Picker);
