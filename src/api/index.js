import { CURRENCIES } from 'config';
import { EXCHANGERATESAPI_ACCESS_KEY } from '@env'; // eslint-disable-line import/no-unresolved

export const fetchCurrencyData = async (dateKey) => {
  const response = await fetch(`http://api.exchangeratesapi.io/${dateKey}-01?base=EUR&symbols=${CURRENCIES}&access_key=${EXCHANGERATESAPI_ACCESS_KEY}`);
  const result = await response.json();
  return result;
};
