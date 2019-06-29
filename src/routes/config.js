import ContactListScreen from 'views/screens/contacts/list';
import ContactNewScreen from 'views/screens/contacts/new';
import ContactEditScreen from 'views/screens/contacts/edit';

const routes = [
  {
    path: '/',
    component: ContactListScreen,
    exact: true,
  },
  {
    path: '/contacts',
    component: ContactListScreen,
    exact: true,
  },
  {
    path: '/contacts/new',
    component: ContactNewScreen,
    exact: true,
  },
  {
    path: '/contacts/:id',
    component: ContactEditScreen,
    exact: true,
  },
];

export default routes;
