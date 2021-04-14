import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAsyncValue from '~/hooks/useAsyncValue';
import AuthNavigationRoot from './AuthNavigationRoot';
import AppNavigationRoot from './AppNavigationRoot';
import { STORAGE_KEYS } from '~/const';

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
    user.email && AsyncStorage.setItem(STORAGE_KEYS.LOGIN_USED, 'YES');
  }, [user]);

  const hasWalkthroughBeenShown = useAsyncValue(async () => {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.WALKTHROUGH_SHOWN);
    return !!value;
  });

  if (isInitializing || hasWalkthroughBeenShown === undefined) {
    return null;
  }

  return user.email
    ? <AppNavigationRoot hasAssets={hasAssets} />
    : <AuthNavigationRoot showWalkthrough={!hasWalkthroughBeenShown} />;
};

export default NavigationRoot;
