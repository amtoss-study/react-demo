import {
  createSlice,
  createAction,
  CaseReducer,
  PayloadAction,
} from "@reduxjs/toolkit";

export type State = {
  isLoading: boolean;
  error: string | undefined;
};

type Reducers = {
  loadVisitAttempt: CaseReducer<State>;
  loadVisitSuccess: CaseReducer<State>;
  loadVisitError: CaseReducer<State, PayloadAction<string>>;
};

const initialState: State = {
  isLoading: false,
  error: undefined,
};

export const LOAD_VISIT = "VisitDetails/LOAD_VISIT";
export const loadVisit = createAction(LOAD_VISIT, (id: number) => ({
  payload: id,
}));
export type LoadVisitAction = ReturnType<typeof loadVisit>;

export const EDIT_VISIT = "VisitDetails/EDIT_VISIT";
export const editVisit = createAction(
  EDIT_VISIT,
  (id: number, name: string) => ({
    payload: {
      id,
      name,
    },
  })
);
export type EditVisitAction = ReturnType<typeof editVisit>;

const visitDetailsSlice = createSlice<State, Reducers>({
  name: "visitsList",
  initialState,
  reducers: {
    loadVisitAttempt: (state) => {
      state.isLoading = true;
      state.error = undefined;
    },
    loadVisitSuccess: (state) => {
      state.isLoading = false;
      state.error = undefined;
    },
    loadVisitError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loadVisitAttempt,
  loadVisitSuccess,
  loadVisitError,
} = visitDetailsSlice.actions;

export default visitDetailsSlice.reducer;
