import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContactList extends Component {
  static propTypes = {
    listContacts: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { listContacts } = this.props;
    listContacts();
  }

  render() {
    return <span>Screen List</span>;
  }
}

export default ContactList;
