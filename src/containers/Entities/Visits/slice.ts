import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";

import { Visit } from "./types";

export type State = Record<number, Visit>;

type Reducers = {
  addVisits: CaseReducer<State, PayloadAction<Visit[]>>;
};

export const visitsSlice = createSlice<State, Reducers>({
  name: "visits",
  initialState: {},
  reducers: {
    addVisits: (state, action) => {
      action.payload.forEach((visit) => {
        state[visit.id] = visit;
      });
    },
  },
});

export const { addVisits } = visitsSlice.actions;

export default visitsSlice.reducer;
