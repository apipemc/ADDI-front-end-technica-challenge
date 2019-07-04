import React from 'react';
import { shallow } from 'enzyme';

import ScreenNew from '../index';

describe('ScreenNew', () => {
  it('should render a view', () => {
    const wrapper = shallow(<ScreenNew />);
    expect(wrapper).toMatchSnapshot();
  });
});
