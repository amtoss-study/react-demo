import { matchPath } from "react-router-dom";
import { getLocation } from "connected-react-router";
import { createSelector } from "reselect";

import { State } from "store";
import { visitDetailsPath } from "urls";
import { getVisitById } from "containers/Entities/Visits/selectors";
import { Visit } from "containers/Entities/Visits/types";

export const getVisitId = (state: State): number | undefined => {
  const pathname = getLocation(state).pathname;
  const match = matchPath<{ id?: string }>(pathname, {
    path: visitDetailsPath,
  });
  if (match === null) return undefined;
  const params = match.params;
  if (params.id) return parseInt(params.id, 10);
};

export const getVisit: (state: State) => Visit | undefined = createSelector(
  (state) => state,
  getVisitId,
  (state, visitId) => {
    if (visitId !== undefined) {
      return getVisitById(state, visitId);
    }
  }
);

export const getIsLoading = (state: State): boolean =>
  state.visitDetails.isLoading;

export const getError = (state: State) => state.visitDetails.error;
