import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import store from '~/store';
import Root from '~/Root';

const App = () => (
  <>
    <StatusBar backgroundColor="white" barStyle="dark-content" />
    <Root />
  </>
);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
