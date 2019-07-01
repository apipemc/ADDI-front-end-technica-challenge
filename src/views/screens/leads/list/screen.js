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
    sendValidationInfoLead: PropTypes.func.isRequired,
    sendValidationCredLead: PropTypes.func.isRequired,
  };

  columns = [
    {
      titles: ['Full Name'],
      paths: [''],
      renderer: ({ item }) => (
        <span>{`${item.first_name} ${item.last_name}`}</span>
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
    {
      titles: ['Information'],
      paths: [''],
      renderer: ({ item }) => {
        if (
          !item.approved_judicial_past &&
          !item.approved_personal_information &&
          item.status === 'Prospect'
        ) {
          return (
            <button
              className="button"
              type="button"
              onClick={() => this.handleValidationInfo(item)}
            >
              Validar
            </button>
          );
        }
        const status =
          item.approved_judicial_past && item.approved_personal_information
            ? 'Yes'
            : 'No';
        return status;
      },
    },
    {
      titles: ['Credito'],
      paths: [''],
      renderer: ({ item }) => {
        if (
          item.approved_judicial_past &&
          item.approved_personal_information &&
          item.status === 'Prospect'
        ) {
          return (
            <button
              className="button"
              type="button"
              onClick={() => this.handleValidationCred(item)}
            >
              Validar
            </button>
          );
        }
        const status =
          item.approved_judicial_past && item.approved_personal_information
            ? 'Yes'
            : 'No';
        return status;
      },
    },
    {
      titles: ['Actions'],
      paths: [''],
      renderer: ({ item }) => <Link to={`leads/edit/${item._id}`}>Editar</Link>,
    },
  ];

  componentDidMount() {
    const { listLeads } = this.props;
    listLeads();
  }

  handleValidationInfo = item => {
    const { sendValidationInfoLead } = this.props;
    sendValidationInfoLead(item);
  };

  handleValidationCred = item => {
    const { sendValidationCredLead } = this.props;
    sendValidationCredLead(item);
  };

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
