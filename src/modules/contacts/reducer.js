import { fromJS } from 'immutable';
import { listContacts } from './actions';

const initialState = fromJS({
  loading: false,
  error: null,
  items: [],
});

const handleTrigger = state => state.set('loading', true);
const handleSuccess = (state, action) =>
  state.set('error', null).set('items', fromJS(action.payload));
const handleFailure = (state, action) => state.set('error', action.payload);
const handleFulfill = state => state.set('loading', false);

const handlers = {
  [listContacts.TRIGGER]: handleTrigger,
  [listContacts.SUCCESS]: handleSuccess,
  [listContacts.FAILURE]: handleFailure,
  [listContacts.FULFILL]: handleFulfill,
};

const eventsReducer = (state = initialState, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export default eventsReducer;
