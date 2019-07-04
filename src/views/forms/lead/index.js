import { reduxForm } from 'redux-form/immutable';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';

import LeadForm from './form';

export default reduxForm({
  form: 'leads',
  onSubmitSuccess: (_, dispatch) => {
    dispatch(push('/leads'));
  },
  onSubmitFail: errors => {
    if (errors._error) {
      toast.error(errors._error);
    }
  },
})(LeadForm);
