import React from 'react';
import { Field } from 'redux-form/immutable';

const HiddenField = props => (
  <Field type="hidden" component="input" disabled {...props} />
);

export default HiddenField;
