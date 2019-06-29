import { fromJS } from 'immutable';
import { retrieveContact } from './actions';

const initialState = fromJS({
  loading: false,
  error: null,
  item: {},
});

const handleTrigger = state => state.set('loading', true);
const handleSuccess = (state, action) =>
  state.set('error', null).set('item', fromJS(action.payload));
const handleFailure = (state, action) => state.set('error', action.payload);
const handleFulfill = state => state.set('loading', false);

const handlers = {
  [retrieveContact.TRIGGER]: handleTrigger,
  [retrieveContact.SUCCESS]: handleSuccess,
  [retrieveContact.FAILURE]: handleFailure,
  [retrieveContact.FULFILL]: handleFulfill,
};

const checkInReducer = (state = initialState, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export default checkInReducer;
