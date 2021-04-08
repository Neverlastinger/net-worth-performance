import { takeEvery, call, put, select } from 'redux-saga/effects';
import { firebase } from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { watchFirebaseListener } from '~/store/sagas/common/saga-common';
import { SAVE_ASSET, UPDATE_ASSET, DELETE_ASSET, UPDATE_ASSET_CATEGORY } from '~/store/actions/actionTypes';
import { setAssetList, saveBaseCurrency, askAboutBaseCurrency } from '~/store/actions';
import { STORAGE_KEYS } from '~/const';

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

function* watchUpdateCategoryName() {
  yield takeEvery(UPDATE_ASSET_CATEGORY, updateCategoryName);
}

function* watchFirebaseListenerForAssets() {
  yield watchFirebaseListener({
    firebasePath: 'assets',
    onFirebaseEmit
  });
}

function* save({ data }) {
  const { email, baseCurrency } = yield select((state) => state.user);

  if (!baseCurrency) {
    yield put(saveBaseCurrency(data.currency));
  } else {
    const baseCurrencyQuestionAsked = yield call(AsyncStorage.getItem, STORAGE_KEYS.BASE_CURRENCY_QUESTION_ASKED);

    if (!baseCurrencyQuestionAsked) {
      yield put(askAboutBaseCurrency());
    }
  }

  yield call(async () => {
    try {
      await firebase.firestore().collection(getFirebasePath(email)).add(data);
    } catch (error) {
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

function* updateCategoryName({ data, newName }) {
  const { name } = data;
  const { email } = yield select((state) => state.user);

  yield call(async () => {
    const snapshot = await firebase.firestore().collection(getFirebasePath(email)).where('category', '==', name).get();

    snapshot.forEach((doc) => {
      doc.ref.update({
        category: newName
      });
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
  watchUpdateCategoryName,
  watchFirebaseListenerForAssets
];
