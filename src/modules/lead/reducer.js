import { fromJS } from 'immutable';
import { retrieveLead } from './actions';

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
  [retrieveLead.TRIGGER]: handleTrigger,
  [retrieveLead.SUCCESS]: handleSuccess,
  [retrieveLead.FAILURE]: handleFailure,
  [retrieveLead.FULFILL]: handleFulfill,
};

const reducer = (state = initialState, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export default reducer;
