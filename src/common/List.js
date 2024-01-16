import { t } from 'i18next';
import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, View as NativeView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import {
  backgroundColorStyles,
  BasePropTypes,
  borderStyles,
  dimensionsStyles,
} from './Base';
import Network from './Base/Network';
import Button from './Button';
import Indicator from './Indicator';
import Text from './Text';
import { getTheme } from './Theme';
import { getThemeColor } from './utils/colors';
import View from './View';

class List extends Network {
  static propTypes = {
    ...BasePropTypes,
    ...Network.propTypes,
    columns: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.object || PropTypes.string),
    noResultsLabel: PropTypes.string,
    rowRenderer: PropTypes.func,
    rowHeight: PropTypes.number,
    indicatorColor: PropTypes.string,
    errorLabelColor: PropTypes.string,
    noResultsLabelColor: PropTypes.string,
    retryButtoncolor: PropTypes.string,
    retryButtonBackgroundColor: PropTypes.string,
    showsHorizontalScrollIndicator: PropTypes.bool,
  };

  static defaultProps = {
    ...Network.defaultProps,
    ...getTheme().list,
    columns: 1,
    data: [],
    rowHeight: 20,
  };

  constructor(props) {
    super(props);
    this.flatListRef = React.createRef();
    this.mainIndicator = 'loading';

    this.state = {
      ...super.state,
      firstFetchDone: !props.apiRequest && !props.firebaseRequest,
      refreshing: false,
      loading: false,
      dataProvider: {_data: props.data},
      errorLabel: '',
    };
  }

  componentDidMount() {
    super.componentDidMount();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    super.UNSAFE_componentWillReceiveProps(nextProps);

    if (nextProps.refreshControl !== this.props.refreshControl) {
      if (this.state.loading) {
        return;
      }
      this.reload();
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  setStartFetching() {
    this.setState({
      errorLabel: '',
    });
  }

  setData = (data, cb) => {
    this.setState(
      {
        firstFetchDone: true,
        dataProvider: {_data: data},
      },
      cb,
    );
  };

  setError = errorLabel => {
    this.setState({
      firstFetchDone: true,
      errorLabel,
    });
  };

  setEndFetching = () => {
    this.setState({
      refreshing: false,
      loading: false,
    });
  };

  addItemToList = item => {
    const {_data} = this.state.dataProvider;

    const newData = [..._data, item];

    this.setData(newData);
  };

  removeItemFromList = id => {
    const {_data} = this.state.dataProvider;

    const index = _data.findIndex(
      item => Object.getDeepProp(item, this.props.idPathInData || 'id') === id,
    );

    const newData = [..._data.slice(0, index), ..._data.slice(index + 1)];

    this.setData(newData);
  };

  updateItemInList = (id, changedData, changedDataCB = () => ({})) => {
    const {_data} = this.state.dataProvider;

    const index = _data.findIndex(
      item => Object.getDeepProp(item, this.props.idPathInData || 'id') === id,
    );

    _data[index] = {
      ..._data[index],
      ...changedData,
      ...changedDataCB(_data[index]),
    };
    this.setData(_data);
  };

  handleParentViewLayout = e => {
    if (this.state.layoutReady) return;

    if (this.props.flatlist) {
      this.setState({
        layoutReady: true,
      });
    } else {
      const {width} = e.nativeEvent.layout;

      if (width < 1) return;

      this.setState({
        layoutReady: true,
      });
    }
  };

  renderFooter = () => {
    if (this.state.refreshing) {
      return null;
    }

    if (this.state.loading || !this.state.firstFetchDone) {
      return (
        <View
          centerX
          padding={5}
          width={(this.props.horizontal || this.props.columns > 1) && 100}>
          <Indicator color={this.props.indicatorColor} size={12} />
        </View>
      );
    }

    if (this.state.errorLabel) {
      return (
        <View
          centerX
          padding={10}
          style={{
            transform: [
              {
                scaleX:
                  (this.props.horizontal && this.props.rtl) ||
                  (this.props.columns > 1 && this.props.rtl)
                    ? -1
                    : 1,
              },
            ],
          }}>
          <Text size={7} center color={this.props.errorLabelColor}>
            {this.state.errorLabel}
          </Text>
          <Button
            title={t('ui-retry')}
            stretch
            backgroundColor={this.props.retryButtonBackgroundColor}
            color={this.props.retryButtoncolor}
            marginVertical={8}
            onPress={() => {
              this.setState({
                errorLabel: '',
              });
              this.reload();
            }}
            processing={this.state.refreshing}
            size={7}
            paddingHorizontal={10}
          />
        </View>
      );
    }

    if (this.state.dataProvider._data.length === 0) {
      if (this.props.noResultsComponent) {
        return React.cloneElement(this.props.noResultsComponent);
      }
      return (
        <View
          centerX
          padding={15}
          style={{
            transform: [
              {
                scaleX:
                  (this.props.horizontal && this.props.rtl) ||
                  (this.props.columns > 1 && this.props.rtl)
                    ? -1
                    : 1,
              },
            ],
          }}>
          <Text center color={this.props.noResultsLabelColor}>
            {this.props.noResultsLabel || t('ui-noResultsFound')}
          </Text>
        </View>
      );
    }

    return null;
  };

  scrollToIndex = index => {
    this.flatListRef.current.scrollToIndex({index: index, animated: true});
  };

  renderFlatList = () => (
    <FlatList
      ref={this.flatListRef}
      numColumns={this.props.columns}
      horizontal={this.props.horizontal}
      showsHorizontalScrollIndicator={this.props.showsHorizontalScrollIndicator}
      showsVerticalScrollIndicator={this.props.showsVerticalScrollIndicator}
      contentContainerStyle={
        this.props.columns > 1
          ? {
              // flex: 1,
              // flexDirection: this.props.rtl ? 'row-reverse' : 'row',
              // flexWrap: 'wrap',
              // alignItems: 'flex-start',
              transform: this.props.rtl ? [{scaleX: -1}] : [],
              justifyContent: this.state.loading ? 'center' : 'space-between',
            }
          : {}
      }
      data={this.state.dataProvider._data}
      keyExtractor={(item, index) => String(index)}
      renderItem={({item, index}) =>
        React.cloneElement(this.props.rowRenderer(item, index), {
          addItemToList: this.addItemToList,
          updateItemInList: this.updateItemInList,
          removeItemFromList: this.removeItemFromList,
        })
      }
      onScroll={this.props.onScroll}
      onEndReachedThreshold={0.2}
      onEndReached={() => {
        if (this.page < this.pageCount && !this.state.loading) {
          this.page++;
          this.fetch('loading');
        }
      }}
      ListFooterComponent={this.renderFooter}
      refreshing={this.props.refreshControl}
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={() => {
            if (this.props.onRefresh) {
              this.props.onRefresh();
            }
            // this.reload();
            this.fetch('refreshing', true);
          }}
          colors={[getThemeColor(this.props.indicatorColor)]}
          tintColor={getThemeColor(this.props.indicatorColor)}
        />
      }
    />
  );

  render() {
    return (
      <NativeView
        style={[
          dimensionsStyles(this.props),
          backgroundColorStyles(this.props),
          {
            alignSelf: 'stretch',
            flex: this.props.height ? undefined : 1,
            transform:
              (this.props.horizontal && this.props.rtl) ||
              (this.props.columns > 1 && this.props.rtl)
                ? [{scaleX: 1}]
                : [],
          },
          borderStyles(this.props),
        ]}
        onLayout={this.handleParentViewLayout}>
        {this.renderFlatList()}
      </NativeView>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

// export default connect(mapStateToProps)(List);
export default connect(mapStateToProps, null, null, {forwardRef: true})(List);
