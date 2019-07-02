import { routinePromiseWatcherSaga } from 'redux-saga-routines';
import { testSaga } from 'redux-saga-test-plan';
import { call, fork } from 'redux-saga/effects';

import { leadWatchSaga } from 'modules/lead';
import { leadsWatchSaga } from 'modules/leads';
import {
  connectToWs,
  wsNotificationWatcherSaga,
} from 'modules/ws-notifications';

import rootSaga from '../saga';

describe('Root saga', () => {
  it('should yield all the watchers', () => {
    testSaga(rootSaga)
      .next()
      .all([
        // external
        call(routinePromiseWatcherSaga),
        fork(connectToWs),

        // app
        call(leadWatchSaga),
        call(leadsWatchSaga),
        call(wsNotificationWatcherSaga),
      ])
      .next()
      .isDone();
  });
});
