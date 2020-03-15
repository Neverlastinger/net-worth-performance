import { takeEvery, call, put } from 'redux-saga/effects';
import { firebase } from '@react-native-firebase/firestore';
import { runFirebaseChannel } from '~/store/sagas/common/saga-common';
import { SAVE_ASSET, UPDATE_ASSET } from '~/store/actions/actionTypes';
import { setAssetList } from '~/store/actions';

const FIREBASE_PATH = 'users/neverlastinger@gmail.com/assets';

function* watchSave() {
  yield takeEvery(SAVE_ASSET, save);
}

function* watchUpdate() {
  yield takeEvery(UPDATE_ASSET, update);
}

function* watchFirebaseListener() {
  const channel = yield call(runFirebaseChannel, {
    path: FIREBASE_PATH
  });

  yield takeEvery(channel, onFirebaseEmit);
}

function* save({ data }) {
  yield call(async () => {
    await firebase.firestore().collection(FIREBASE_PATH).add(data);
  });
}

function* update({ data }) {
  const { amount, category, currency, name } = data;

  yield call(async () => {
    await firebase.firestore().collection(FIREBASE_PATH).doc(data.id).update({
      amount,
      category,
      currency,
      name
    });
  });
}

/**
 * Called when the firebase store changes to update data in redux store.
 *
 * @param  {Array} data: asset data
 * @return {Generator}
 */
function* onFirebaseEmit(data) {
  yield put(setAssetList(data));
}

export default [
  watchSave,
  watchUpdate,
  watchFirebaseListener
];
