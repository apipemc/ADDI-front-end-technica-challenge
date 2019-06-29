import createImmutableSelector from 'utils/createImmutableSelector';

export const getLeads = state => state.get('leads');
export const isLoadingLeads = createImmutableSelector(getLeads, leads =>
  leads.get('loading')
);
export const getLeadsError = createImmutableSelector(getLeads, leads =>
  leads.get('error')
);
export const getLeadsItems = createImmutableSelector(getLeads, leads =>
  leads.get('items').toJS()
);
export const getLeadsMeta = createImmutableSelector(getLeads, leads =>
  leads.get('meta').toJS()
);
