import { put, all, takeEvery } from 'redux-saga/effects';
import { connect } from '@giantmachines/redux-websocket';

import { updateListLead } from 'modules/leads';
import { WS_MESSAGE_TYPE } from './types';

export function* connectToWs() {
  yield put(connect(`${process.env.REACT_APP_WSS_URL}`));
}

function* processMessage({ payload }) {
  const { type, data } = JSON.parse(payload.message);
  switch (type) {
    case 'UPDATE_LEAD::JUDICIAL_PASS':
    case 'UPDATE_LEAD::PERSONAL_INFORMATION':
    case 'UPDATE_LEAD::STATUS':
      yield put(updateListLead.success(data));
      break;
    default:
      break;
  }
}

export function* wsNotificationWatcherSaga() {
  yield all([takeEvery(WS_MESSAGE_TYPE, processMessage)]);
}
