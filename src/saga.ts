import {
  call,
  put,
  select,
  takeLatest,
  takeEvery,
  all,
} from "redux-saga/effects";

import api from "api";
import {
  loadVisitsAttempt,
  loadVisitsSuccess,
  loadVisitsError,
  addVisitSuccess,
  removeVisitSuccess,
  resetVisits,
  LOAD_VISITS,
  ADD_VISIT,
  AddVisitAction,
  REMOVE_VISIT,
  RemoveVisitAction,
} from "containers/VisitsList/slice";
import {
  loadVisitAttempt,
  loadVisitSuccess,
  loadVisitError,
  LOAD_VISIT,
  LoadVisitAction,
  EDIT_VISIT,
  EditVisitAction,
} from "containers/VisitDetails/slice";
import { addVisits } from "containers/Entities/Visits/slice";
import { Visit } from "containers/Entities/Visits/types";
import { getVisitsIds } from "containers/VisitsList/selectors";
import { getVisitById } from "containers/Entities/Visits/selectors";

function* fetchVisits() {
  yield put(resetVisits());
  yield put(loadVisitsAttempt());
  try {
    const data: Visit[] = yield call(api.get, "visits");
    yield put(addVisits(data));
    yield put(loadVisitsSuccess(data.map((visit) => visit.id)));
  } catch (error) {
    yield put(loadVisitsError(error));
  }
}

function* fetchVisit(action: LoadVisitAction) {
  const visitId = action.payload;
  const state = yield select();
  const visit = getVisitById(state, visitId);
  if (visit !== undefined) {
    // don't fetch visit if it is already in store
    return;
  }
  yield put(loadVisitAttempt());
  try {
    const data: Visit = yield call(api.get, `visits/${visitId}`);
    yield put(addVisits([data]));
    yield put(loadVisitSuccess());
  } catch (error) {
    yield put(loadVisitError(error));
  }
}

function* addVisit(action: AddVisitAction) {
  yield put(loadVisitsAttempt());
  try {
    const data = yield call(api.post, "visits", {
      name: action.payload,
      timestamp: Date.now(),
    });
    yield put(addVisits([data]));
    yield put(addVisitSuccess(data.id));
  } catch (error) {
    yield put(loadVisitsError(error));
  }
}

function* editVisit(action: EditVisitAction) {
  const { id, name } = action.payload;
  yield put(loadVisitAttempt());
  try {
    const data: Visit = yield call(api.patch, `visits/${id}`, { name });
    yield put(addVisits([data]));
    yield put(loadVisitSuccess());
  } catch (error) {
    yield put(loadVisitError(error));
  }
}

function* removeVisit(action: RemoveVisitAction) {
  const state = yield select();
  const visitsIds = getVisitsIds(state);
  const removedVisitId = action.payload;
  yield put(removeVisitSuccess(removedVisitId));
  try {
    yield call(api.del, `visits/${removedVisitId}`);
  } catch (error) {
    yield put(loadVisitsError(error));
    yield put(loadVisitsSuccess(visitsIds));
  }
}

export default function* saga() {
  yield all([
    takeLatest(LOAD_VISITS, fetchVisits),
    takeEvery(REMOVE_VISIT, removeVisit),
    takeEvery(ADD_VISIT, addVisit),
    takeEvery(LOAD_VISIT, fetchVisit),
    takeEvery(EDIT_VISIT, editVisit),
  ]);
}
