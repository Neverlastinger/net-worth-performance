import { takeEvery, call, put } from 'redux-saga/effects';
import { firebase } from '@react-native-firebase/firestore';
import { runFirebaseChannel, getDocsByShapshot } from '~/store/sagas/common/saga-common';
import { FETCH_ASSET_LIST, SAVE_ASSET } from '~/store/actions/actionTypes';
import { setAssetList } from '~/store/actions';

const FIREBASE_PATH = 'users/neverlastinger@gmail.com/assets';

function* watchFetch() {
  yield takeEvery(FETCH_ASSET_LIST, fetch);
}

function* watchSave() {
  yield takeEvery(SAVE_ASSET, save);
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

function* fetch() {
  const data = yield call(async () => {
    const snapshot = await firebase.firestore().collection(FIREBASE_PATH).get();
    return getDocsByShapshot(snapshot);
  });

  yield put(setAssetList(data));
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
  watchFetch,
  watchSave,
  watchFirebaseListener
];
