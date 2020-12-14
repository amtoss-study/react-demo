import { State } from "../../store";
import { Visit } from "../Entities/Visits/types";
import { getVisitsByIds } from "../Entities/Visits/selectors";

export const getVisitsIds = (state: State): number[] =>
  state.visitsList.visitsIds;

export const getVisits = (state: State): Visit[] =>
  getVisitsByIds(state, getVisitsIds(state));

export const getIsLoading = (state: State): boolean =>
  state.visitsList.isLoading;

export const getError = (state: State) => state.visitsList.error;
