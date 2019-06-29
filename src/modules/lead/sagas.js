import { all, call, put, takeLatest } from 'redux-saga/effects';
import http from 'utils/http';
import { retrieveLead, createLead, updateLead } from './actions';

export function* retrieveLeadSaga({ payload }) {
  try {
    yield put(retrieveLead.request());
    const { data } = yield call(http, `leads/${payload}`);
    yield put(retrieveLead.success(data));
  } catch (error) {
    yield put(retrieveLead.failure(new Error(error.message)));
  } finally {
    yield put(retrieveLead.fulfill());
  }
}

export function* createLeadSaga({ payload }) {
  try {
    const values = payload.values.toJS();
    yield put(createLead.request());
    const { data } = yield call(http, 'leads', 'post', values);
    yield put(createLead.success(data));
  } catch (error) {
    yield put(createLead.failure(new Error(error.message)));
  } finally {
    yield put(createLead.fulfill());
  }
}

export function* updateLeadSaga({ payload }) {
  try {
    const values = payload.values.toJS();
    const { id, ...params } = values;
    yield put(updateLead.request());
    const { data } = yield call(http, `leads/${id}`, 'put', params);
    yield put(updateLead.success(data));
  } catch (error) {
    yield put(updateLead.failure(new Error(error.message)));
  } finally {
    yield put(updateLead.fulfill());
  }
}

export function* leadWatchSaga() {
  yield all([
    takeLatest(retrieveLead.TRIGGER, retrieveLeadSaga),
    takeLatest(createLead.TRIGGER, createLeadSaga),
    takeLatest(updateLead.TRIGGER, updateLeadSaga),
  ]);
}
