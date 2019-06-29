import { connect } from 'react-redux';
import {
  listContacts,
  isLoadingContacts,
  getContactsItems,
} from 'modules/contacts';
import Screen from './screen';

const mapStateToProps = state => ({
  loading: isLoadingContacts(state),
  data: getContactsItems(state),
});

const mapDispatchToProps = {
  listContacts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Screen);
