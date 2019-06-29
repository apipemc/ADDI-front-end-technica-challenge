import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
    <div>
      <Link to="/leads">Back</Link>
      <LeadForm onSubmitSuccess={onSubmitSuccess} onSubmit={bindedCreateLead} />
    </div>
  );
};

Screen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Screen;
