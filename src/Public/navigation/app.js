import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import Home from '../../App/Home';
import Profile from '../../App/Profile';
import Logout from '../../App/Logout';
import Cart from '../../App/Cart';
import Test from '../../App/Test';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { Thumbnail } from 'native-base';
import { connect } from 'react-redux';

const DrawerContent = props => (
  <View>
    <ImageBackground
      source={require('../assets/images/cover.jpg')}
      style={{
        height: 200,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
        <Thumbnail
          style={{ borderColor: '#FFF', borderWidth: 2, elevation: 5 }}
          source={
            props.authData.photo
              ? { uri: props.authData.photo }
              : require('../../Public/assets/images/cover.jpg')
          }
        />
      </TouchableOpacity>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 16,
          color: '#FFF',
          marginVertical: 8,
          marginHorizontal: 100,
          textAlign: 'center'
        }}>
        {props.authData.name}
      </Text>
    </ImageBackground>
    <DrawerItems {...props} />
  </View>
);

const mapStateToProps = state => ({
  authData: state.auth,
  cartData: state.cart
});

const DrawerContentExt = connect(mapStateToProps)(DrawerContent);

export default createDrawerNavigator(
  {
    Home: {
      screen: Home
    },
    Profile: {
      screen: Profile
    },
    Cart: {
      screen: Cart
    },
    Logout: {
      screen: Logout
    }
  },
  {
    contentComponent: DrawerContentExt
  }
);
