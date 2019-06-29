import { routinePromiseWatcherSaga } from 'redux-saga-routines';
import { all, call } from 'redux-saga/effects';

import { contactWatchSaga } from 'modules/contact';
import { contactsWatchSaga } from 'modules/contacts';

function* rootSaga() {
  try {
    yield all([
      // external
      call(routinePromiseWatcherSaga),

      // app
      call(contactWatchSaga),
      call(contactsWatchSaga),
    ]);
  } catch (error) {
    throw error;
  }
}

export default rootSaga;
