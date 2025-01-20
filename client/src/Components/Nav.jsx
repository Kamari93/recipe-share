import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Nav() {
  const navigate = useNavigate();
  const username = window.localStorage.getItem("username"); // Retrieve username from local storage
  const handleLogout = () => {
    // clear local storage
    window.localStorage.clear();
    axios.defaults.withCredentials = true;
    axios
      .get("https://recipe-share-server-brown.vercel.app/auth/logout")
      .then((result) => {
        // window.location.reload(); // reload the page
        navigate("/");
        window.location.reload(); // reload the page
      })
      .catch((err) => console.log(err));
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Recipes <i className="bi bi-egg-fried text-warning fs-2"></i>
        </Link>
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
          <ul className="navbar-nav ms-2 me-auto mb-2 mb-lg-0">
            {window.localStorage.getItem("id") && ( // Only show if user is logged in
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  aria-current="page"
                  to="/recipe/create-recipe"
                >
                  Create
                </Link>
              </li>
            )}
            {window.localStorage.getItem("id") && ( // Only show if user is logged in
              <li className="nav-item">
                <Link className="nav-link text-white" to="/recipe/saved-recipe">
                  Saved Recipes
                </Link>
              </li>
            )}
          </ul>
          {window.localStorage.length ? (
            <>
              <span className="navbar-text text-white me-3">
                Welcome, {username}
              </span>
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="btn btn-outline-light">
              <Link
                to="/auth/login"
                className="text-decoration-none text-warning"
              >
                Login/Register
              </Link>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
