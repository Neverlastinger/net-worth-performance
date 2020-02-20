import { combineReducers } from 'redux';
import assetCategories from './assetCategories';
import assetList from './assetList';
import currencyData, * as fromCurrencyData from './currencyData';
import user from './user';

export default combineReducers({
  assetCategories,
  assetList,
  currencyData,
  user
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
    })).sort((first, second) => (
      first.amountInBaseCurrency < second.amountInBaseCurrency ? 1 : -1
    ))
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
