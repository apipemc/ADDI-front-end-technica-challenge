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

const ContactsForm = ({ initialValues, handleSubmit, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Hidden name="_id" />
    <div className="field">
      <label className="label" htmlFor="first_name">
        First Name:
      </label>
      <div className="control-input">
        <Text
          id="first_name"
          name="first_name"
          placeholder="First Name"
          validate={[required()]}
        />
      </div>
    </div>
    <div className="field">
      <label className="label" htmlFor="last_name">
        Last Name:{' '}
      </label>
      <div className="control-input">
        <Text
          id="last_name"
          name="last_name"
          placeholder="Last Name"
          validate={[required()]}
        />
      </div>
    </div>
    <div className="field">
      <label className="label" htmlFor="document_type">
        Document Type:{' '}
      </label>
      <div className="control-input">
        <div className="select">
          <Select
            id="document_type"
            name="document_type"
            options={DocumentTypeOptions}
            validate={[required()]}
          />
        </div>
      </div>
    </div>
    <div className="field">
      <label className="label" htmlFor="email">
        Document:{' '}
      </label>
      <div className="control-input">
        <Text
          name="document_id"
          placeholder="Document"
          validate={[required(), length({ max: 12 })]}
        />
      </div>
    </div>
    <div className="field">
      <label className="label" htmlFor="date_of_expedition">
        Date of Expedition:{' '}
      </label>
      <div className="control-input">
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
    </div>
    <div className="field">
      <label className="label" htmlFor="email">
        Email:
      </label>
      <div className="control-input">
        <Text
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          validate={[required(), email()]}
        />
      </div>
    </div>
    <div className="field">
      <label className="label" htmlFor="date_of_birth">
        Date of Birthday:{' '}
      </label>
      <div className="control-input">
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
    </div>
    <div className="field">
      <label className="label" htmlFor="gender">
        Gender:{' '}
      </label>
      <div className="control-input">
        <div className="select">
          <Select
            id="gender"
            name="gender"
            options={GenderOptions}
            validate={[required()]}
          />
        </div>
      </div>
    </div>
    <div className="field">
      <label className="label" htmlFor="address">
        Address:{' '}
      </label>
      <div className="control-input">
        <Text id="address" name="address" placeholder="Address" />
      </div>
    </div>
    <div className="field">
      <label className="label" htmlFor="neighborhood">
        Neighborhood:{' '}
      </label>
      <div className="control-input">
        <Text
          id="neighborhood"
          name="neighborhood"
          placeholder="Neighborhood"
        />
      </div>
    </div>
    <div className="field">
      <label className="label" htmlFor="phone_number">
        Phone Number:{' '}
      </label>
      <div className="control-input">
        <Text
          id="phone_number"
          name="phone_number"
          type="tel"
          placeholder="Phone Number"
          validate={[numericality({ allowBlank: true }), length({ max: 11 })]}
        />
      </div>
    </div>
    <div className="field">
      <label className="label" htmlFor="mobile_number">
        Mobile Number:{' '}
      </label>
      <div className="control-input">
        <Text
          id="mobile_number"
          name="mobile_number"
          type="tel"
          placeholder="Mobile Number"
          validate={[numericality({ allowBlank: true }), length({ max: 11 })]}
        />
      </div>
    </div>
    <div className="field">
      <div className="control-input">
        <button
          className="button success is-fullwidth"
          type="submit"
          disabled={submitting}
        >
          {initialValues.has('id') ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  </Form>
);

ContactsForm.propTypes = {
  initialValues: PropTypes.shape({}),
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

ContactsForm.defaultProps = {
  initialValues: fromJS({}),
};

export default ContactsForm;
