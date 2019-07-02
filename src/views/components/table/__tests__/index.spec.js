import React from 'react';
import { shallow } from 'enzyme';

import Table from '../index';

describe('Table', () => {
  const MOCK_COLUMNS = [
    {
      titles: ['Full Name'],
      paths: [''],
      renderer: items => (
        <span>{`${items.item.first_name} ${items.item.last_name}`}</span>
      ),
    },
    {
      titles: ['Email'],
      paths: ['email'],
    },
    {
      titles: ['Document Type'],
      paths: ['document_type'],
    },
    {
      titles: ['Document'],
      paths: ['document_id'],
    },
    {
      titles: ['Score'],
      paths: ['score'],
    },
    {
      titles: ['Status'],
      paths: ['status'],
    },
  ];

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
    const wrapper = shallow(
      <Table loading columns={MOCK_COLUMNS} data={MOCK_DATA} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a view loading', () => {
    const wrapper = shallow(<Table loading />);
    expect(wrapper).toMatchSnapshot();
  });
});
