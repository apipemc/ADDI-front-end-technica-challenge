import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

// scrolls to top on every route change
history.listen(() => {
  window.scrollTo(0, 0);
});

export default history;
