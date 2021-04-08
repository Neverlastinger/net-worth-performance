import { takeEvery, takeLatest, call, put, delay, select } from 'redux-saga/effects';
import { firebase } from '@react-native-firebase/firestore';
import { runFirebaseChannel } from '~/store/sagas/common/saga-common';
import { setCurrencyData } from '~/store/actions';
import { INIT_APPLICATION } from '~/store/actions/actionTypes';
import { getDateKey } from '~/lib/dates';
import { fetchCurrencyData } from '~/api';

const FIREBASE_PATH = 'currency';

function* watchFirebaseListener() {
  const channel = yield call(runFirebaseChannel, {
    path: FIREBASE_PATH
  });

  yield takeEvery(channel, onFirebaseEmit);
}

/**
 * Called when the firebase store changes to update data in redux store.
 *
 * @param  {Array} currencies: currencies data (EUR, USD, ...)
 * @return {Generator}
 */
function* onFirebaseEmit(currencies) {
  yield put(setCurrencyData(currencies));
}

function* watchInitCurrencyData() {
  yield takeLatest(INIT_APPLICATION, storeCurrencyData);
}

function* storeCurrencyData() {
  yield delay(2000);
  const existingCurrencyData = yield select((state) => state.currencyData[getDateKey()]);

  if (existingCurrencyData) {
    return;
  }

  const dateKey = getDateKey();
  const result = yield call(fetchCurrencyData, dateKey);

  yield call(async () => {
    await firebase.firestore().collection(FIREBASE_PATH).doc(dateKey).set(result.rates);
  });
}

export default [
  watchFirebaseListener,
  watchInitCurrencyData
];
