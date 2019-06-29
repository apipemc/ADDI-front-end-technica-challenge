import React from 'react';
import PropTypes from 'prop-types';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import { Field } from 'redux-form/immutable';

import BaseField from './base';

class RenderDatePickerField extends BaseField {
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

const formatDate = value => {
  if (!value) {
    return value;
  }
  return format(parse(value, 'MM/dd/yyyy', new Date()), 'yyyy-MM-dd');
};

const normalize = value => {
  if (!value) {
    return value;
  }
  return format(parse(value, 'yyyy-MM-dd', new Date()), 'MM/dd/yyyy');
};

export const DatePickerField = props => (
  <Field
    component={RenderDatePickerField}
    type="date"
    format={formatDate}
    normalize={normalize}
    {...props}
  />
);

export default DatePickerField;
