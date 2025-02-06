import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <h1 className="logo">Counter App</h1>               
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "not-active")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active-link" : "not-active")}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/history" className={({ isActive }) => (isActive ? "active-link" : "not-active")}>
              History
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
