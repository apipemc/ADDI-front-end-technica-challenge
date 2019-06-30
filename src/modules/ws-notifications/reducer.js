import { fromJS } from 'immutable';
import { WS_MESSAGE_TYPE } from './types';

const initalState = fromJS({
  error: null,
  lastMessage: null,
});

const handleWsMessage = (state, action) =>
  state.set('lastMessage', fromJS(action.payload));

const handlers = {
  [WS_MESSAGE_TYPE]: handleWsMessage,
};

const wsNotificationsReducer = (state = initalState, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export default wsNotificationsReducer;
