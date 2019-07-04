import { SubmissionError } from 'redux-form';
import { takeLatest, call } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import { fromJS } from 'immutable';
import { toast } from 'react-toastify';
import http from 'utils/http';
import {
  retrieveLeadSaga,
  createLeadSaga,
  updateLeadSaga,
  sendValidationInfoLeadSaga,
  sendValidationCredLeadSaga,
  leadWatchSaga,
} from '../sagas';
import {
  retrieveLead,
  createLead,
  updateLead,
  sendValidationInfoLead,
  sendValidationCredLead,
} from '../actions';

describe('lead sagas', () => {
  it('should handle retrieveLeadSaga', () => {
    testSaga(retrieveLeadSaga, retrieveLead(123))
      .next()
      .put(retrieveLead.request())
      .next()
      .call(http, `leads/${123}`)
      .next({ data: { id: 123 } })
      .put(retrieveLead.success({ id: 123 }))
      .next()
      .put(retrieveLead.fulfill())
      .next()
      .isDone()
      // goes back to test failure
      .back(3)
      .throw({
        response: {
          data: { message: 'msg' },
        },
      })
      .call([toast, 'error'], 'msg')
      .next()
      .put(retrieveLead.failure('msg'))
      .next()
      .put(retrieveLead.fulfill())
      .next()
      .isDone();
  });

  it('should handle createLeadSaga', () => {
    const createPayload = {
      values: fromJS({ document_id: 123 }),
      props: {
        registeredFields: { keys: () => ['document_id'] },
      },
    };

    testSaga(createLeadSaga, createLead(createPayload))
      .next()
      .put(createLead.request())
      .next()
      .call(http, 'leads', 'post', { document_id: 123 })
      .next({ data: { document_id: 123 } })
      .put(createLead.success({ document_id: 123 }))
      .next()
      .call([toast, 'success'], 'Lead created correctly.!')
      .next()
      .put(createLead.fulfill())
      .next()
      .isDone()
      // goes back to test failure
      .back(3)
      .throw({
        response: {
          data: { errors: { document_id: 'required' } },
        },
      })
      .put(
        createLead.failure(
          new SubmissionError({ document_id: 'required', _error: '' })
        )
      )
      .next()
      .put(createLead.fulfill())
      .next()
      .isDone();
  });

  it('should handle updateLeadSaga', () => {
    const updatePayload = {
      values: fromJS({ _id: 123 }),
      props: {
        registeredFields: { keys: () => ['_id'] },
      },
    };

    testSaga(updateLeadSaga, updateLead(updatePayload))
      .next()
      .put(updateLead.request())
      .next()
      .call(http, `leads/123`, 'put', {})
      .next({ data: { _id: 123 } })
      .put(updateLead.success({ _id: 123 }))
      .next()
      .call([toast, 'success'], 'Lead updated correctly')
      .next()
      .put(updateLead.fulfill())
      .next()
      .isDone()
      // goes back to test failure
      .back(3)
      .throw({
        response: {
          data: { errors: { _id: 'required' } },
        },
      })
      .put(
        updateLead.failure(new SubmissionError({ _id: 'required', _error: '' }))
      )
      .next()
      .put(updateLead.fulfill())
      .next()
      .isDone();
  });

  it('should handle sendValidationInfoLeadSaga', () => {
    testSaga(
      sendValidationInfoLeadSaga,
      sendValidationInfoLead({
        _id: 123,
      })
    )
      .next()
      .put(sendValidationInfoLead.request())
      .next()
      .call([toast, 'info'], 'Sending validation information user...', {
        toastId: 123,
      })
      .next()
      .all([
        call(http, `leads/123/process_judicial_past`),
        call(http, `leads/123/process_personal_information`),
      ])
      .next()
      .put(sendValidationInfoLead.fulfill())
      .next()
      .isDone()
      // goes back to test failure
      .back(3)
      .throw({
        response: {
          data: { message: 'msg' },
        },
      })
      .put(sendValidationInfoLead.failure('msg'))
      .next()
      .put(sendValidationInfoLead.fulfill())
      .next()
      .isDone();
  });

  it('should handle sendValidationCredLeadSaga', () => {
    testSaga(
      sendValidationCredLeadSaga,
      sendValidationCredLead({
        _id: 123,
      })
    )
      .next()
      .put(sendValidationCredLead.request())
      .next()
      .call([toast, 'info'], 'Sending validation credit user...', {
        toastId: 123,
      })
      .next()
      .call(http, `leads/123/process_credit`)
      .next()
      .put(sendValidationCredLead.fulfill())
      .next()
      .isDone()
      // goes back to test failure
      .back(3)
      .throw({
        response: {
          data: { message: 'msg' },
        },
      })
      .put(sendValidationCredLead.failure('msg'))
      .next()
      .put(sendValidationCredLead.fulfill())
      .next()
      .isDone();
  });

  it('should handle leadWatchSaga', () => {
    testSaga(leadWatchSaga)
      .next()
      .all([
        takeLatest(retrieveLead.TRIGGER, retrieveLeadSaga),
        takeLatest(createLead.TRIGGER, createLeadSaga),
        takeLatest(updateLead.TRIGGER, updateLeadSaga),
        takeLatest(sendValidationInfoLead.TRIGGER, sendValidationInfoLeadSaga),
        takeLatest(sendValidationCredLead.TRIGGER, sendValidationCredLeadSaga),
      ])
      .next()
      .isDone();
  });
});
