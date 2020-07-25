import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../utils/api";

export default function Navbar({ setAuth, auth }) {
  const [profile, setProfile] = useState({
    username: "",
    displayName: "",
  });
  const { username, displayName } = profile;

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await api.get("/profile", {
          headers: { token: localStorage.token },
        });
        setProfile({
          username: response.data.username,
          displayName: response.data.displayName,
        });
      } catch (err) {
        setProfile([]);
        setAuth(false);
      }
    };
    getProfile();
  }, [auth, setAuth]); //issue
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
        <Link className="navbar-brand text-white" to="/">
          Twittur
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link text-light">
                Home
              </Link>
            </li>
          </ul> */}

          {username ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link text-light">
                  Hello, {displayName}
                </Link>
              </li>
              <li className="nav-item">
                <button
                  onClick={(e) => logout(e)}
                  className="btn btn-outline-light border rounded-pill"
                >
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/login" className="nav-link text-light">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/register"
                  className="nav-link text-light border rounded-pill"
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
