import React from 'react';
import { Link } from 'react-router-dom'
import './MainBar.css';

function MainBar() {
  return (
    <div className="body-nav">
      <div className="nav" id="nav">
        <div className="nav-menu">
          <div className="nav-menu-item" id="item1">
            <Link className="nav-link" to="/">Home</Link>
          </div>
          <div className="nav-menu-item" id="item2">
            <Link className="nav-link" to="/list-of-countries">Countries</Link>
          </div>
          <div className="nav-menu-item" id="item3">
            <Link className="nav-link" to="/register-artivity">Register Activity</Link>
          </div>
        </div>
      </div>
    </div>
  )
};

export default MainBar;