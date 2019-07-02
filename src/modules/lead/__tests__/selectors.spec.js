import { fromJS } from 'immutable';

import {
  getLead,
  isLoadingLead,
  getLeadError,
  getLeadItem,
} from '../selectors';

describe('lead selectors', () => {
  let state;

  const MOCK_INITIAL_STATE = {
    loading: false,
    error: 'error',
    item: {},
  };

  beforeEach(() => {
    state = fromJS({ lead: MOCK_INITIAL_STATE });
  });

  it('should handle getLead', () => {
    expect(getLead(state)).toEqual(fromJS(MOCK_INITIAL_STATE));
  });

  it('should handle isLoadingLead', () => {
    expect(isLoadingLead(state)).toBe(false);
  });

  it('should handle getLeadError', () => {
    expect(getLeadError(state)).toBe('error');
  });

  it('should handle getLeadItem', () => {
    expect(getLeadItem(state)).toEqual({});
  });
});
