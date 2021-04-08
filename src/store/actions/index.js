import * as actions from './actionTypes';

export const initApplication = () => ({
  type: actions.INIT_APPLICATION
});

export const setUser = (data) => ({
  type: actions.SET_USER,
  data
});

export const setUserData = (data) => ({
  type: actions.SET_USER_DATA,
  data
});

export const saveBaseCurrency = (currency) => ({
  type: actions.SAVE_BASE_CURRENCY,
  currency
});

export const logOut = () => ({
  type: actions.LOG_OUT
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

export const updateAssetCategory = (data, newName) => ({
  type: actions.UPDATE_ASSET_CATEGORY,
  data,
  newName
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

export const setSelectedMonth = (data) => ({
  type: actions.SET_SELECTED_MONTH,
  data
});

export const updateAsset = (data) => ({
  type: actions.UPDATE_ASSET,
  data
});

export const deleteAsset = (id) => ({
  type: actions.DELETE_ASSET,
  id
});

export const askAboutBaseCurrency = () => ({
  type: actions.ASK_ABOUT_BASE_CURRENCY
});

export const closeBaseCurrencyQuestion = () => ({
  type: actions.CLOSE_BASE_CURRENCY_QUESTION
});
