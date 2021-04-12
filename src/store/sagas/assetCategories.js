import { takeEvery, call, put, select } from 'redux-saga/effects';
import { firebase } from '@react-native-firebase/firestore';
import { DEFAULT_CATEGORIES } from 'config';
import { watchFirebaseListener } from '~/store/sagas/common/saga-common';
import { DELETE_ASSET_CATEGORY, ADD_ASSET_CATEGORY, UPDATE_ASSET_CATEGORY, INIT_DEFAULT_ASSET_CATEGORIES } from '~/store/actions/actionTypes';
import { setAssetCategories } from '~/store/actions';

const getFirebasePath = (email) => (
  `users/${email}/categories`
);

function* watchDelete() {
  yield takeEvery(DELETE_ASSET_CATEGORY, doDelete);
}

function* watchAdd() {
  yield takeEvery(ADD_ASSET_CATEGORY, add);
}

function* watchUpdate() {
  yield takeEvery(UPDATE_ASSET_CATEGORY, update);
}

function* watchInitDefault() {
  yield takeEvery(INIT_DEFAULT_ASSET_CATEGORIES, initDefault);
}

function* watchFirebaseListenerForCategories() {
  yield watchFirebaseListener({
    firebasePath: 'categories',
    onFirebaseEmit
  });
}

/**
 * Deletes the category with the given id from firebase.
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
 * Adds the category with the given name to firebase.
 *
 * @param  {String}    name
 * @return {Generator}
 */
function* add({ name }) {
  const { email } = yield select((state) => state.user);

  yield call(async () => {
    try {
      await firebase.firestore().collection(getFirebasePath(email)).add({
        name
      });
    } catch (error) {
      alert(t('errorSavingData'));
    }
  });
}

function* update({ data, newName }) {
  const { id } = data;
  const { email } = yield select((state) => state.user);

  yield call(async () => {
    await firebase.firestore().collection(getFirebasePath(email)).doc(id).update({
      name: newName
    });
  });
}

function* initDefault() {
  const { email } = yield select((state) => state.user);

  yield call(async () => {
    try {
      const batch = firebase.firestore().batch();

      DEFAULT_CATEGORIES.forEach(async (category) => {
        const docRef = firebase.firestore().collection(getFirebasePath(email)).doc();
        batch.set(docRef, { name: category });
      });

      batch.commit();
    } catch (error) {
      alert(t('errorSavingData'));
    }
  });
}

/**
 * Called when the firebase store changes to update data in redux store.
 *
 * @param  {Array} categories: category data (name, id)
 * @return {Generator}
 */
function* onFirebaseEmit(categories) {
  yield put(setAssetCategories(categories));
}

export default [
  watchDelete,
  watchAdd,
  watchUpdate,
  watchInitDefault,
  watchFirebaseListenerForCategories
];
