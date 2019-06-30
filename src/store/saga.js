import { routinePromiseWatcherSaga } from 'redux-saga-routines';
import { all, call, fork } from 'redux-saga/effects';

import { leadWatchSaga } from 'modules/lead';
import { leadsWatchSaga } from 'modules/leads';
import {
  connectToWs,
  wsNotificationWatcherSaga,
} from 'modules/ws-notifications';

function* rootSaga() {
  try {
    yield all([
      // external
      call(routinePromiseWatcherSaga),
      fork(connectToWs),
      // app
      call(leadWatchSaga),
      call(leadsWatchSaga),
      call(wsNotificationWatcherSaga),
    ]);
  } catch (error) {
    throw error;
  }
}

export default rootSaga;
