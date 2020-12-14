import { State } from "../../../store";
import { Visit } from "./types";

export const getVisitById = (state: State, id: number): Visit | undefined =>
  state.entities.visits[id];

export const getVisitsByIds = (state: State, ids: number[]): Visit[] =>
  ids
    .map((id) => state.entities.visits[id])
    .filter((visit) => visit !== undefined);
