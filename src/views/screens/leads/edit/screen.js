import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ClipLoader from 'react-spinners/ClipLoader';
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
      return <ClipLoader />;
    }

    return (
      <>
        <Link className="button" to="/leads">
          <span className="icon">
            <FontAwesomeIcon icon="arrow-left" />
          </span>
          <span>Back</span>
        </Link>
        <div className="form__new pt-20">
          <LeadForm
            initialValues={item}
            onSubmitSuccess={this.onSubmitSuccess}
            onSubmit={bindedUpdateLead}
          />
        </div>
      </>
    );
  }
}

export default Screen;
