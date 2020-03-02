import React from 'react';
import {
  Text,
  Dimensions,
  ToastAndroid,
  ImageBackground,
  StyleSheet,
  Platform,
  View,
  Image
} from 'react-native';
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Thumbnail,
  ListItem,
  Icon,
  Body,
  Right,
  Fab,
  Separator,
  List,
  Left,
  CardItem,
  Card
} from 'native-base';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Axios from 'axios';
import { API_HOST } from 'react-native-dotenv';

//import BottomModal from '../../Components/BottomModal';
import Modal, {
  ModalContent,
  ModalFooter,
  ModalButton,
  ModalTitle
} from 'react-native-modals';
import qs from 'qs';

class Cod extends React.Component {
  state = {
    showCheckoutResult: false
  };

  handleCheckout() {
    this.setState({ showCheckoutResult: true });
    const body = { orderItems: [] };
    body.orderItems = this.props.cartData.items.map(item => ({
      product_id: item.id,
      qty: item.qty
    }));
    Axios.post(`${API_HOST}/orders`, qs.stringify(body), {
      headers: { Authorization: this.props.authData.token }
    })
      .then(response => {
        ToastAndroid.show('Order place succesfully', ToastAndroid.LONG);
        this.setState({ showCheckoutResult: true });
        this.props.cartAction.clearItems();
      })
      .catch(error => {
        let messages = [];
        if (error.response.data && error.response.data.errors) {
          messages = error.response.data.errors.map(e => '- ' + e.message);
        }

        if (messages.length) {
          ToastAndroid.show(
            'Error creating profile. Reasons:\n' + messages.join('\n'),
            ToastAndroid.LONG
          );
        } else {
          ToastAndroid.show(
            'Error creating profile. Try again later.',
            ToastAndroid.LONG
          );
        }
      });
  }
  render() {
    return (
      <Container>
        <Content style={{ padding: 16 }}>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Body>
                <Text>
                  Your product is ready! Click button below to proceed.
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Button
                onPress={() => this.handleCheckout()}
                style={{
                  flex: 1,
                  justifyContent: 'center'
                }}>
                <Text style={{ textAlign: 'center' }}>Checkout</Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
        {/* Place order result */}
        <Modal.BottomModal
          modalTitle={<ModalTitle title="Checkout success" />}
          onSwipeOut={() => this.setState({ showCheckoutResult: false })}
          visible={this.state.showCheckoutResult}
          width={0.6}
          footer={
            <ModalFooter>
              <ModalButton
                text="Buy Again"
                onPress={() => {
                  this.setState({ showCheckoutResult: false });
                  this.props.navigation.navigate('Home');
                }}
              />
              <ModalButton
                text="See My Orders"
                onPress={() => {
                  this.setState({ showCheckoutResult: false });
                  this.props.navigation.navigate('Cart');
                }}
              />
            </ModalFooter>
          }>
          <ModalContent
            style={{
              alignItems: 'center'
            }}>
            <View
              style={{
                justifyContent: 'center',
                padding: 10
              }}>
              <Image
                source={require('../../Public/assets/images/order-success.png')}
              />
            </View>
          </ModalContent>
        </Modal.BottomModal>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  authData: state.auth,
  productData: state.product,
  cartData: state.cart,
  categoryData: state.category
});

const mapDispatchToProps = dispatch => ({
  authAction: {
    updateProfile: (token, id, data) => {
      const formData = new FormData();
      Object.keys(data).map(key => {
        formData.append(key, data[key]);
      });
      const payload = Axios.put(`${API_HOST}/users/${id}`, formData, {
        headers: { Authorization: token, 'Content-Type': 'multipart/form-data' }
      });
      dispatch({ type: 'AUTH_UPDATE_PROFILE', payload });
    }
  },
  cartAction: {
    clearItems: () => {
      dispatch({ type: 'CART_CLEAR_ITEMS' });
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cod);
