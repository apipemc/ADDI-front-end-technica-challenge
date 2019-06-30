import { fromJS } from 'immutable';

import { connectRouter } from 'connected-react-router/immutable';
import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';

import lead from 'modules/lead';
import leads from 'modules/leads';
import wsNotifications from 'modules/ws-notifications';

import history from './history';

const appReducer = combineReducers({
  // external
  form,
  router: connectRouter(history),

  // app
  lead,
  leads,
  wsNotifications,
});

const actions = [];

const rootReducer = (state, action) => {
  if (actions.includes(action.type)) {
    // saves the persistence state to avoid being stuck at loading screen after
    const newState = fromJS({});
    return appReducer(newState, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
