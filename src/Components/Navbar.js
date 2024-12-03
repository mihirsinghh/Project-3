// imports
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
    <nav className="navbar">
    <Link to="/" className="logo">
      BookWorm
    </Link>
    <Link to="/favorites" className="bookmarks-link">
      Bookmarks
    </Link>
  </nav>
);

export default Navbar;