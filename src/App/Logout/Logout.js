import React from 'react';
import { Text, ScrollView } from 'react-native';
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
  Switch
} from 'native-base';
import { connect } from 'react-redux';
import { ImageBackground } from 'react-native';

class Logout extends React.Component {
  render() {
    this.props.authAction.unsetLoginData();
    this.props.navigation.navigate('Auth');
    return null;
  }
}

const mapStateToProps = state => ({
  authData: state.auth
});

const mapDispatchToProps = dispatch => ({
  authAction: {
    setLoginData: data => dispatch({ type: 'AUTH_SET_LOGIN_DATA', data }),
    unsetLoginData: () => dispatch({ type: 'AUTH_UNSET_LOGIN_DATA' })
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
