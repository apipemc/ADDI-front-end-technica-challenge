import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from 'views/components/header';

const App = ({ children }) => (
  <div className="container">
    <Header />
    <main className="content__main">{children}</main>
    <ToastContainer position={toast.POSITION.TOP_RIGHT} />
  </div>
);

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default App;
