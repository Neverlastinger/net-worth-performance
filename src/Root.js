import React from 'react';
import { useSelector } from 'react-redux';
import NavigationRoot from '~/screens/NavigationRoot';

const Root = () => {
  const hasAssets = useSelector((state) => state.assetList).length > 0;

  return (
    <NavigationRoot hasAssets={hasAssets} />
  );
};

export default Root;
