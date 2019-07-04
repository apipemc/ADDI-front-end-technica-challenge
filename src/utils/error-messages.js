import { SubmissionError } from 'redux-form/immutable';

const extractMessage = error => {
  if (error == null) {
    return null;
  }
  return Array.isArray(error) ? error.join('; ') : error;
};

export const errorToMsg = error => {
  const keys = ['message'];
  const message = keys
    .reduce((msgs, key) => {
      const msg = extractMessage(error[key]);
      if (msg) msgs.push(msg);

      return msgs;
    }, [])
    .join('; ');

  return message;
};

export const errorToSubmissionError = (error, payload) => {
  if (!payload.props || !payload.props.registeredFields) {
    return errorToMsg(error);
  }

  const generalError = errorToMsg(error);
  if (generalError) return new SubmissionError({ _error: generalError });

  const [...fields] = payload.props.registeredFields.keys();

  const fieldErrors = fields.reduce((errors, field) => {
    if (!error.errors[field]) return errors;
    const message = extractMessage(error.errors[field]);
    if (!message) return errors;
    return { ...errors, [field]: message };
  }, {});

  return new SubmissionError({ ...fieldErrors, _error: generalError });
};
