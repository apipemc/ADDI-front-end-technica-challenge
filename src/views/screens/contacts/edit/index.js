import { connect } from 'react-redux';
import {
  retrieveContact,
  isLoadingContact,
  getContactItem,
} from 'modules/contact';
import Screen from './screen';

const mapStateToProps = state => ({
  loading: isLoadingContact(state),
  item: getContactItem(state),
});

const mapDispatchToProps = {
  retrieveContact,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Screen);
