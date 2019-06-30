import Loadable from 'react-loadable';
import LoadingOverlay from 'react-loading-overlay';

const AsyncAppContainer = Loadable({
  loader: () => import(/* webpackChunkName: 'app' */ 'views/containers/app'),
  loading: LoadingOverlay,
});

const AsyncLeadListScreen = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'lead-list' */ 'views/screens/leads/list'),
  loading: LoadingOverlay,
});

const AsyncLeadsNewScreen = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'lead-new' */ 'views/screens/leads/new'),
  loading: LoadingOverlay,
});

const AsyncLeadsEditScreen = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'lead-edit' */ 'views/screens/leads/edit'),
  loading: LoadingOverlay,
});

const routes = [
  {
    path: '/',
    component: AsyncAppContainer,
    routes: [
      {
        path: '/',
        component: AsyncLeadListScreen,
        exact: true,
      },
      {
        path: '/leads',
        component: AsyncLeadListScreen,
        exact: true,
      },
      {
        path: '/leads/new',
        component: AsyncLeadsNewScreen,
        exact: true,
      },
      {
        path: '/leads/edit/:id',
        component: AsyncLeadsEditScreen,
        exact: true,
      },
    ],
  },
];

export default routes;
