import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';

import BaseField from './base';

class RenderSelectField extends BaseField {
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

  static defaultProps = {
    options: [],
  };

  renderOptions = ({ value, label }) => (
    <option key={value} value={value}>
      {label}
    </option>
  );

  render() {
    const { input: inputProps, meta, options, ...rest } = this.props;
    return (
      <>
        <select {...inputProps} {...rest}>
          {options.map(this.renderOptions)}
        </select>
        {this.errorMessage()}
        {this.warningMessage()}
      </>
    );
  }
}

export const SelectField = props => (
  <Field component={RenderSelectField} {...props} />
);

export default SelectField;
