import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Middleware, AnyAction } from "redux";
import createSagaMiddleware from "redux-saga";
import {
  connectRouter,
  routerMiddleware as createRouterMiddleware,
  RouterState,
} from "connected-react-router";
import { createBrowserHistory } from "history";

import visitsReducer, {
  State as VisitsState,
} from "containers/Entities/Visits/slice";
import visitsListReducer, {
  State as VisitsListState,
} from "containers/VisitsList/slice";
import visitDetailsReducer, {
  State as VisitDetailsState,
} from "containers/VisitDetails/slice";
import saga from "saga";

export type State = {
  router: RouterState;
  entities: {
    visits: VisitsState;
  };
  visitsList: VisitsListState;
  visitDetails: VisitDetailsState;
};

export const history = createBrowserHistory();

const routerMiddleware = createRouterMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const store = configureStore<State, AnyAction, Middleware[]>({
  reducer: {
    // @ts-ignore
    router: connectRouter(history),
    entities: combineReducers({
      visits: visitsReducer,
    }),
    visitsList: visitsListReducer,
    visitDetails: visitDetailsReducer,
  },
  middleware: [routerMiddleware, sagaMiddleware],
});

sagaMiddleware.run(saga);

export default store;
