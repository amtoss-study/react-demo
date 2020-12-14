import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import visitsReducer, {
  State as VisitsState,
} from "./containers/Entities/Visits/slice";
import visitsListReducer, {
  State as VisitsListState,
} from "./containers/VisitsList/slice";
import visitDetailsReducer, {
  State as VisitDetailsState,
} from "./containers/VisitDetails/slice";
import saga from "./saga";

export type State = {
  entities: {
    visits: VisitsState;
  };
  visitsList: VisitsListState;
  visitDetails: VisitDetailsState;
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore<State>({
  reducer: {
    entities: combineReducers({
      visits: visitsReducer,
    }),
    visitsList: visitsListReducer,
    visitDetails: visitDetailsReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(saga);

export default store;
