import React from 'react';
import {
  View,
  ImageBackground,
  Dimensions,
  Image,
  StyleSheet,
  StatusBar,
  ToastAndroid
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Button,
  Form,
  Text,
  Icon,
  Toast,
  Label
} from 'native-base';
import Axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';
import { API_HOST } from 'react-native-dotenv';

class Login extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handleLogin = () => {
    const { username, password } = this.state;
    const body = { username, password };

    Axios.post(`${API_HOST}/auth/signin`, qs.stringify(body))
      .then(response => {
        if (response.status === 200) {
          this.props.authAction.setLoginData(response.data.data);
          ToastAndroid.show('Login success', ToastAndroid.LONG);
          this.props.navigation.navigate('Home');
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

  handleRegister = () => {
    this.props.navigation.navigate('Register');
  };

  render() {
    return (
      <Container style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(255,255,255,0.2)"
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
              onChangeText={text => this.setState({ username: text })}
              placeholder="Username"
              textContentType="username"
            />
          </Item>
          <Item rounded style={styles.input}>
            <Input
              onChangeText={text => this.setState({ password: text })}
              placeholder="Password"
              secureTextEntry
            />
          </Item>
          <Button
            style={styles.loginButton}
            onPress={() => this.handleLogin()}
            rounded
            full>
            <Text>Login</Text>
          </Button>
          <View style={styles.separatorContainer}>
            <View style={styles.separatorBorder} />
            <Text style={styles.separatorText}>OR</Text>
            <View style={styles.separatorBorder} />
          </View>
          <Button
            style={styles.registerButton}
            onPress={() => this.handleRegister()}
            rounded
            full>
            <Text>Register new Account</Text>
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
)(Login);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#08183A'
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
  loginButton: {
    marginBottom: 16,
    marginTop: 16,
    borderRadius: 40,
    backgroundColor: '#EB641E',
    elevation: 5
  },
  registerButton: {
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
