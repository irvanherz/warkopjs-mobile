import React from 'react';
import Cart from './Cart';
import Checkout from './Checkout';
import { createStackNavigator } from 'react-navigation-stack';
import { View } from 'react-native';
import Cod from './Cod';

const CartNavigator = createStackNavigator({
  Cart: {
    screen: Cart,
    navigationOptions: {
      title: 'Cart'
    }
  },
  Checkout: {
    screen: Checkout,
    navigationOptions: {
      title: 'Select Payment Method'
    }
  },
  Cod: {
    screen: Cod,
    navigationOptions: {
      title: 'Cash Payment'
    }
  }
});

export default CartNavigator;
