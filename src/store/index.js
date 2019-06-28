import { routerMiddleware } from 'connected-react-router/immutable';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import history from './history';
import reducer from './reducer';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ shouldHotReload: false })
    : compose;

const middlewares = [sagaMiddleware, routerMiddleware(history)];

const enhancers = [applyMiddleware(...middlewares)];

const store = createStore(reducer, composeEnhancers(...enhancers));

sagaMiddleware.run(saga);

export default store;
