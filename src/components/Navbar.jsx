import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { api } from "../utils/api";

export default function Navbar({ setAuth }) {
  const [profile, setProfile] = useState([]);
  const { username, displayName, following, followers, posts } = profile;
  const getProfile = async () => {
    try {
      console.log("sod");
      const response = await api.get("/profile", {
        headers: { token: localStorage.token },
      });
      setProfile(response.data);
    } catch (err) {
      setAuth(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, [username]); //issue
  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-violet">
        <a className="navbar-brand" href="#">
          Twittur
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link text-light">
                Home
              </Link>
            </li>
          </ul>

          {username ? (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link text-light">
                  Hello, {displayName}
                </Link>
              </li>
              <li className="nav-item">
                <button
                  onClick={(e) => logout(e)}
                  className="btn btn-outline-light border rounded"
                >
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/login" className="nav-link text-light">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/register"
                  className="nav-link text-light border rounded"
                >
                  Register
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </Fragment>
  );
}
