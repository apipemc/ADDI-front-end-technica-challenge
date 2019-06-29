import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Table from 'views/components/table';

class ContactList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    listContacts: PropTypes.func.isRequired,
  };

  columns = [
    {
      titles: ['First Name'],
      paths: ['first_name'],
    },
    {
      titles: ['Last Name'],
      paths: ['last_name'],
    },
    {
      titles: ['Actions'],
      paths: [''],
      renderer: ({ item }) => (
        <>
          <Link to={`contacts/${item.id}`}>Editar</Link>
        </>
      ),
    },
  ];

  componentDidMount() {
    const { listContacts } = this.props;
    listContacts();
  }

  render() {
    const { loading, data } = this.props;
    return (
      <>
        <Link to="/contacts/new">New Contact</Link>
        <Table columns={this.columns} loading={loading} data={data} />
      </>
    );
  }
}

export default ContactList;
