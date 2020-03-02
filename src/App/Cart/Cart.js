import React from 'react';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Icon,
  Right,
  Body,
  Separator,
  ListItem,
  Footer,
  Button,
  Fab,
  List,
  Text
} from 'native-base';
import { Image, View } from 'react-native';
import CartItem from './CartItem';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import Modal, {
  ModalContent,
  ModalFooter,
  ModalButton,
  ModalTitle
} from 'react-native-modals';

class Cart extends React.Component {
  state = {
    subtotal: 0,
    tax: 0,
    total: 0
  };

  renderEmptyCart() {
    return (
      <Content
        style={{
          flexDirection: 'column',
          flexShrink: 0,
          overflow: 'visible'
        }}>
        <View
          style={{
            flexDirection: 'column',
            height: '100%'
          }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain'
            }}
            source={require('../../Public/assets/images/empty-cart.gif')}
          />
        </View>
      </Content>
    );
  }
  renderCartItems() {
    this.subtotal = this.props.cartData.items.reduce(
      (total, item) => total + item.qty * item.price,
      0
    );

    this.tax = this.subtotal * 0.1;
    this.total = this.subtotal + this.tax;
    return (
      <Content
        style={{
          flexGrow: 1
        }}>
        <View>
          {this.props.cartData.items.map(item => (
            <CartItem {...this.props} target={item} />
          ))}
        </View>
      </Content>
    );
  }
  render() {
    return (
      <Container style={{ flexDirection: 'column' }}>
        {this.props.cartData.items.length
          ? this.renderCartItems()
          : this.renderEmptyCart()}

        {this.props.cartData.items.length ? (
          <Content
            style={{
              flex: 0,
              flexGrow: 0,
              borderTopColor: '#ddd',
              borderTopWidth: 1
            }}>
            <Separator bordered />
            <List>
              <ListItem noIndent>
                <Body>
                  <Text>Subotal</Text>
                </Body>
                <Right>
                  <NumberFormat
                    value={this.subtotal}
                    thousandSeparator="."
                    decimalSeparator=","
                    displayType={'text'}
                    prefix={'Rp'}
                    renderText={value => <Text>{value}</Text>}
                  />
                </Right>
              </ListItem>
              <ListItem noIndent>
                <Body>
                  <Text>Tax 10%</Text>
                </Body>
                <Right>
                  <NumberFormat
                    value={this.tax}
                    thousandSeparator="."
                    decimalSeparator=","
                    displayType={'text'}
                    prefix={'Rp'}
                    renderText={value => <Text>{value}</Text>}
                  />
                </Right>
              </ListItem>
              <ListItem noIndent>
                <Body>
                  <Text>Total</Text>
                </Body>
                <Right>
                  <NumberFormat
                    value={this.total}
                    thousandSeparator="."
                    decimalSeparator=","
                    displayType={'text'}
                    prefix={'Rp'}
                    renderText={value => <Text>{value}</Text>}
                  />
                </Right>
              </ListItem>
            </List>
            <Button
              style={{ flex: 1 }}
              full
              primary
              onPress={() => this.props.navigation.navigate('Checkout')}>
              <Text>Checkout</Text>
            </Button>
          </Content>
        ) : null}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  authData: state.auth,
  productData: state.product,
  cartData: state.cart
});

const mapDispatchToProps = dispatch => ({
  cartAction: {
    addItem: item => dispatch({ type: 'CART_ADD_ITEM', item }),
    removeItem: id => dispatch({ type: 'CART_REMOVE_ITEM', id }),
    increaseItem: id => dispatch({ type: 'CART_INCREASE_ITEM', id }),
    decreaseItem: id => dispatch({ type: 'CART_DECREASE_ITEM', id })
  },
  productAction: {
    setItems: items => dispatch({ type: 'PRODUCT_SET_ITEMS', items })
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
