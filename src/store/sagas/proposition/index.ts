import {
  getPropositionById,
  patchProposition,
} from "../../../api/services/propositions";
import { SagaIterator } from "redux-saga";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import {
  PropositionActions,
  selectProposition,
} from "../../slices/proposition";

function* getPropositionByIdSaga({
  payload,
}: ReturnType<
  typeof PropositionActions.requestGetPropositionById
>): SagaIterator {
  const res = yield call(getPropositionById, payload.propositionId);
  if (res.data) {
    yield put(PropositionActions.successfulGetPropositionById(res.data));
  } else {
    yield put(PropositionActions.failedGetPropositionById());
  }
}

function* refreshPropositionDataSaga(): SagaIterator {
  const proposition = yield select(selectProposition);
  if (proposition) {
    yield put(
      PropositionActions.requestGetPropositionById({
        propositionId: proposition.data.id,
      })
    );
  }
}

function* patchPropositionByIdSaga({
  payload,
}: ReturnType<
  typeof PropositionActions.requestPatchProposition
>): SagaIterator {
  const res = yield call(patchProposition, payload.propositionId, payload.data);

  if (res.data) {
    yield put(PropositionActions.sucessfulPatchProposition());
    yield put(PropositionActions.refreshPropositionData());
  } else {
    yield put(PropositionActions.failedPatchProposition());
  }
}

export default all([
  takeLatest(
    PropositionActions.requestGetPropositionById,
    getPropositionByIdSaga
  ),
  takeLatest(
    PropositionActions.refreshPropositionData,
    refreshPropositionDataSaga
  ),
  takeLatest(
    PropositionActions.requestPatchProposition,
    patchPropositionByIdSaga
  ),
]);
