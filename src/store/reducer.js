import { fromJS } from 'immutable';

import { connectRouter } from 'connected-react-router/immutable';
import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import history from './history';

const appReducer = combineReducers({
  // external
  form,
  router: connectRouter(history),

  // app
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
