import React, { Fragment, useEffect, useState } from "react";
import "./App.scss";
import { api } from "./utils/api";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
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
        <Navbar setAuth={setAuth} auth={isAuthenticated}></Navbar>
        <Switch>
          <Route exact path="/">
            {isAuthenticated ? <Home></Home> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/login">
            {!isAuthenticated ? (
              <Login setAuth={setAuth}></Login>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/register">
            {" "}
            {!isAuthenticated ? (
              <Register setAuth={setAuth}></Register>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
