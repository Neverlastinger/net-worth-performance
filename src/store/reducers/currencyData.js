import { SET_CURRENCY_DATA } from '~/store/actions/actionTypes';
import { getPrevMonth, getDateKey } from '~/lib/dates';

const currencyData = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENCY_DATA:
      return {
        ...action.data.reduce((result, item) => ({
          ...result,
          [item.id]: item
        }), {}),
        isInitialized: true
      };
    default:
      return state;
  }
};

export const convertCurrency = (state, { amount, fromCurrency, toCurrency, month }) => {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  const rates = state[month] || state[getPrevMonth(month)] || state[getDateKey()] || state[getPrevMonth(getDateKey())];

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
