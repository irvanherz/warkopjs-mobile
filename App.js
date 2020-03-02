import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import Navigator from './src/Public/navigation';
import { Provider } from 'react-redux';
import { store, persistor } from './src/Public/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Root } from 'native-base';

class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return (
      <Root>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navigator />
          </PersistGate>
        </Provider>
      </Root>
    );
  }
}

export default App;
