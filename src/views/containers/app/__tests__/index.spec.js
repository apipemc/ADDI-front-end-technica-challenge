import React from 'react';
import { shallow } from 'enzyme';

import AppContainer from '../index';

describe('AppContainer', () => {
  it('should render a view', () => {
    const wrapper = shallow(
      <AppContainer>
        <span>Children</span>
      </AppContainer>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
