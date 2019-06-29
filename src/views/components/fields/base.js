import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormatError from './format-error';

class BaseField extends Component {
  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    meta: PropTypes.shape({
      error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      touched: PropTypes.bool.isRequired,
      warning: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    }).isRequired,
  };

  errorMessage = () => {
    const {
      input: { name },
      meta: { touched, error },
    } = this.props;

    if (!touched || !error) {
      return null;
    }

    return (
      <span className="invalid-feedback">
        <FormatError name={name} error={error} />
      </span>
    );
  };

  warningMessage = () => {
    const {
      input: { name },
      meta: { touched, error, warning },
    } = this.props;

    if (!touched || error || !warning) {
      return null;
    }

    return (
      <span className="form-text text-warning">
        <FormatError name={name} error={error} />
      </span>
    );
  };
}

export default BaseField;
