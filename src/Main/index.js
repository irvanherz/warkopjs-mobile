import React from 'react';
import { connect } from 'react-redux';

class Main extends React.Component {
  componentDidMount() {
    if (this.props.authData.token) {
      this.props.navigation.navigate('App');
    } else {
      this.props.navigation.navigate('Auth');
    }
  }
  render() {
    return null;
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
)(Main);
