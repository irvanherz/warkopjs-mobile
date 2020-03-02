import React from 'react';
import { StyleSheet, View, ToastAndroid, StatusBar, Image } from 'react-native';
import {
  Container,
  Header,
  Content,
  Text,
  Item,
  Input,
  Button,
  Form
} from 'native-base';
import Axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';
import { API_HOST } from 'react-native-dotenv';

class Register extends React.Component {
  state = {
    name: '',
    username: '',
    password_1: '',
    password_2: ''
  };

  handleChange = (field, value) => {
    this.setState({ [field]: value });
  };

  handleRegister = () => {
    const { name, username, password_1, password_2 } = this.state;
    const body = { name, username, password_1, password_2, role: 2 };

    Axios.post(`${API_HOST}/auth/signup`, qs.stringify(body))
      .then(response => {
        if (response.status === 200) {
          ToastAndroid.show(
            'Register success. Now you can login.',
            ToastAndroid.LONG
          );
          this.props.navigation.navigate('Login');
        }
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
  };

  handleLogin = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <Container style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(255,255,255,0.1)"
          barStyle="light-content"
        />
        <Image
          source={require('../../Public/assets/images/header.png')}
          style={{
            position: 'absolute',
            bottom: 0,

            width: '100%',
            height: '27%'
          }}
        />
        <View style={styles.loginbox}>
          <Image
            source={require('../../Public/assets/images/logo.png')}
            style={{
              alignSelf: 'center',
              marginBottom: 16
            }}
          />
          <Item rounded style={styles.input}>
            <Input
              onChangeText={text => this.handleChange('name', text)}
              placeholder="Full name"
              textContentType="name"
            />
          </Item>
          <Item rounded style={styles.input}>
            <Input
              onChangeText={text => this.handleChange('username', text)}
              placeholder="Username"
              textContentType="username"
            />
          </Item>
          <Item rounded style={styles.input}>
            <Input
              onChangeText={text => this.handleChange('password_1', text)}
              placeholder="Password"
              secureTextEntry
            />
          </Item>
          <Item rounded style={styles.input}>
            <Input
              onChangeText={text => this.handleChange('password_2', text)}
              placeholder="Retype password"
              secureTextEntry
            />
          </Item>
          <Button
            style={styles.registerButton}
            onPress={() => this.handleRegister()}
            rounded
            full>
            <Text>Register</Text>
          </Button>
          <View style={styles.separatorContainer}>
            <View style={styles.separatorBorder} />
            <Text style={styles.separatorText}>OR</Text>
            <View style={styles.separatorBorder} />
          </View>

          <Button
            style={styles.loginButton}
            onPress={() => this.handleLogin()}
            rounded
            full>
            <Text>Login Existing Account</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  authData: state.auth
});

const mapDispatchToProps = dispatch => ({
  authAction: {
    setLoginData: data => dispatch({ type: 'AUTH_SET_LOGIN_DATA', data })
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#150A45'
  },
  input: {
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: '#F8F8F8',
    borderColor: '#000',
    elevation: 8
  },
  loginbox: {
    margin: 16,
    padding: 16,
    borderRadius: 4
  },
  registerButton: {
    marginBottom: 16,
    marginTop: 16,
    borderRadius: 40,
    backgroundColor: '#EB641E',
    elevation: 5
  },
  loginButton: {
    marginBottom: 16,
    borderRadius: 40,
    backgroundColor: '#152852',
    elevation: 5
  },
  separatorContainer: {
    alignItems: 'center',
    marginBottom: 16,
    flexDirection: 'row'
  },
  separatorBorder: {
    borderBottomWidth: 1,
    borderColor: '#FFF',
    flexGrow: 1
  },
  separatorText: { color: '#FFF', marginHorizontal: 8 }
});
