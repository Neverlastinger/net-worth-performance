import { combineReducers } from 'redux';
import { sortAssetsByAmountInBaseCurrency } from '~/lib/dates';
import assetCategories from './assetCategories';
import assetList, * as fromAssetList from './assetList';
import currencyData, * as fromCurrencyData from './currencyData';
import user from './user';
import selectedMonth from './selectedMonth';

export default combineReducers({
  assetCategories,
  assetList,
  currencyData,
  user,
  selectedMonth
});

export const assetListForChart = (state) => {
  const list = state.currencyData.length > 0
    ? state.assetList.map((asset) => ({
      ...asset,
      isInBaseCurrency: asset.currency === state.user.baseCurrency,
      amountInBaseCurrency: Object.keys(asset.amount).reduce((result, month) => ({
        ...result,
        [month]: convertToBaseCurrency(state, {
          amount: asset.amount[month],
          currency: asset.currency
        })
      }), {}),
      baseCurrency: state.user.baseCurrency
    })).sort(sortAssetsByAmountInBaseCurrency)
    : [];

  list.id = state.assetList.id;
  return list;
};

export const convertToBaseCurrency = (state, { amount, currency }) => (
  fromCurrencyData.convertCurrency(state.currencyData, {
    amount,
    fromCurrency: currency,
    toCurrency: state.user.baseCurrency
  })
);

export const getActiveMonths = (state) => (
  fromAssetList.getActiveMonths(state.assetList)
);
