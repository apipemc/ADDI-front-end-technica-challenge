import { fromJS } from 'immutable';

import {
  getLeads,
  isLoadingLeads,
  getLeadsError,
  getLeadsItems,
} from '../selectors';

describe('leads selectors', () => {
  let state;

  const MOCK_INITIAL_STATE = {
    loading: false,
    error: 'error',
    items: [],
  };

  beforeEach(() => {
    state = fromJS({ leads: MOCK_INITIAL_STATE });
  });

  it('should handle getLeads', () => {
    expect(getLeads(state)).toEqual(fromJS(MOCK_INITIAL_STATE));
  });

  it('should handle isLoadingLeads', () => {
    expect(isLoadingLeads(state)).toBe(false);
  });

  it('should handle getLeadsError', () => {
    expect(getLeadsError(state)).toBe('error');
  });

  it('should handle getLeadsItems', () => {
    expect(getLeadsItems(state)).toEqual([]);
  });
});
