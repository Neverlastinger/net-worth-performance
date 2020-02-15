import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategories, fetchAssetList, fetchCurrencyData } from '~/store/actions';
import NavigationRoot from '~/screens/NavigationRoot';

const Root = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAssetList());
    dispatch(fetchCurrencyData());
  }, []);

  return <NavigationRoot />;
};

export default Root;
