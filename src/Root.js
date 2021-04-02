import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import NavigationRoot from '~/screens/NavigationRoot';
import { initApplication, setUser, logOut } from '~/store/actions/';
import { LIGHT_BACKGROUND_COLOR } from './styles';

/**
 * Root component of the application.
 * Authenticates the user in firebase.
 *
 * @param {Function} onInitialized: should be called when the firebase authentication is initialized so the parent component can hide the splash screen
 */
const Root = ({ onInitialized }) => {
  const dispatch = useDispatch();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    dispatch(initApplication());
  }, []);

  const onAuthStateChanged = (u) => {
    dispatch(u ? setUser(u._user) : logOut());
    setIsInitializing(false);
    onInitialized();
  };

  useEffect(() => (
    auth().onAuthStateChanged(onAuthStateChanged)
  ), []);

  return (
    <Provider>
      <StatusBar backgroundColor={LIGHT_BACKGROUND_COLOR} barStyle="dark-content" />
      <NavigationRoot isInitializing={isInitializing} />
    </Provider>
  );
};

export default Root;
