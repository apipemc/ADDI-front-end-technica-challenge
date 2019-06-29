import LeadsListScreen from 'views/screens/leads/list';
import LeadsNewScreen from 'views/screens/leads/new';
import LeadsEditScreen from 'views/screens/leads/edit';

const routes = [
  {
    path: '/',
    component: LeadsListScreen,
    exact: true,
  },
  {
    path: '/leads',
    component: LeadsListScreen,
    exact: true,
  },
  {
    path: '/leads/new',
    component: LeadsNewScreen,
    exact: true,
  },
  {
    path: '/leads/edit/:id',
    component: LeadsEditScreen,
    exact: true,
  },
  {
    path: '/leads/:id',
    component: () => null,
    exact: true,
  },
];

export default routes;
