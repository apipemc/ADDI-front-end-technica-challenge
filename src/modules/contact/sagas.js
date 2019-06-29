import { all, call, put, takeLatest } from 'redux-saga/effects';
import http from 'utils/http';
import { retrieveContact, createContact, updateContact } from './actions';

export function* retrieveContactSaga({ payload }) {
  try {
    yield put(retrieveContact.request());
    const { data } = yield call(http, `contacts/${payload}`);
    yield put(retrieveContact.success(data));
  } catch (error) {
    yield put(retrieveContact.failure(new Error(error.message)));
  } finally {
    yield put(retrieveContact.fulfill());
  }
}

export function* createContactSaga({ payload }) {
  try {
    const values = payload.values.toJS();
    yield put(createContact.request());
    const { data } = yield call(http, 'contacts', 'post', values);
    yield put(createContact.success(data));
  } catch (error) {
    yield put(createContact.failure(new Error(error.message)));
  } finally {
    yield put(createContact.fulfill());
  }
}

export function* updateContactSaga({ payload }) {
  try {
    const values = payload.values.toJS();
    const { id, ...params } = values;
    yield put(updateContact.request());
    const { data } = yield call(http, `contacts/${id}`, 'put', params);
    yield put(updateContact.success(data));
  } catch (error) {
    yield put(updateContact.failure(new Error(error.message)));
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
