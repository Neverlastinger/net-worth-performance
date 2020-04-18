import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import NavigationRoot from '~/screens/NavigationRoot';
import { initApplication } from '~/store/actions/';

const Root = () => {
  const dispatch = useDispatch();
  const hasAssets = useSelector((state) => state.assetList).length > 0;

  useEffect(() => {
    dispatch(initApplication());
  }, []);

  return (
    <Provider>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <NavigationRoot hasAssets={hasAssets} />
    </Provider>
  );
};

export default Root;
