import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Main from './main';
import Auth from './auth';
import App from './app';

const switchNavigator = createSwitchNavigator(
  { Main, Auth, App },
  { initialRouteName: 'Main' }
);

export default createAppContainer(switchNavigator);
