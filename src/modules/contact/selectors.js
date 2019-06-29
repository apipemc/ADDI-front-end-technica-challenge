import createImmutableSelector from 'utils/createImmutableSelector';

export const getContact = state => state.get('contact');
export const isLoadingContact = createImmutableSelector(getContact, contact =>
  contact.get('loading')
);
export const getContactError = createImmutableSelector(getContact, contact =>
  contact.get('error')
);
export const getContactItems = createImmutableSelector(getContact, contact =>
  contact.get('items').toJS()
);
export const getContactMeta = createImmutableSelector(getContact, contact =>
  contact.get('meta').toJS()
);
