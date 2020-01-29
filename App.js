import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-native-paper';
import NavigationRoot from '~/screens/NavigationRoot';

const App = () => (
  <Provider>
    <StatusBar backgroundColor="white" barStyle="dark-content" />
    <NavigationRoot />
  </Provider>
);

export default App;
