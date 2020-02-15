import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { USE_MOCK_MIDDLEWARE } from 'config';
import mockDataMiddleware from './middleware/mockDataMiddleware';
import rootReducer from './reducers';
import rootSaga from './sagas/index';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
let composeEnhancers = compose;

// https://github.com/zalmoxisus/redux-devtools-extension
composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle
USE_MOCK_MIDDLEWARE && middlewares.push(mockDataMiddleware);

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(...middlewares),
  ),
);

sagaMiddleware.run(rootSaga);

export default store;
