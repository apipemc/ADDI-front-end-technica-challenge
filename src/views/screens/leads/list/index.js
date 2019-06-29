import { connect } from 'react-redux';
import { listLeads, isLoadingLeads, getLeadsItems } from 'modules/leads';
import Screen from './screen';

const mapStateToProps = state => ({
  loading: isLoadingLeads(state),
  data: getLeadsItems(state),
});

const mapDispatchToProps = {
  listLeads,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Screen);
