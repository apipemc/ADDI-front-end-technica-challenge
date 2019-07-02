import { fromJS } from 'immutable';

import reducer from '../reducer';
import { listLeads, updateListLead } from '../actions';

describe('lead reducer', () => {
  let initialState;

  const MOCK_LEADS = [
    {
      _id: 123,
      fist_name: 'JHON',
      last_name: 'DOE',
      document_type: 'CC',
      document_id: '000000000',
      email: 'john_doe@example.com',
      status: 'Prospect',
    },
  ];

  const MOCK_LEAD_UPDATE = {
    _id: 123,
    fist_name: 'JHON',
    last_name: 'DOE',
    document_type: 'CC',
    document_id: '111111',
    email: 'john_doe@example.com',
    status: 'Prospect',
  };

  beforeEach(() => {
    initialState = reducer(undefined, {});
  });

  it('should return the initial state', () => {
    expect(initialState.toJS()).toEqual({
      error: null,
      items: [],
      loading: false,
    });
  });

  describe('should handle listLeads', () => {
    it(`should handle ${listLeads.TRIGGER}`, () => {
      const action = {
        type: listLeads.TRIGGER,
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(
        fromJS({
          loading: true,
          error: null,
          items: [],
        })
      );
    });

    it(`should handle ${listLeads.SUCCESS}`, () => {
      const action = {
        type: listLeads.SUCCESS,
        payload: MOCK_LEADS,
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(
        fromJS({
          loading: false,
          error: null,
          items: MOCK_LEADS,
        })
      );
    });

    it(`should handle ${listLeads.FAILURE}`, () => {
      const action = {
        type: listLeads.FAILURE,
        payload: 'MOCK_ERROR',
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(
        fromJS({
          loading: false,
          error: 'MOCK_ERROR',
          items: [],
        })
      );
    });

    it(`should handle ${listLeads.FULFILL}`, () => {
      const action = {
        type: listLeads.FULFILL,
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(
        fromJS({
          loading: false,
          error: null,
          items: [],
        })
      );
    });
  });

  describe('should handle updateListLead', () => {
    it(`should handle ${updateListLead.SUCCESS} update lead by _id`, () => {
      const action = {
        type: updateListLead.SUCCESS,
        payload: MOCK_LEAD_UPDATE,
      };

      const newInitialState = initialState.set('items', fromJS(MOCK_LEADS));
      const nextState = reducer(newInitialState, action);
      expect(nextState).toEqual(
        fromJS({
          loading: false,
          error: null,
          items: [MOCK_LEAD_UPDATE],
        })
      );
    });

    it(`should handle ${updateListLead.SUCCESS} not items lead by _id`, () => {
      const action = {
        type: updateListLead.SUCCESS,
        payload: MOCK_LEAD_UPDATE,
      };

      const newInitialState = initialState.set('items', null);
      const nextState = reducer(newInitialState, action);
      expect(nextState).toEqual(
        fromJS({
          loading: false,
          error: null,
          items: null,
        })
      );
    });

    it(`should handle ${updateListLead.SUCCESS} not items not match lead by _id`, () => {
      const action = {
        type: updateListLead.SUCCESS,
        payload: {
          _id: 124,
        },
      };

      const newInitialState = initialState.set('items', fromJS(MOCK_LEADS));
      const nextState = reducer(newInitialState, action);
      expect(nextState).toEqual(
        fromJS({
          loading: false,
          error: null,
          items: MOCK_LEADS,
        })
      );
    });
  });
});
