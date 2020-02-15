import { SET_CURRENCY_DATA } from '~/store/actions/actionTypes';

const currencyData = (state = [], action) => {
  switch (action.type) {
    case SET_CURRENCY_DATA:
      return action.data;
    default:
      return state;
  }
};

export const convertCurrency = (state, { amount, fromCurrency, toCurrency }) => {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  const rates = state[0];

  if (fromCurrency === 'EUR') {
    return toFixed(amount * rates[toCurrency]);
  }

  if (toCurrency === 'EUR') {
    return toFixed(amount / rates[fromCurrency]);
  }

  return toFixed((amount / rates[fromCurrency]) * rates[toCurrency]);
};

const toFixed = (amount) => (
  Number(amount.toFixed(2))
);

export default currencyData;
