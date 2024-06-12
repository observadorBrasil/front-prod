import {
  createPropositionFolder,
  patchPropositionFolder,
  removePropositionFolderById,
} from "@observatorio-brasil/atores/src/api/services/proposition-folders";
import { PropositionActions } from "@observatorio-brasil/atores/src/store/slices/proposition";
import { PropositionFolderActions } from "@observatorio-brasil/atores/src/store/slices/proposition/proposition-folder";
import { SagaIterator } from "redux-saga";
import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";

function* deletePropositionFolderByIdSaga({
  payload,
}: ReturnType<
  typeof PropositionFolderActions.requestRemovePropositionFolderById
>): SagaIterator {
  const res = yield call(
    removePropositionFolderById,
    payload.propositionFolderId
  );
  if (res.data) {
    yield put(PropositionFolderActions.sucessfulRemovePropositionFolderById());
    yield put(PropositionActions.refreshPropositionData());
  } else {
    yield put(PropositionFolderActions.failedRemovePropositionFolderById());
  }
}

function* createPropositionFolderSaga({
  payload,
}: ReturnType<
  typeof PropositionFolderActions.requestCreatePropositionFolder
>): SagaIterator {
  const res = yield call(
    createPropositionFolder,
    payload.propositionId,
    payload.folderId
  );
  if (res.data) {
    yield put(PropositionFolderActions.sucessfulCreatePropositionFolder());
    yield put(PropositionActions.refreshPropositionData());
  } else {
    yield put(PropositionFolderActions.failedCreatePropositionFolder());
  }
}

function* updatePropositionFolderSaga({
  payload,
}: ReturnType<
  typeof PropositionFolderActions.requestUpdatePropositionFolder
>): SagaIterator {
  const res = yield call(
    patchPropositionFolder,
    payload.propositionFolderId,
    payload.data
  );
  if (res.data) {
    yield put(PropositionFolderActions.successfulPropositionFolderUpdate());
    yield put(PropositionActions.refreshPropositionData());
  } else {
    yield put(PropositionFolderActions.failedPropositionFolderUpdate());
  }
}

export default all([
  takeEvery(
    PropositionFolderActions.requestRemovePropositionFolderById,
    deletePropositionFolderByIdSaga
  ),
  takeLatest(
    PropositionFolderActions.requestCreatePropositionFolder,
    createPropositionFolderSaga
  ),
  takeLatest(
    PropositionFolderActions.requestUpdatePropositionFolder,
    updatePropositionFolderSaga
  ),
]);
