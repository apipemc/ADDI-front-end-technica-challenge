import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import LeadForm from '../form';

describe('LeadForm', () => {
  let props;

  beforeEach(() => {
    props = {
      change: jest.fn(),
      error: '',
      handleSubmit: jest.fn(fn => () => fn(fromJS({}), 'dispatch', 'props')),
      onSubmit: jest.fn(),
      invalid: false,
      submitting: false,
    };
  });

  it('should render a view', () => {
    const wrapper = shallow(<LeadForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
