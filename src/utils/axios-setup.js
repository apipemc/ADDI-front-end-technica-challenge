import axios from 'axios';

axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.response.use(
  res => res,
  error => {
    if (!error.response) {
      Object.assign(error, {
        response: { data: { message: 'Network not available' } },
        status: 0,
      });
    }
    if (error.response.status === 307) {
      Object.assign(error, {
        response: { data: { message: 'Redirect service network' } },
        status: error.response.status,
      });
    }
    if (error.response.status === 408 || error.code === 'ECONNABORTED') {
      Object.assign(error, {
        response: {
          data: { message: `A time happend on url ${error.config.url}` },
          status: error.response.status,
        },
      });
    }
    if (error.response.status === 500) {
      Object.assign(error, {
        response: {
          data: { message: 'The execution of the service failed in some way.' },
          status: error.response.status,
        },
      });
    }
    return Promise.reject(error);
  }
);
