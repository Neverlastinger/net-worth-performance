import { eventChannel } from 'redux-saga';
import { takeEvery, take, call, select } from 'redux-saga/effects';
import { firebase } from '@react-native-firebase/firestore';
import { SET_USER, LOG_OUT } from '~/store/actions/actionTypes';

/**
 * Watches for firebase changes and updates redux store.
 *
 * @param {String}   path: firebase collection path
 */
export const runFirebaseChannel = ({ path }) => (
  eventChannel((emitter) => {
    const unsubscribe = firebase.firestore().collection(path).onSnapshot(
      async (snapshot) => {
        emitter(getDocsByShapshot(snapshot));
      },
      async () => {
        alert(t('errorFetchingData'));
      }
    );

    return unsubscribe;
  })
);

export function* watchFirebaseListener(firebasePath, onFirebaseEmit) {
  if (yield call(isUserLoggedIn)) {
    yield call(runUserFirebaseChannel);
    return;
  }

  while (true) {
    yield take(SET_USER);
    yield call(runUserFirebaseChannel, firebasePath, onFirebaseEmit);
  }
}

function* runUserFirebaseChannel(firebasePath, onFirebaseEmit) {
  const { email } = yield select((state) => state.user);

  const channel = yield call(runFirebaseChannel, {
    path: `users/${email}/${firebasePath}`
  });

  yield takeEvery(channel, onFirebaseEmit);

  yield take(LOG_OUT);
  channel.close();
}

function* isUserLoggedIn() {
  const { email } = yield select((state) => state.user);
  return !!email;
}

/**
 * Extracts data by the given collection snapshot.
 * Adds the document id to the final result.
 *
 * @param  {Object} snapshot
 * @return {Array}
 */
const getDocsByShapshot = (snapshot) => (
  snapshot.docs.map((doc) => (
    {
      ...doc.data(),
      id: doc.id
    }
  ))
);
