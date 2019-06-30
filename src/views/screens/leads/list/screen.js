import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        <Link className="button" to="/leads/new">
          <span className="icon">
            <FontAwesomeIcon icon="plus" />
          </span>
          <span>New Lead</span>
        </Link>
        <div className="container__table pt-20">
          <Table columns={this.columns} loading={loading} data={data} />
        </div>
      </>
    );
  }
}

export default LeadList;
