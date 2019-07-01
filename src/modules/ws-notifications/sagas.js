import { call, put, all, takeEvery } from 'redux-saga/effects';
import { connect } from '@giantmachines/redux-websocket';
import { toast } from 'react-toastify';

import { updateListLead } from 'modules/leads';
import { WS_MESSAGE_TYPE } from './types';

const toastVerificacion = (toastId, message) => {
  const isActive = toast.isActive(toastId);
  if (isActive) {
    toast.update(toastId, {
      render: message,
      type: toast.TYPE.SUCCESS,
    });
  } else {
    toast.success(message, { toastId });
  }
};

export function* connectToWs() {
  yield put(connect(`${process.env.REACT_APP_WSS_URL}`));
}

function* processMessage({ payload }) {
  const { type, data } = JSON.parse(payload.message);
  switch (type) {
    case 'UPDATE_LEAD::JUDICIAL_PASS':
    case 'UPDATE_LEAD::PERSONAL_INFORMATION':
    case 'UPDATE_LEAD::STATUS':
      yield call(
        toastVerificacion,
        data._id,
        `User infromation: ${data.document_id}, process completed correctly.!`
      );
      yield put(updateListLead.success(data));
      break;
    default:
      break;
  }
}

export function* wsNotificationWatcherSaga() {
  yield all([takeEvery(WS_MESSAGE_TYPE, processMessage)]);
}
