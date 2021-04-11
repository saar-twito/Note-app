import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ user }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <NavLink
      className="nav-link disabled"
      style={{ marginLeft: "10px", fontWeight: "500", fontSize: "2rem" }}
      to="/todo"
    >
      ToDo
    </NavLink>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        {user && (
          <>
            <li className="nav-item">
              <NavLink className="nav-link disabled" to="/">
                {user.name}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/todo">
                My ToDos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/logout">
                Logout
              </NavLink>
            </li>
          </>
        )}

        {!user && (
          <React.Fragment>
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
               Register
              </NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </div>
  </nav>
);

export default NavBar;
