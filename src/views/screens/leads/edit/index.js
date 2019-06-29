import { connect } from 'react-redux';
import { retrieveLead, isLoadingLead, getLeadItem } from 'modules/lead';
import Screen from './screen';

const mapStateToProps = state => ({
  loading: isLoadingLead(state),
  item: getLeadItem(state),
});

const mapDispatchToProps = {
  retrieveLead,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Screen);
