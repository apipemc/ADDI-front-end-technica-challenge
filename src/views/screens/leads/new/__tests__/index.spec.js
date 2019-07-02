import React from 'react';
import { shallow } from 'enzyme';

import ScreenNew from '../index';

describe('ScreenNew', () => {
  const props = {
    history: { push: jest.fn() },
  };

  it('should render a view', () => {
    const wrapper = shallow(<ScreenNew {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
