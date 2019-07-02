import React from 'react';
import { shallow } from 'enzyme';

import ScreenList from '../screen';

describe('ScreenNew', () => {
  const props = {
    listLeads: jest.fn(),
    sendValidationCredLead: jest.fn(),
    sendValidationInfoLead: jest.fn(),
    loading: false,
    data: [],
  };

  const MOCK_DATA = [
    {
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
    },
  ];

  it('should render a view', () => {
    const wrapper = shallow(<ScreenList {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a view render data', () => {
    const wrapper = shallow(<ScreenList {...props} loading data={MOCK_DATA} />);
    expect(wrapper).toMatchSnapshot();
  });
});
