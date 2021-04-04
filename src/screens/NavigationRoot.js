import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigationRoot from './AuthNavigationRoot';
import AppNavigationRoot from './AppNavigationRoot';

/**
 * Main entry point of the application.
 * Navigates to authentication if the user is not signed in, or to the app otherwise.
 *
 * @param {Boolean} isInitializing: indicates if the firebase authentication is still in progress so the application content cannot be displayed
 */
const NavigationRoot = ({ isInitializing }) => {
  const user = useSelector((state) => state.user);
  const hasAssets = useSelector((state) => state.assetList).length > 0;

  useEffect(() => {
    user.email && AsyncStorage.setItem('login-used', 'YES');
  }, [user]);

  if (isInitializing) {
    return null;
  }

  return user.email ? <AppNavigationRoot hasAssets={hasAssets} /> : <AuthNavigationRoot />;
};

export default NavigationRoot;
