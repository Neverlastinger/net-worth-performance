import { eventChannel } from 'redux-saga';
import { takeEvery, take, call, select } from 'redux-saga/effects';
import { firebase } from '@react-native-firebase/firestore';
import { SET_USER, LOG_OUT } from '~/store/actions/actionTypes';

/**
 * Watches for firebase changes and updates redux store.
 *
 * @param {String}  path: firebase collection path
 * @param {Boolean} isWatchingDocument: true if the given path points to a document instead of a collection
 */
export const runFirebaseChannel = ({ path, isWatchingDocument }) => (
  eventChannel((emitter) => {
    const unsubscribe = firebase.firestore()[isWatchingDocument ? 'doc' : 'collection'](path).onSnapshot(
      async (snapshot) => {
        emitter(isWatchingDocument ? getDocData(snapshot) : getDocsByShapshot(snapshot));
      },
      async () => {
        alert(t('errorFetchingData'));
      }
    );

    return unsubscribe;
  })
);

export function* watchFirebaseListener({ firebasePath, onFirebaseEmit, watchUserDoc = false }) {
  if (yield call(isUserLoggedIn)) {
    yield call(runUserFirebaseChannel, firebasePath, onFirebaseEmit, watchUserDoc);
    return;
  }

  while (true) {
    yield take(SET_USER);
    yield call(runUserFirebaseChannel, firebasePath, onFirebaseEmit, watchUserDoc);
  }
}

function* runUserFirebaseChannel(firebasePath, onFirebaseEmit, watchUserDoc) {
  const { email } = yield select((state) => state.user);

  const channel = yield call(runFirebaseChannel, {
    path: watchUserDoc ? `users/${email}` : `users/${email}/${firebasePath}`,
    isWatchingDocument: watchUserDoc
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
 * @param  {Array} snapshot: firebase snapshot representation of a collection
 * @return {Array} usable JavaScript array of objects
 */
const getDocsByShapshot = (snapshot) => (
  snapshot.docs.map((docSnapshot) => (
    getDocData(docSnapshot)
  ))
);

/**
 * Extracts data by the given document snapshot.
 * Adds the document id to the final result.
 *
 * @param  {Object} snapshot: firebase snapshot representation of a document
 * @return {Object} usable JavaScript object
 */
const getDocData = (snapshot) => ({
  ...snapshot.data(),
  id: snapshot.id
});
