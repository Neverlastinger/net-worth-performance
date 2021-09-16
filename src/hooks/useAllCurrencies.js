import { CURRENCIES } from 'config';

const CURRENCY_ARRAY = CURRENCIES.split(',');

const useAllCurrencies = () => (
  CURRENCY_ARRAY.sort()
);

export default useAllCurrencies;
