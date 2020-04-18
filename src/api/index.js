import { CURRENCIES } from 'config';

export const fetchCurrencyData = async (dateKey) => {
  const response = await fetch(`https://api.exchangeratesapi.io/${dateKey}-01?base=EUR&symbols=${CURRENCIES}`);
  const result = await response.json();
  return result;
};
