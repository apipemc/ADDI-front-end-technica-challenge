import { put, all, takeEvery } from 'redux-saga/effects';
import { connect } from '@giantmachines/redux-websocket';

import { WS_MESSAGE_TYPE } from './types';

export function* connectToWs() {
  yield put(connect(`${process.env.REACT_APP_WSS_URL}`));
}

// eslint-disable-next-line require-yield
function* processMessage({ payload }) {
  JSON.parse(payload.message);
}

export function* wsNotificationWatcherSaga() {
  yield all([takeEvery(WS_MESSAGE_TYPE, processMessage)]);
}
