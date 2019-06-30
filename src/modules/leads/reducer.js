import { fromJS } from 'immutable';
import { listLeads, updateListLead } from './actions';

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

const handleUpdateLeadSuccess = (state, { payload }) => {
  return state.set('error', null).update('items', items => {
    if (!items) {
      return items;
    }
    const { _id } = payload;
    const idx = items.findIndex(item => item.get('_id') === _id);
    if (idx === -1) {
      return items;
    }
    return items.set(idx, fromJS(payload));
  });
};

const handlers = {
  [listLeads.TRIGGER]: handleTrigger,
  [listLeads.SUCCESS]: handleSuccess,
  [listLeads.FAILURE]: handleFailure,
  [listLeads.FULFILL]: handleFulfill,
  [updateListLead.SUCCESS]: handleUpdateLeadSuccess,
};

const reducer = (state = initialState, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export default reducer;
