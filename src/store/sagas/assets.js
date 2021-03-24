import { takeEvery, call, put, select } from 'redux-saga/effects';
import { firebase } from '@react-native-firebase/firestore';
import { watchFirebaseListener } from '~/store/sagas/common/saga-common';
import { SAVE_ASSET, UPDATE_ASSET, DELETE_ASSET } from '~/store/actions/actionTypes';
import { setAssetList } from '~/store/actions';

const getFirebasePath = (email) => (
  `users/${email}/assets`
);

function* watchSave() {
  yield takeEvery(SAVE_ASSET, save);
}

function* watchUpdate() {
  yield takeEvery(UPDATE_ASSET, update);
}

function* watchDelete() {
  yield takeEvery(DELETE_ASSET, doDelete);
}

function* watchFirebaseListenerForAssets() {
  yield watchFirebaseListener('assets', onFirebaseEmit);
}

function* save({ data }) {
  const { email } = yield select((state) => state.user);

  yield call(async () => {
    try {
      await firebase.firestore().collection(getFirebasePath(email)).add(data);
    } catch (error) {
      // eslint-disable-next-line no-alert, no-undef
      alert(t('errorSavingData'));
    }
  });
}

function* update({ data }) {
  const { amount, category, currency, name } = data;
  const { email } = yield select((state) => state.user);

  yield call(async () => {
    await firebase.firestore().collection(getFirebasePath(email)).doc(data.id).update({
      amount,
      category,
      currency,
      name
    });
  });
}

/**
 * Deletes the asset with the given id from firebase.
 *
 * @param  {String}    id
 * @return {Generator}
 */
function* doDelete({ id }) {
  const { email } = yield select((state) => state.user);

  yield call(async () => {
    const doc = await firebase.firestore().collection(getFirebasePath(email)).doc(`${id}`);
    doc.delete();
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
  watchDelete,
  watchFirebaseListenerForAssets
];
