import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div style={{paddingLeft: 100}} className="container-fluid">
        <a className="navbar-brand" href="/Home">SO1 | calculator</a>
    </div>
    <div style={{paddingRight: 1300}} className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <a className="nav-link" href="/Home">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/Logs">Logs</a>
        </li>
      </ul>
    </div>
    </nav>
  );
};

export default NavBar;