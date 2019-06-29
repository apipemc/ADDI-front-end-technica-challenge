import { reduxForm } from 'redux-form/immutable';

import LeadForm from './form';

export default reduxForm({
  form: 'contacts',
})(LeadForm);
