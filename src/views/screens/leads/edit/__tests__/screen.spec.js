import React from 'react';
import { shallow } from 'enzyme';

import ScreenEdit from '../screen';

describe('ScreenNew', () => {
  const props = {
    match: {
      params: { id: '123' },
    },
    retrieveLead: jest.fn(),
    loading: false,
    history: {
      push: jest.fn(),
    },
  };

  const MOCK_LEAD = {
    address: 'Cra 46A #40AS -16',
    approved_judicial_past: false,
    approved_personal_information: true,
    document_id: '1095804909',
    document_type: 'CC',
    email: 'andrepipemc@gmail.com',
    first_name: 'Andres',
    last_name: 'Felipe',
    score: 0,
    status: 'Lost',
    _id: '5d180279b4e857d8c303edeb',
  };

  it('should render a view', () => {
    const wrapper = shallow(<ScreenEdit {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a view iteme', () => {
    const wrapper = shallow(<ScreenEdit {...props} loading item={MOCK_LEAD} />);
    expect(wrapper).toMatchSnapshot();
  });
});
