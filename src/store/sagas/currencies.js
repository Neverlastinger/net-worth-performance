import { takeEvery, call, put } from 'redux-saga/effects';
import { runFirebaseChannel } from '~/store/sagas/common/saga-common';
import { setCurrencyData } from '~/store/actions';

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

export default [
  watchFirebaseListener
];
