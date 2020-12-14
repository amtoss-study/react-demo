import {
  createSlice,
  createAction,
  CaseReducer,
  PayloadAction,
} from "@reduxjs/toolkit";

export type State = {
  visitsIds: number[];
  isLoading: boolean;
  error: string | undefined;
};

type Reducers = {
  loadVisitsAttempt: CaseReducer<State>;
  loadVisitsSuccess: CaseReducer<State, PayloadAction<number[]>>;
  loadVisitsError: CaseReducer<State, PayloadAction<string>>;
  addVisitSuccess: CaseReducer<State, PayloadAction<number>>;
  removeVisitSuccess: CaseReducer<State, PayloadAction<number>>;
  resetVisits: CaseReducer<State>;
};

const initialState: State = {
  visitsIds: [],
  isLoading: false,
  error: undefined,
};

export const LOAD_VISITS = "VisitsList/LOAD_VISITS";
export const loadVisits = createAction(LOAD_VISITS);

export const ADD_VISIT = "VisitsList/ADD_VISIT";
export const addVisit = createAction(ADD_VISIT, (name: string) => ({
  payload: name,
}));
export type AddVisitAction = ReturnType<typeof addVisit>;

export const REMOVE_VISIT = "VisitsList/REMOVE_VISIT";
export const removeVisit = createAction(REMOVE_VISIT, (visitId: number) => ({
  payload: visitId,
}));
export type RemoveVisitAction = ReturnType<typeof removeVisit>;

const visitsListSlice = createSlice<State, Reducers>({
  name: "visitsList",
  initialState,
  reducers: {
    loadVisitsAttempt: (state) => {
      state.isLoading = true;
      state.error = undefined;
    },
    loadVisitsSuccess: (state, action) => {
      state.visitsIds = action.payload;
      state.isLoading = false;
      state.error = undefined;
    },
    loadVisitsError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addVisitSuccess: (state, action) => {
      state.visitsIds.push(action.payload);
      state.isLoading = false;
      state.error = undefined;
    },
    removeVisitSuccess: (state, action) => {
      state.visitsIds = state.visitsIds.filter(
        (visitId) => visitId !== action.payload
      );
    },
    resetVisits: () => initialState,
  },
});

export const {
  loadVisitsAttempt,
  loadVisitsSuccess,
  loadVisitsError,
  addVisitSuccess,
  removeVisitSuccess,
  resetVisits,
} = visitsListSlice.actions;

export default visitsListSlice.reducer;
