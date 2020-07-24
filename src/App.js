import React, { Fragment, useEffect, useState } from "react";
import "./App.scss";
import { api } from "./utils/api";
import UsersList from "./components/users/UsersList";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await api.get("/verify", {
        headers: { token: localStorage.token },
      });
      res.data === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      console.log("sod sa app.js");
    } catch (err) {
      setIsAuthenticated(false);
      console.error(err.message);
    }
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    checkAuthenticated();
  }, [isAuthenticated]);
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  return (
    <Fragment>
      <Router>
        <Navbar setAuth={setAuth}></Navbar>
        <Switch>
          <Route exact path="/">
            {isAuthenticated ? <Home></Home> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/login">
            {!isAuthenticated ? (
              <Login setAuth={setAuth}></Login>
            ) : (
              <Redirect to="/home" />
            )}
          </Route>
          <Route exact path="/register">
            {" "}
            {!isAuthenticated ? (
              <Register setAuth={setAuth}></Register>
            ) : (
              <Redirect to="/home" />
            )}
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
