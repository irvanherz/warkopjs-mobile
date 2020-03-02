import { ToastAndroid } from 'react-native';

const initialState = {};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_SET_LOGIN_DATA':
      return {
        ...state,
        ...action.data
      };
    case 'AUTH_UNSET_LOGIN_DATA':
      return {};
    case 'AUTH_UPDATE_PROFILE_FULFILLED':
      ToastAndroid.show('Profile updated successfully', ToastAndroid.LONG);
      return {
        ...state,
        ...action.payload.data.data
      };
    case 'AUTH_UPDATE_PROFILE_REJECTED':
      let messages = [];
      if (action.payload.response.data && action.payload.response.data.errors) {
        messages = action.payload.response.data.errors.map(
          error => '- ' + error.message
        );
      }

      if (messages.length) {
        ToastAndroid.show(
          'Error updating your profile. Reasons:\n' + messages.join('\n'),
          ToastAndroid.LONG
        );
      } else {
        ToastAndroid.show(
          'Error updating your profile. Try again later.',
          ToastAndroid.LONG
        );
      }

      return state;
    default:
      return state;
  }
};

export default auth;
