import { connect } from 'react-redux';
import { listLeads, isLoadingLeads, getLeadsItems } from 'modules/leads';
import { sendValidationInfoLead, sendValidationCredLead } from 'modules/lead';
import Screen from './screen';

const mapStateToProps = state => ({
  loading: isLoadingLeads(state),
  data: getLeadsItems(state),
});

const mapDispatchToProps = {
  listLeads,
  sendValidationInfoLead,
  sendValidationCredLead,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Screen);
