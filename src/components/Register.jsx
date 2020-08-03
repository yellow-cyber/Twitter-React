import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../utils/api";
export default function Register({ setAuth }) {
  const [inputs, setInputs] = useState({
    displayName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { displayName, username, password, confirmPassword } = inputs;
  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/register", inputs);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <div className="wrapper fadeInDown mt-5">
        <div id="formContent">
          <div className="fadeIn first pt-5 pb-3">
            <h2>Register</h2>
          </div>
          <form onSubmit={onSubmitForm}>
            <input
              type="text"
              className="fadeIn second rounded-pill"
              name="displayName"
              placeholder="Display Name"
              value={displayName}
              onChange={(e) => onChange(e)}
            />
            <input
              type="text"
              id="register"
              className="fadeIn second rounded-pill"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => onChange(e)}
            />
            <input
              type="password"
              id="password"
              className="fadeIn third rounded-pill"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => onChange(e)}
            />
            <input
              type="password"
              id="password"
              className="fadeIn third rounded-pill"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => onChange(e)}
            />
            <input
              type="submit"
              className="fadeIn fourth rounded-pill"
              value="Register"
            />
          </form>

          <div id="formFooter">
            <Link to="/login" className="underlineHover text-decoration-none">
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
