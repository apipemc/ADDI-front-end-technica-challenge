import { all, call, put, takeLatest } from 'redux-saga/effects';
import http from 'utils/http';
import { errorToMsg, errorToSubmissionError } from 'utils/error-messages';
import {
  retrieveLead,
  createLead,
  updateLead,
  sendValidationInfoLead,
  sendValidationCredLead,
} from './actions';

export function* retrieveLeadSaga({ payload }) {
  try {
    yield put(retrieveLead.request());
    const { data } = yield call(http, `leads/${payload}`);
    yield put(retrieveLead.success(data));
  } catch ({ response }) {
    yield put(retrieveLead.failure(errorToMsg(response.data)));
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
  } catch ({ response }) {
    yield put(
      createLead.failure(errorToSubmissionError(response.data.errors, payload))
    );
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
  } catch ({ response }) {
    yield put(
      updateLead.failure(errorToSubmissionError(response.data.errors, payload))
    );
  } finally {
    yield put(updateLead.fulfill());
  }
}

export function* sendValidationInfoLeadSaga({ payload }) {
  try {
    yield put(sendValidationInfoLead.request());
    yield all([
      call(http, `leads/${payload._id}/process_judicial_past`),
      call(http, `leads/${payload._id}/process_personal_information`),
    ]);
  } catch ({ response }) {
    yield put(sendValidationInfoLead.failure(errorToMsg(response.data)));
  } finally {
    yield put(sendValidationInfoLead.fulfill());
  }
}

export function* sendValidationCredLeadSaga({ payload }) {
  try {
    yield put(sendValidationCredLead.request());
    yield call(http, `leads/${payload._id}/process_credit`);
  } catch ({ response }) {
    yield put(sendValidationCredLead.failure(errorToMsg(response.data)));
  } finally {
    yield put(sendValidationCredLead.fulfill());
  }
}

export function* leadWatchSaga() {
  yield all([
    takeLatest(retrieveLead.TRIGGER, retrieveLeadSaga),
    takeLatest(createLead.TRIGGER, createLeadSaga),
    takeLatest(updateLead.TRIGGER, updateLeadSaga),
    takeLatest(sendValidationInfoLead.TRIGGER, sendValidationInfoLeadSaga),
    takeLatest(sendValidationCredLead.TRIGGER, sendValidationCredLeadSaga),
  ]);
}
