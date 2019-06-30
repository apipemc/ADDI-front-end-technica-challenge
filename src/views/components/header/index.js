import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import Logo from 'assets/img/logo-addi.png';

const Header = () => (
  <header>
    <nav className="navbar" role="navigation" aria-label="navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src={Logo} alt="Logo Addi" />
        </Link>
      </div>
      <ul className="navbar-items">
        <li className="navbar-item">
          <NavLink to="/leads">Leads</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
