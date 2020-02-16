import * as actions from './actionTypes';

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

export const setAssetList = (data) => ({
  type: actions.SET_ASSET_LIST,
  data
});

export const setCurrencyData = (data) => ({
  type: actions.SET_CURRENCY_DATA,
  data
});
