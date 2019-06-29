import createImmutableSelector from 'utils/createImmutableSelector';

export const getContacts = state => state.get('contacts');
export const isLoadingContacts = createImmutableSelector(
  getContacts,
  contacts => contacts.get('loading')
);
export const getContactsError = createImmutableSelector(getContacts, contacts =>
  contacts.get('error')
);
export const getContactsItems = createImmutableSelector(getContacts, contacts =>
  contacts.get('items').toJS()
);
export const getContactsMeta = createImmutableSelector(getContacts, contacts =>
  contacts.get('meta').toJS()
);
