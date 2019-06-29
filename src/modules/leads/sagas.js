import { all, call, put, takeLatest } from 'redux-saga/effects';
import http from 'utils/http';

import { listLeads } from './actions';

export function* listLeadsSaga() {
  try {
    yield put(listLeads.request());
    const { data } = yield call(http, 'leads');
    yield put(listLeads.success(data));
  } catch (error) {
    yield put(listLeads.failure(new Error(error.message)));
  } finally {
    yield put(listLeads.fulfill());
  }
}

export function* leadsWatchSaga() {
  yield all([takeLatest(listLeads.TRIGGER, listLeadsSaga)]);
}
