import { takeLatest, call } from 'redux-saga/effects';
import { firebase } from '@react-native-firebase/firestore';
import { getPrevMonth, getDateKey } from '~/lib/dates';

const FIREBASE_PATH = 'currency';
const TO_MONTH = '2010-01';
const CURRENCIES = 'BGN,USD,CHF,GBP';

function* watchInitApp() {
  yield takeLatest('INIT_CURRENCIES_IN_DATABASE', storeCurrencyData);
}

function* storeCurrencyData() {
  let dateKey = getDateKey();

  while (dateKey !== TO_MONTH) {
    const result = yield call(fetchCurrencyData, dateKey);
    result.dateKey = dateKey;

    yield call(async () => {
      await firebase.firestore().collection(FIREBASE_PATH).doc(result.dateKey).set(result.rates);
    });

    dateKey = getPrevMonth(dateKey);
  }
}

const fetchCurrencyData = async (dateKey) => {
  const response = await fetch(`https://api.exchangeratesapi.io/${dateKey}-01?base=EUR&symbols=${CURRENCIES}`);
  const result = await response.json();
  return result;
};

export default [
  watchInitApp
];
