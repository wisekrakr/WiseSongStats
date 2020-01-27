import React from "react";
import { Link } from "react-router-dom";

import Search from "../activities/Search";

// TODO: Create a nav bar with links to different pages with multiple stats
// The Homepage will be the top 10 songs in the US and the search option
// One page will be a top 5 in mulitple countries
// Another page with top 5 in multiple genres....etc
const Header = () => {
  return (
    <header className="site-menu">
      <Link to="/" className="navbar-brand nav-link ">
        <img
          src="https://raw.githubusercontent.com/wisekrakr/portfolio_res/master/images/calavera.gif"
          alt=""
        />
      </Link>

      <div className="menu-btn">
        <div className="btn-line"></div>
        <div className="btn-line"></div>
        <div className="btn-line"></div>
      </div>
      <nav className="menu">
        <div className="menu-branding">
          <div className="portrait"></div>
        </div>
        <ul className="menu-nav">
          <li className="nav-item nav-menu-item">
            <Link to="/" className="nav-link text-lg ">
              Home
            </Link>
          </li>
          <li className="nav-item nav-menu-item">
            <Link to="/countries/" className="nav-link text-lg ">
              Countries
            </Link>
          </li>
          <li className="nav-item nav-menu-item">
            <Link to="/about/" className="nav-link text-lg ">
              About
            </Link>
          </li>
          <li className="nav-item nav-menu-item">
            <Link to="/contact/" className="nav-link text-lg ">
              Contact
            </Link>
          </li>
          <Search />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
