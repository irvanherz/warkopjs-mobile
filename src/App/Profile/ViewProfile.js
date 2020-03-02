import React from 'react';
import { Text, ScrollView, Dimensions } from 'react-native';
import {
  Container,
  Content,
  Item,
  Input,
  Thumbnail,
  ListItem,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Switch,
  Fab
} from 'native-base';
import { connect } from 'react-redux';
import { ImageBackground, StyleSheet } from 'react-native';
import Axios from 'axios';
import { API_HOST } from 'react-native-dotenv';

class Profile extends React.Component {
  render() {
    return (
      <Container>
        <ImageBackground
          source={require('../../Public/assets/images/cover.jpg')}
          style={styles.cover}>
          <Thumbnail
            style={{ borderColor: '#FFF', borderWidth: 2, elevation: 5 }}
            source={require('../../Public/assets/images/cover.jpg')}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              color: '#FFF',
              marginVertical: 8,
              marginHorizontal: 100,
              textAlign: 'center'
            }}>
            {this.props.authData.name}
          </Text>
        </ImageBackground>
        <Content>
          <ListItem>
            <Body>
              <Text>Name</Text>
              <Text note numberOfLines={1}>
                {this.props.authData.name}
              </Text>
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Text>Username</Text>
              <Text note numberOfLines={1}>
                {this.props.authData.username}
              </Text>
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Text>Password</Text>
              <Text note numberOfLines={1}>
                ********
              </Text>
            </Body>
            <Right>
              <Button transparent>
                <Text>Change</Text>
              </Button>
            </Right>
          </ListItem>
        </Content>
        <Fab
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate('EditProfile')}>
          <Icon name="edit" type="MaterialIcons" />
        </Fab>
      </Container>
    );
  }
}
const dimension = Dimensions.get('window');
const styles = StyleSheet.create({
  cover: {
    width: dimension.width,
    height: dimension.width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
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
)(Profile);
