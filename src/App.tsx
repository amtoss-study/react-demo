import React from "react";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { Provider } from "react-redux";

import Nav from "components/Nav";
import VisitsList from "containers/VisitsList";
import VisitDetails from "containers/VisitDetails";
import store, { history } from "store";
import { visitsListPath, visitDetailsPath } from "./urls";
import "./index.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Nav />
        <Switch>
          <Route path={visitsListPath} exact={true} component={VisitsList} />
          <Route path={visitDetailsPath} component={VisitDetails} />
          <Route>
            <h1>Page not found</h1>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
