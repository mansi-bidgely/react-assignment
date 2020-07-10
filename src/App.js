import React from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DashboardIndex from "./components/DashboardIndex.jsx";
import District from "./components/District";

import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={DashboardIndex}></Route>
          <Route exact path="/district" component={District}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
