import { takeLatest, call } from 'redux-saga/effects';
import { firebase } from '@react-native-firebase/firestore';
import { getPrevMonth, getDateKey } from '~/lib/dates';
import { fetchCurrencyData } from '~/api';

const FIREBASE_PATH = 'currency';
const TO_MONTH = '2010-01';

function* watchInitCurrenciesInDatabase() {
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

export default [
  watchInitCurrenciesInDatabase
];
