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
  Left,
  ListItem,
  Thumbnail
} from 'native-base';
import { Text, TouchableOpacity, View } from 'react-native';
import NumberFormat from 'react-number-format';
import QuantityInput from './QuantityInput';

class CartItem extends React.Component {
  handleDelete(id) {
    this.props.cartAction.removeItem(id);
  }
  render() {
    return (
      <ListItem
        noIndent
        style={{
          paddingTop: 6,
          paddingBottom: 6
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row'
          }}>
          <View style={{ flex: 0 }}>
            <Thumbnail square source={{ uri: this.props.target.image }} />
          </View>
          <View
            style={{
              flex: 5,
              flexDirection: 'column',
              paddingLeft: 6
            }}>
            <View style={{ flex: 1 }}>
              <Text>{this.props.target.name}</Text>
            </View>
            <View style={{ maxWidth: 100 }}>
              <QuantityInput {...this.props} target={this.props.target} />
            </View>
          </View>
          <View
            style={{
              flex: 3,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <NumberFormat
              value={this.props.target.price * this.props.target.qty}
              thousandSeparator="."
              decimalSeparator=","
              displayType={'text'}
              prefix={'Rp'}
              renderText={value => <Text>{value}</Text>}
            />
          </View>
          <View
            style={{
              justifyContent: 'center'
            }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => this.handleDelete(this.props.target.id)}>
              <Icon name="delete" type="MaterialIcons" />
            </TouchableOpacity>
          </View>
        </View>
      </ListItem>
    );
  }
}

export default CartItem;
