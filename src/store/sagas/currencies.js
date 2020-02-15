import { takeEvery, call, put } from 'redux-saga/effects';
import { firebase } from '@react-native-firebase/firestore';
import { runFirebaseChannel, getDocsByShapshot } from '~/store/sagas/common/saga-common';
import { FETCH_CURRENCY_DATA } from '~/store/actions/actionTypes';
import { setCurrencyData } from '~/store/actions';

const FIREBASE_PATH = 'currency';

function* watchFetch() {
  yield takeEvery(FETCH_CURRENCY_DATA, fetch);
}

function* watchFirebaseListener() {
  const channel = yield call(runFirebaseChannel, {
    path: FIREBASE_PATH
  });

  yield takeEvery(channel, onFirebaseEmit);
}

function* fetch() {
  const data = yield call(async () => {
    const snapshot = await firebase.firestore().collection(FIREBASE_PATH).get();
    return getDocsByShapshot(snapshot);
  });

  yield put(setCurrencyData(data));
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

export default [
  watchFetch,
  watchFirebaseListener
];
