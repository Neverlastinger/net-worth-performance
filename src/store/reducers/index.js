import { combineReducers } from 'redux';
import { sortAssetsByAmountInBaseCurrency } from '~/lib/dates';
import AssetGrowth from '~/lib/AssetGrowth';
import assetCategories from './assetCategories';
import assetList, * as fromAssetList from './assetList';
import assetsLoaded from './assetsLoaded';
import currencyData, * as fromCurrencyData from './currencyData';
import user from './user';
import selectedMonth from './selectedMonth';
import mostRecentCategory from './mostRecentCategory';
import showBaseCurrencyQuestion from './showBaseCurrencyQuestion';
import infoMessage from './infoMessage';

export default combineReducers({
  assetCategories,
  assetList,
  assetsLoaded,
  currencyData,
  user,
  selectedMonth,
  mostRecentCategory,
  showBaseCurrencyQuestion,
  infoMessage
});

export const assetListWithBaseCurrency = (state) => {
  const list = state.currencyData.isInitialized
    ? state.assetList.map((asset) => ({
      ...asset,
      isInBaseCurrency: asset.currency === state.user.baseCurrency,
      amountInBaseCurrency: Object.keys(asset.amount).reduce((result, month) => ({
        ...result,
        [month]: convertToBaseCurrency(state, {
          amount: asset.amount[month],
          currency: asset.currency,
          month
        })
      }), {}),
      baseCurrency: state.user.baseCurrency
    })).sort(sortAssetsByAmountInBaseCurrency)
    : [];

  list.id = state.assetList.id;
  return list;
};

export const assetListForChart = (state, month) => {
  const list = assetListWithBaseCurrency(state).filter((asset) => (
    AssetGrowth({ asset, month }).getLatestAmountInBaseCurrency() > 0
  )).map((asset) => ({
    ...asset,
    latestAmount: AssetGrowth({ asset, month }).getLatestAmount(),
    latestAmountInBaseCurrency: AssetGrowth({ asset, month }).getLatestAmountInBaseCurrency()
  })).sort((first, second) => (
    first.latestAmountInBaseCurrency < second.latestAmountInBaseCurrency ? 1 : -1
  ));

  list.id = state.assetList.id;
  return list;
};

export const assetCategoryList = (state, month) => {
  const assets = assetListForChart(state, month);

  const categoryNames = Array.from(new Set(assets.map((asset) => (
    asset.category
  ))));

  const categories = categoryNames.map((categoryName) => ({
    name: categoryName,
    amountInBaseCurrency: assets.filter((asset) => (
      asset.category === categoryName
    )).reduce((accumulated, current) => (
      accumulated + current.latestAmountInBaseCurrency
    ), 0),
    assets: assets.filter((asset) => (
      asset.category === categoryName
    ))
  }));

  categories.id = assets.id;

  return categories;
};

export const convertToBaseCurrency = (state, { amount, currency, month }) => (
  fromCurrencyData.convertCurrency(state.currencyData, {
    amount,
    fromCurrency: currency,
    toCurrency: state.user.baseCurrency,
    month
  })
);

export const getActiveMonths = (state) => (
  fromAssetList.getActiveMonths(state.assetList)
);
