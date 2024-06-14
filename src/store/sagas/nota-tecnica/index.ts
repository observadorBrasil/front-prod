import { SagaIterator } from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { PropositionActions } from "../../slices/proposition";
import { TechnicalNoteActions } from "../../slices/nota-tecnica";
import {
  createTechnicalNote,
  removeTechnicalNote,
  updateTechnicalNote,
} from "../../../../src/api/services/notas-tecnicas";

function* createTechnicalNoteSaga({
  payload,
}: ReturnType<
  typeof TechnicalNoteActions.requestTechnicalNoteCreation
>): SagaIterator {
  const res = yield call(createTechnicalNote, {
    ...payload.data,
  });

  if (res.data) {
    yield put(TechnicalNoteActions.successfulTechnicalNoteCreation());
    yield put(PropositionActions.refreshPropositionData());
  } else {
    yield put(TechnicalNoteActions.failedTechnicalNoteCreation());
  }
}

function* updateTechnicalNoteSaga({
  payload,
}: ReturnType<
  typeof TechnicalNoteActions.requestTechnicalNoteUpdate
>): SagaIterator {
  const res = yield call(updateTechnicalNote, payload.technicalNoteId, {
    ...payload.data,
  });

  if (res.data) {
    yield put(TechnicalNoteActions.successfulTechnicalNoteUpdate());
    yield put(PropositionActions.refreshPropositionData());
  } else {
    yield put(TechnicalNoteActions.failedTechnicalNoteUpdate());
  }
}

function* removeTechnicalNoteSaga({
  payload,
}: ReturnType<
  typeof TechnicalNoteActions.requestTechnicalNoteRemoval
>): SagaIterator {
  const res = yield call(removeTechnicalNote, payload.technicalNoteId);

  if (res.data) {
    yield put(TechnicalNoteActions.successfulTechnicalNoteRemoval());
    yield put(PropositionActions.refreshPropositionData());
  } else {
    yield put(TechnicalNoteActions.failedTechnicalNoteRemoval());
  }
}

export default all([
  takeLatest(
    TechnicalNoteActions.requestTechnicalNoteCreation,
    createTechnicalNoteSaga
  ),
  takeLatest(
    TechnicalNoteActions.requestTechnicalNoteUpdate,
    updateTechnicalNoteSaga
  ),
  takeLatest(
    TechnicalNoteActions.requestTechnicalNoteRemoval,
    removeTechnicalNoteSaga
  ),
]);
