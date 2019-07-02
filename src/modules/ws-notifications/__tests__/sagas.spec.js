import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import { connect } from '@giantmachines/redux-websocket';
import { toastVerificacion } from 'utils/toast';
import { updateListLead } from 'modules/leads';
import {
  connectToWs,
  processMessage,
  wsNotificationWatcherSaga,
} from '../sagas';
import { WS_MESSAGE_TYPE } from '../types';

describe('ws notigication sagas', () => {
  xit('should handle connectToWs', () => {
    testSaga(connectToWs)
      .next()
      .put(connect('ws://localhost:8080'));
  });

  it('should handle processMessage', () => {
    const payload = {
      message: JSON.stringify({
        type: 'UPDATE_LEAD::JUDICIAL_PASS',
        data: { _id: 123, document_id: 11111 },
      }),
    };
    testSaga(processMessage, { payload })
      .next()
      .call(
        toastVerificacion,
        123,
        'User infromation: 11111, process completed correctly.!'
      )
      .next()
      .put(updateListLead.success(JSON.parse(payload.message).data))
      .next()
      .isDone();
  });

  it('should handle wsNotificationWatcherSaga', () => {
    testSaga(wsNotificationWatcherSaga)
      .next()
      .all([takeEvery(WS_MESSAGE_TYPE, processMessage)])
      .next()
      .isDone();
  });
});
