import createImmutableSelector from 'utils/createImmutableSelector';

export const getLead = state => state.get('lead');
export const isLoadingLead = createImmutableSelector(getLead, lead =>
  lead.get('loading')
);
export const getLeadError = createImmutableSelector(getLead, lead =>
  lead.get('error')
);
export const getLeadItem = createImmutableSelector(getLead, lead =>
  lead.get('item').toJS()
);
