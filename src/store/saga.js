import { routinePromiseWatcherSaga } from 'redux-saga-routines';
import { all, call } from 'redux-saga/effects';

import { leadWatchSaga } from 'modules/lead';
import { leadsWatchSaga } from 'modules/leads';

function* rootSaga() {
  try {
    yield all([
      // external
      call(routinePromiseWatcherSaga),

      // app
      call(leadWatchSaga),
      call(leadsWatchSaga),
    ]);
  } catch (error) {
    throw error;
  }
}

export default rootSaga;
