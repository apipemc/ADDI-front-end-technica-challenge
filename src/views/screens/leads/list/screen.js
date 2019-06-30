import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Table from 'views/components/table';

class LeadList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    listLeads: PropTypes.func.isRequired,
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
      titles: ['Status'],
      paths: ['status'],
    },
    {
      titles: ['Actions'],
      paths: [''],
      renderer: ({ item }) => (
        <>
          <Link to={`leads/edit/${item._id}`}>Editar</Link>
        </>
      ),
    },
  ];

  componentDidMount() {
    const { listLeads } = this.props;
    listLeads();
  }

  render() {
    const { loading, data } = this.props;
    return (
      <>
        <Link to="/leads/new">New Lead</Link>
        <Table columns={this.columns} loading={loading} data={data} />
      </>
    );
  }
}

export default LeadList;
