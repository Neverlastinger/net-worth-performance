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

export const saveAsset = (data) => ({
  type: actions.SAVE_ASSET,
  data
});

export const fetchAssetList = () => ({
  type: actions.FETCH_ASSET_LIST
});

export const setAssetList = (data) => ({
  type: actions.SET_ASSET_LIST,
  data
});
