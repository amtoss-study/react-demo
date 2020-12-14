import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Nav from "./components/Nav";
import VisitsList from "./containers/VisitsList";
import VisitDetails from "./containers/VisitDetails";
import "./index.css";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Nav />
        <Switch>
          <Route path="/visits/:visitId" component={VisitDetails} />
          <Route path="/" component={VisitsList} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
