import { put, select, call, takeEvery } from 'redux-saga/effects';
import { firebase } from '@react-native-firebase/firestore';
import { watchFirebaseListener } from '~/store/sagas/common/saga-common';
import { setUserData, initDefaultAssetCategories } from '~/store/actions';
import { SAVE_BASE_CURRENCY } from '~/store/actions/actionTypes';

const getFirebasePath = (email) => (
  `users/${email}`
);

function* watchFirebaseListenerForUser() {
  yield watchFirebaseListener({
    onFirebaseEmit,
    watchUserDoc: true
  });
}

function* watchSaveBaseCurrency() {
  yield takeEvery(SAVE_BASE_CURRENCY, saveBaseCurrency);
}

/**
 * Called when the firebase store changes to update data in redux store.
 *
 * @param  {Array} userData: user data
 * @return {Generator}
 */
function* onFirebaseEmit(userData) {
  yield put(setUserData({
    baseCurrency: userData.baseCurrency
  }));

  if (!userData.setup) {
    yield put(initDefaultAssetCategories());

    const { email } = yield select((state) => state.user);

    yield call(async () => {
      await firebase.firestore().doc(getFirebasePath(email)).set({
        setup: true
      }, { merge: true });
    });
  }
}

function* saveBaseCurrency({ currency }) {
  const { email } = yield select((state) => state.user);

  yield call(async () => {
    await firebase.firestore().doc(getFirebasePath(email)).set({
      baseCurrency: currency
    }, { merge: true });
  });
}

export default [
  watchFirebaseListenerForUser,
  watchSaveBaseCurrency
];
