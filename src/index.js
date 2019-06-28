import 'assets/styles/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { Provider } from 'react-redux';

import store from 'store';
import history from 'store/history';

import App from 'views/components/App';

import * as serviceWorker from 'utils/serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
