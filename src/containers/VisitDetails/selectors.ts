import { State } from "../../store";

export const getIsLoading = (state: State): boolean =>
  state.visitDetails.isLoading;

export const getError = (state: State) => state.visitDetails.error;
