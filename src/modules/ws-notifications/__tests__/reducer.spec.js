import { fromJS } from 'immutable';

import reducer from '../reducer';
import { WS_MESSAGE_TYPE } from '../types';

describe('ws notificaction reducer', () => {
  let initialState;

  const MOCK_PAYLOAD = {
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
      lastMessage: null,
    });
  });

  it(`should handle ${WS_MESSAGE_TYPE}`, () => {
    const action = {
      type: WS_MESSAGE_TYPE,
      payload: MOCK_PAYLOAD,
    };

    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(
      fromJS({
        error: null,
        lastMessage: MOCK_PAYLOAD,
      })
    );
  });
});
