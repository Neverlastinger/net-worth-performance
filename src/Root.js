import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import NavigationRoot from '~/screens/NavigationRoot';

const Root = () => {
  const hasAssets = useSelector((state) => state.assetList).length > 0;

  return (
    <Provider>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <NavigationRoot hasAssets={hasAssets} />
    </Provider>
  );
};

export default Root;
