import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../utils/api";

export default function Login({ setAuth }) {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const { username, password } = inputs;
  const onChange = (e) => {
    console.log(e.target.name);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", inputs);
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
            <h2>Login</h2>
          </div>

          <form onSubmit={onSubmitForm}>
            <input
              type="text"
              id="login"
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
              type="submit"
              className="fadeIn fourth rounded-pill"
              value="Log In"
            />
          </form>

          <div id="formFooter">
            <Link
              to="/register"
              className="underlineHover text-decoration-none"
            >
              Dont have an account?
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
