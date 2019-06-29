import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';

import BaseField from './base';

class RenderTextField extends BaseField {
  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
      onBlur: PropTypes.func.isRequired,
      onChange: PropTypes.func.isRequired,
      onFocus: PropTypes.func.isRequired,
    }).isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool.isRequired,
      error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      warning: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    }).isRequired,
  };

  render() {
    const { input: inputProps, meta, ...rest } = this.props;
    return (
      <>
        <input {...inputProps} {...rest} />
        {this.errorMessage()}
        {this.warningMessage()}
      </>
    );
  }
}

export const TextField = props => (
  <Field component={RenderTextField} type="text" {...props} />
);

export default TextField;
