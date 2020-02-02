import * as actions from './actionTypes';

export const fetchCategories = () => ({
  type: actions.FETCH_ASSET_CATEGORIES
});

export const setAssetCategories = (data) => ({
  type: actions.SET_ASSET_CATEGORIES,
  data
});

export const deleteAssetCategory = (id) => ({
  type: actions.DELETE_ASSET_CATEGORY,
  id
});

export const addAssetCategory = (name) => ({
  type: actions.ADD_ASSET_CATEGORY,
  name
});
