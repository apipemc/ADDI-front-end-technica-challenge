import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { bindedCreateContact } from 'modules/contact';

import ContactForm from 'views/forms/contact';

const Screen = props => {
  const onSubmitSuccess = () => {
    const {
      history: { push },
    } = props;
    push('/contacts');
  };

  return (
    <div>
      <Link to="/contacts">Back</Link>
      <ContactForm
        onSubmitSuccess={onSubmitSuccess}
        onSubmit={bindedCreateContact}
      />
    </div>
  );
};

Screen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Screen;
