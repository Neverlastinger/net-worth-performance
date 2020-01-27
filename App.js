import React from 'react';
import {
  StatusBar
} from 'react-native';
import NavigationRoot from '~/screens/NavigationRoot';

const App = () => (
  <>
    <StatusBar backgroundColor="white" barStyle="dark-content" />
    <NavigationRoot />
  </>
);

export default App;
