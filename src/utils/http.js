import axios from 'axios';

const http = (path, method = 'get', params = {}) => {
  return axios({
    method,
    url: `${process.env.REACT_APP_API_HOST}/${path}`,
    data: params,
  });
};

export default http;
