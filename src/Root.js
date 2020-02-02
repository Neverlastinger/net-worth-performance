import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '~/store/actions';
import NavigationRoot from '~/screens/NavigationRoot';

const Root = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return <NavigationRoot />;
};

export default Root;
