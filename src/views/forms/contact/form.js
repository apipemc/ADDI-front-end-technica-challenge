import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { Form } from 'redux-form/immutable';
import { Hidden, Text, DatePicker, Select } from 'views/components/fields';
import format from 'date-fns/format';
import {
  required,
  email,
  length,
  date,
  numericality,
} from 'redux-form-validators';

const DocumentTypeOptions = [
  {
    value: '',
    label: 'Seleccione',
  },
  {
    value: 'CC',
    label: 'Cédula de Ciudadania',
  },
  {
    value: 'CE',
    label: 'Cédula de extranjeria',
  },
  {
    value: 'PS',
    label: 'Pasaporte',
  },
  {
    value: 'DNI',
    label: 'Documento Nacional de Identidad',
  },
  {
    value: 'Other',
    label: 'Otros',
  },
];

const GenderOptions = [
  {
    value: '',
    label: 'Seleccione',
  },
  {
    value: 'Male',
    label: 'Masculino',
  },
  {
    value: 'Female',
    label: 'Femenino',
  },
  {
    value: 'Other',
    label: 'Otros',
  },
];

const eighTeenYearsAgo = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 20);
  return d;
};

const maxDate = () => format(new Date(), 'yyyy-MM-dd');

const ContactsForm = ({
  initialValues,
  handleSubmit,
  pristine,
  submitting,
  invalid,
  submitFailed,
}) => (
  <Form onSubmit={handleSubmit}>
    <Hidden name="id" />
    <div>
      <label htmlFor="first_name">
        First Name:
        <Text
          id="first_name"
          name="first_name"
          placeholder="First Name"
          validate={[required()]}
        />
      </label>
    </div>
    <div>
      <label htmlFor="last_name">Last Name: </label>
      <Text
        id="last_name"
        name="last_name"
        placeholder="Last Name"
        validate={[required()]}
      />
    </div>
    <div>
      <label htmlFor="document_type">Document Type: </label>
      <Select
        id="document_type"
        name="document_type"
        options={DocumentTypeOptions}
        validate={[required()]}
      />
    </div>
    <div>
      <label htmlFor="email">Document: </label>
      <Text
        name="document_id"
        placeholder="Document"
        validate={[required(), length({ max: 12 })]}
      />
    </div>
    <div>
      <label htmlFor="date_of_expedition">Date of Expedition: </label>
      <DatePicker
        id="date_of_expedition"
        name="date_of_expedition"
        placeholder="Date of Expedition"
        max={maxDate()}
        validate={[
          required(),
          date({
            format: 'mm/dd/yyyy',
          }),
        ]}
      />
    </div>
    <div>
      <label htmlFor="email">Email:</label>
      <Text
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        validate={[required(), email()]}
      />
    </div>
    <div>
      <label htmlFor="date_of_birth">Date of Birthday: </label>
      <DatePicker
        id="date_of_birthday"
        name="date_of_birthday"
        placeholder="Date of Birthday"
        max={maxDate()}
        validate={[
          required(),
          date({
            format: 'mm/dd/yyyy',
            '<=': eighTeenYearsAgo,
            msg: 'you must be at least 18 years old',
          }),
        ]}
      />
    </div>
    <div>
      <label htmlFor="gender">Gender: </label>
      <Select
        id="gender"
        name="gender"
        options={GenderOptions}
        validate={[required()]}
      />
    </div>
    <div>
      <label htmlFor="address">Address: </label>
      <Text id="address" name="address" placeholder="Address" />
    </div>
    <div>
      <label htmlFor="neighborhood">Neighborhood: </label>
      <Text id="neighborhood" name="neighborhood" placeholder="Neighborhood" />
    </div>
    <div>
      <label htmlFor="phone_number">Phone Number: </label>
      <Text
        id="phone_number"
        name="phone_number"
        type="tel"
        placeholder="Phone Number"
        // validate={[numericality({ allowBlank: true}), length({ max: 11 })]}
      />
    </div>
    <div>
      <label htmlFor="mobile_number">Mobile Number: </label>
      <Text
        id="mobile_number"
        name="mobile_number"
        type="tel"
        placeholder="Mobile Number"
        validate={[numericality({ allowBlank: true }), length({ max: 11 })]}
      />
    </div>
    <button
      type="submit"
      disabled={pristine || submitting || (submitFailed ? false : invalid)}
    >
      {initialValues.has('id') ? 'Update' : 'Create'}
    </button>
  </Form>
);

ContactsForm.propTypes = {
  initialValues: PropTypes.shape({}),
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool.isRequired,
};

ContactsForm.defaultProps = {
  initialValues: fromJS({}),
};

export default ContactsForm;
