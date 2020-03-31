import { format, subMonths } from 'date-fns';

/**
 * Returns the date key used in firebase.
 *
 * @param  {Date} date
 * @return {String}
 */
export const getDateKey = (date) => (
  format(date, 'yyyy-MM')
);

export const dateKeyToHumanReadable = (dateKey) => {
  const parts = dateKey.split('-');
  return format(new Date(parts[0], parts[1] - 1, 1), 'MMM yyyy');
};

/**
 * Returns a sorted list of month keys by the given amount object as it is stored in redux.
 *
 * @param  {Object} amount:
 *   - key represents the date key in the following format: 2020-02
 *   - value represents the amount
 * @return {Array} sorted array of date keys, e.g. [2020-02, 2020-01, 2019-12]
 */
export const getSortedMonthKeys = (amount) => (
  Object.keys(amount).sort((first, second) => (
    first > second ? -1 : 1
  ))
);

/**
 * Sorts the given assets by their current amount in base currency.
 * The current amount is always the amount for the latest month entry.
 *
 * @param  {Object} first: first asset to compare
 * @param  {Object} second: second asset to compare
 * @return {Number}: 1 or -1: used in the sort() function
 */
export const sortAssetsByAmountInBaseCurrency = (first, second) => {
  const firstAmountKey = getSortedMonthKeys(first.amountInBaseCurrency)[0];
  const secondAmountKey = getSortedMonthKeys(second.amountInBaseCurrency)[0];
  return first.amountInBaseCurrency[firstAmountKey] < second.amountInBaseCurrency[secondAmountKey] ? 1 : -1;
};

export const fillEmptyMonths = (months) => {
  if (months.length === 0) {
    return [];
  }

  let currentDate = new Date();
  let currentDateKey = getDateKey(currentDate);

  const result = [currentDateKey];

  while (currentDateKey !== months[months.length - 1]) {
    currentDate = subMonths(currentDate, 1);
    currentDateKey = getDateKey(currentDate);
    result.push(currentDateKey);
  }

  return result;
};

export const addTrailingMonths = (months, count) => {
  if (months.length === 0) {
    return [];
  }

  let currentDate = new Date();
  let currentDateKey = getDateKey(currentDate);

  while (currentDateKey !== months[months.length - 1]) {
    currentDate = subMonths(currentDate, 1);
    currentDateKey = getDateKey(currentDate);
  }

  const result = [...months];

  for (let i = 0; i < count; i += 1) {
    currentDate = subMonths(currentDate, 1);
    currentDateKey = getDateKey(currentDate);
    result.push(currentDateKey);
  }

  return result;
};
