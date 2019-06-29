import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { bindedUpdateLead } from 'modules/lead';

import LeadForm from 'views/forms/lead';

class Screen extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    item: PropTypes.shape({}),
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    retrieveLead: PropTypes.func.isRequired,
  };

  static defaultProps = {
    item: null,
  };

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      retrieveLead,
    } = this.props;
    retrieveLead(id);
  }

  onSubmitSuccess = () => {
    const {
      history: { push },
    } = this.props;
    push('/leads');
  };

  render() {
    const { loading, item } = this.props;

    if (loading || !item) {
      return null;
    }

    return (
      <div>
        <Link to="/leads">Back</Link>
        <LeadForm
          initialValues={item}
          onSubmitSuccess={this.onSubmitSuccess}
          onSubmit={bindedUpdateLead}
        />
      </div>
    );
  }
}

export default Screen;