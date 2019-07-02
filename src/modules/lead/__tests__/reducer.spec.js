import { fromJS } from 'immutable';

import reducer from '../reducer';

import { retrieveLead } from '../actions';

describe('lead reducer', () => {
  let initialState;

  const MOCK_LEAD = {
    fist_name: 'JHON',
    last_name: 'DOE',
    document_type: 'CC',
    document_id: '000000000',
    email: 'john_doe@example.com',
    status: 'Prospect',
  };

  beforeEach(() => {
    initialState = reducer(undefined, {});
  });

  it('should return the initial state', () => {
    expect(initialState.toJS()).toEqual({
      error: null,
      item: {},
      loading: false,
    });
  });

  it(`should handle ${retrieveLead.TRIGGER}`, () => {
    const action = {
      type: retrieveLead.TRIGGER,
    };

    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(
      fromJS({
        loading: true,
        error: null,
        item: {},
      })
    );
  });

  it(`should handle ${retrieveLead.SUCCESS}`, () => {
    const action = {
      type: retrieveLead.SUCCESS,
      payload: MOCK_LEAD,
    };

    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(
      fromJS({
        loading: false,
        error: null,
        item: MOCK_LEAD,
      })
    );
  });

  it(`should handle ${retrieveLead.FAILURE}`, () => {
    const action = {
      type: retrieveLead.FAILURE,
      payload: 'MOCK_ERROR',
    };

    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(
      fromJS({
        loading: false,
        error: 'MOCK_ERROR',
        item: {},
      })
    );
  });

  it(`should handle ${retrieveLead.FULFILL}`, () => {
    const action = {
      type: retrieveLead.FULFILL,
    };

    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(
      fromJS({
        loading: false,
        error: null,
        item: {},
      })
    );
  });
});
