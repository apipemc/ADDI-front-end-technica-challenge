import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { bindedUpdateContact } from 'modules/contact';

import ContactForm from 'views/forms/contact';

class Screen extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    item: PropTypes.shape({}),
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    retrieveContact: PropTypes.func.isRequired,
  };

  static defaultProps = {
    item: null,
  };

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      retrieveContact,
    } = this.props;
    retrieveContact(id);
  }

  onSubmitSuccess = () => {
    const {
      history: { push },
    } = this.props;
    push('/contacts');
  };

  render() {
    const { loading, item } = this.props;

    if (loading || !item) {
      return null;
    }

    return (
      <div>
        <Link to="/contacts">Back</Link>
        <ContactForm
          initialValues={item}
          onSubmitSuccess={this.onSubmitSuccess}
          onSubmit={bindedUpdateContact}
        />
      </div>
    );
  }
}

export default Screen;
