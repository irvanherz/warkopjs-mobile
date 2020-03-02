import React from 'react';
import NumberFormat from 'react-number-format';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {
  Card,
  CardItem,
  Container,
  Item,
  Input,
  Body,
  Icon,
  Button,
  Spinner,
  Badge,
  ActionSheet,
  Right,
  Header,
  Left
} from 'native-base';
import { connect } from 'react-redux';
import Axios from 'axios';
import SortModal from './SortModal';
import FilterModal from './FilterModal';
import SearchModal from './SearchModal';
import HeaderMenu from './Header';
import { API_HOST } from 'react-native-dotenv';

class Home extends React.Component {
  state = {
    showSortModal: false,
    showFilterModal: false
  };

  reloadProducts = () => {
    let params = this.props.productData.params;
    this.props.productAction.saveParams(params);
    this.props.productAction.reload(this.props.authData.token, params);
  };

  loadMoreProducts = () => {
    let params = this.props.productData.params;
    if (!params.page) {
      params.page = 1;
    }
    if (params.page < this.props.productData.totalPages) {
      params.page++;
      this.props.productAction.saveParams(params);
      this.props.productAction.loadMore(this.props.authData.token, params);
    }
  };

  componentDidMount() {
    this.reloadProducts();
    this.props.productAction.reloadCategories(this.props.authData.token);
  }
  handleLogout = () => {
    this.props.authAction.unsetLoginData();
    this.props.navigation.navigate('Auth');
  };

  handleProfile = () => {
    this.props.navigation.navigate('Profile');
  };

  isOnCart = id => {
    return this.props.cartData.items.some(current => current.id === id);
  };

  countCartItems = () => {
    return this.props.cartData.items.reduce(
      (acc, current) => acc + current.qty,
      0
    );
  };

  handleAddToCart = item => {
    if (this.isOnCart(item.id)) {
      this.props.cartAction.removeItem(item.id);
    } else {
      this.props.cartAction.addItem(item);
    }
  };
  render() {
    return (
      <Container style={styles.container}>
        <HeaderMenu {...this.props} />
        <FlatList
          numColumns={2}
          data={this.props.productData.items}
          keyExtractor={item => item.id}
          style={{ padding: 8 }}
          ListEmptyComponent={
            <Image
              source={require('../../Public/assets/images/no-result.gif')}
              style={{ width: '100%', resizeMode: 'center' }}
            />
          }
          ListFooterComponent={
            this.props.productData.isLoading ? <Spinner color="blue" /> : null
          }
          onEndReached={() => {
            this.loadMoreProducts();
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => this.handleAddToCart(item)}
                style={styles.productCard}>
                <Card style={{ borderRadius: 8, overflow: 'hidden' }}>
                  <CardItem cardBody>
                    <ImageBackground
                      source={
                        item.image !== ''
                          ? {
                              uri: item.image
                            }
                          : require('../../Public/assets/images/no-image-available.jpg')
                      }
                      style={{ height: 200, width: '100%', flex: 1 }}>
                      {this.isOnCart(item.id) ? (
                        <View
                          style={{
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,  0, 0, 0.6)'
                          }}>
                          <Icon
                            name="check-circle"
                            type="MaterialIcons"
                            style={{ fontSize: 35, color: '#FFF' }}
                          />
                        </View>
                      ) : null}
                    </ImageBackground>
                  </CardItem>
                  <CardItem
                    style={{
                      paddingTop: 8,
                      paddingBottom: 8
                    }}>
                    <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                  </CardItem>
                  <CardItem style={{ paddingTop: 0 }}>
                    <NumberFormat
                      value={item.price}
                      thousandSeparator="."
                      decimalSeparator=","
                      displayType={'text'}
                      prefix={'Rp'}
                      renderText={value => <Text>{value}</Text>}
                    />
                  </CardItem>
                </Card>
              </TouchableOpacity>
            );
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 16,
            width: 200,
            transform: [{ translateX: -100 }],
            borderRadius: 32,
            overflow: 'hidden',
            backgroundColor: '#FFF',
            elevation: 2
          }}>
          <View
            style={{
              flexDirection: 'row'
            }}>
            <Button
              transparent
              full
              first
              style={{
                flex: 1,
                borderRightWidth: 1,
                borderColor: '#ddd'
              }}
              onPress={() => this.setState({ showSortModal: true })}>
              <Icon name="sort" type="FontAwesome" />
            </Button>
            <Button
              transparent
              full
              last
              style={{ flex: 1 }}
              onPress={() => this.setState({ showFilterModal: true })}>
              <Icon name="filter" type="FontAwesome" />
            </Button>
          </View>
        </View>
        <SortModal
          visible={this.state.showSortModal}
          onRequestClose={() => this.setState({ showSortModal: false })}
          {...this.props}
        />
        <FilterModal
          visible={this.state.showFilterModal}
          onRequestClose={() => this.setState({ showFilterModal: false })}
          {...this.props}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%'
  },
  header: { borderBottomColor: '#bbb', borderBottomWidth: 1 },
  leftHeader: { flex: 0 },
  searchBody: {
    alignItems: 'stretch',
    flexDirection: 'row'
  },
  searchItem: { borderColor: '#FFF' },
  rightHeader: { flex: 0 },
  productCard: {
    borderRadius: 8,
    flex: 0.5,
    justifyContent: 'space-between',
    alignContent: 'stretch'
  },
  dotBadge: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'red',
    width: 10,
    height: 10,
    borderRadius: 32
  }
});

const mapStateToProps = state => ({
  authData: state.auth,
  productData: state.product,
  cartData: state.cart,
  categoryData: state.category
});

const mapDispatchToProps = dispatch => ({
  cartAction: {
    addItem: item => dispatch({ type: 'CART_ADD_ITEM', item }),
    removeItem: id => dispatch({ type: 'CART_REMOVE_ITEM', id })
  },
  productAction: {
    setItems: items => dispatch({ type: 'PRODUCT_SET_ITEMS', items }),
    saveParams: params => dispatch({ type: 'PRODUCT_SAVE_PARAMS', params }),
    reloadCategories: token => {
      const payload = Axios.get(`${API_HOST}/categories`, {
        headers: { Authorization: token },
        params: { itemsPerPage: 100 }
      });
      dispatch({ type: 'PRODUCT_RELOAD_CATEGORIES', payload });
    },
    reload: (token, params = {}) => {
      if (params.page) {
        delete params.page;
      }
      const payload = Axios.get(`${API_HOST}/products`, {
        headers: { Authorization: token },
        params
      });
      dispatch({ type: 'PRODUCT_RELOAD', payload });
    },
    loadMore: (token, params = {}) => {
      const payload = Axios.get(`${API_HOST}/products`, {
        headers: { Authorization: token },
        params
      });
      dispatch({ type: 'PRODUCT_LOAD_MORE', payload });
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
