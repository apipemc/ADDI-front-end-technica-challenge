import { takeLatest } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import http from 'utils/http';
import { listLeadsSaga, leadsWatchSaga } from '../sagas';
import { listLeads } from '../actions';

describe('leads sagas', () => {
  it('should handle listLeadsSaga', () => {
    testSaga(listLeadsSaga, listLeads())
      .next()
      .put(listLeads.request())
      .next()
      .call(http, 'leads')
      .next({ data: [] })
      .put(listLeads.success([]))
      .next()
      .put(listLeads.fulfill())
      .next()
      .isDone()
      // goes back to test failure
      .back(3)
      .throw({ message: 'error' })
      .put(listLeads.failure(new Error('error')))
      .next()
      .put(listLeads.fulfill())
      .next()
      .isDone();
  });

  it('should handle leadsWatchSaga', () => {
    testSaga(leadsWatchSaga)
      .next()
      .all([takeLatest(listLeads.TRIGGER, listLeadsSaga)])
      .next()
      .isDone();
  });
});
