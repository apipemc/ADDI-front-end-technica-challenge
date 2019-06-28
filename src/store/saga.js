import { routinePromiseWatcherSaga } from 'redux-saga-routines';
import { all, call } from 'redux-saga/effects';

function* rootSaga() {
  try {
    yield all([
      // external
      call(routinePromiseWatcherSaga),

      // app
    ]);
  } catch (error) {
    throw error;
  }
}

export default rootSaga;
