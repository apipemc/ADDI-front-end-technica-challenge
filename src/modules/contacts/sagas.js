import { all, call, put, takeLatest } from 'redux-saga/effects';
import http from 'utils/http';

import { listContacts } from './actions';

export function* listEventsSaga() {
  try {
    yield put(listContacts.request());
    const { data } = yield call(http, 'contacts');
    yield put(listContacts.success(data));
  } catch (error) {
    yield put(listContacts.failure(new TypeError(error)));
  } finally {
    yield put(listContacts.fulfill());
  }
}

export function* contactsWatchSaga() {
  yield all([takeLatest(listContacts.TRIGGER, listEventsSaga)]);
}
