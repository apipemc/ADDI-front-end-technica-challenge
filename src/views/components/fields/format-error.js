import React from 'react';
import PropTypes from 'prop-types';
import humanize from 'humanize-string';
import capitalize from 'utils/capitalize';

const FormatError = ({ name, error }) => (
  <>
    {capitalize(humanize(`${name}`))} {error}
  </>
);

FormatError.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
};

export default FormatError;
