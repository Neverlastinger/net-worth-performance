import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import NavigationRoot from '~/screens/NavigationRoot';
import { initApplication } from '~/store/actions/';
import { LIGHT_BACKGROUND_COLOR } from './styles';

const Root = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initApplication());
  }, []);

  return (
    <Provider>
      <StatusBar backgroundColor={LIGHT_BACKGROUND_COLOR} barStyle="dark-content" />
      <NavigationRoot />
    </Provider>
  );
};

export default Root;
