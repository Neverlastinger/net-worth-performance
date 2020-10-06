import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from 'react-native';
import { useAsyncStorage } from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import styled from 'styled-components/native';
import { setUser, logOut } from '~/store/actions';
import AuthNavigationRoot from './AuthNavigationRoot';
import AppNavigationRoot from './AppNavigationRoot';

/**
 * Main entry point of the application.
 * Navigates to authentication if the user is not signed in, or to the app otherwise.
 */
const NavigationRoot = () => {
  const dispatch = useDispatch();
  const { setItem: setLoginUsed } = useAsyncStorage('login-used');
  const user = useSelector((state) => state.user);
  const hasAssets = useSelector((state) => state.assetList).length > 0;
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (u) => {
    dispatch(u ? setUser(u._user) : logOut());
    setInitializing(false);
  };

  useEffect(() => (
    auth().onAuthStateChanged(onAuthStateChanged)
  ), []);

  useEffect(() => {
    user.email && setLoginUsed('YES');
  }, [user]);

  if (initializing) {
    return (
      <SafeArea>
        <Text>Splash screen</Text>
      </SafeArea>
    );
  }

  return user.email ? <AppNavigationRoot hasAssets={hasAssets} /> : <AuthNavigationRoot />;
};

const SafeArea = styled.SafeAreaView`
  flex: 1
`;

export default NavigationRoot;
