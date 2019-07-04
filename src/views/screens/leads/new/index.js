import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { bindedCreateLead } from 'modules/lead';

import LeadForm from 'views/forms/lead';

const Screen = () => (
  <>
    <Link className="button" to="/leads">
      <span className="icon">
        <FontAwesomeIcon icon="arrow-left" />
      </span>
      <span>Back</span>
    </Link>
    <div className="form__new pt-20">
      <LeadForm onSubmit={bindedCreateLead} />
    </div>
  </>
);

export default Screen;
