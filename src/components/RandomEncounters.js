//This module is responsible for rendering the user experience

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/navBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./RandomEncounters.css";


export const RandomEncounters = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("user")) {
          return (
            <>
              <NavBar />
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
);