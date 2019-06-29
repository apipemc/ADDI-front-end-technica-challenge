import { fromJS } from 'immutable';
import { listLeads } from './actions';

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
  [listLeads.TRIGGER]: handleTrigger,
  [listLeads.SUCCESS]: handleSuccess,
  [listLeads.FAILURE]: handleFailure,
  [listLeads.FULFILL]: handleFulfill,
};

const reducer = (state = initialState, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export default reducer;
