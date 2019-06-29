import { reduxForm } from 'redux-form/immutable';

import ContactsForm from './form';

export default reduxForm({
  form: 'contacts',
  enableReinitialize: true,
})(ContactsForm);
