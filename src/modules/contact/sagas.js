import { all, call, put, takeLatest } from 'redux-saga/effects';
import http from 'utils/http';
import { retrieveContact, createContact, updateContact } from './actions';

export function* retrieveContactSaga() {
  try {
    yield put(retrieveContact.request());
    const response = yield call(http, '');
    yield put(retrieveContact.success(response));
  } catch (error) {
    yield put(retrieveContact.failure(error));
  } finally {
    yield put(retrieveContact.fulfill());
  }
}

export function* createContactSaga({ payload }) {
  try {
    const values = payload.values.toJS();
    yield put(createContact.request());
    const response = yield call(http, '', values);
    yield put(createContact.success(response));
  } catch (error) {
    yield put(createContact.failure(new TypeError(payload)));
  } finally {
    yield put(createContact.fulfill());
  }
}

export function* updateContactSaga({ payload }) {
  try {
    const values = payload.values.toJS();
    yield put(updateContact.request());
    const response = yield call(http, '', values);
    yield put(updateContact.success(response.data));
  } catch (error) {
    yield put(updateContact.failure(new TypeError(payload)));
  } finally {
    yield put(updateContact.fulfill());
  }
}

export function* contactWatchSaga() {
  yield all([
    takeLatest(retrieveContact.TRIGGER, retrieveContactSaga),
    takeLatest(createContact.TRIGGER, createContactSaga),
    takeLatest(updateContact.TRIGGER, updateContactSaga),
  ]);
}
