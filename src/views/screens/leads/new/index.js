import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { bindedCreateLead } from 'modules/lead';

import LeadForm from 'views/forms/lead';

const Screen = props => {
  const onSubmitSuccess = () => {
    const {
      history: { push },
    } = props;
    push('/leads');
  };

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
          onSubmitSuccess={onSubmitSuccess}
          onSubmit={bindedCreateLead}
        />
      </div>
    </>
  );
};

Screen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Screen;
