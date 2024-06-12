import { patchTramitacao } from "@observatorio-brasil/atores/src/api/services/tramitacao";
import { SagaIterator } from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { PropositionActions } from "../../slices/proposition";
import { TramitacaoActions } from "../../slices/tramitacao";

function* updateTramitacaoSaga({
  payload,
}: ReturnType<typeof TramitacaoActions.requestTramitacaoUpdate>): SagaIterator {
  const res = yield call(patchTramitacao, payload.tramitacaoId, {
    ...payload.data,
  });

  if (res.data) {
    yield put(TramitacaoActions.successfulTramitacaoUpdateUpdate());
    yield put(PropositionActions.refreshPropositionData());
  } else {
    yield put(TramitacaoActions.failedTramitacaoUpdateUpdate());
  }
}

export default all([
  takeLatest(TramitacaoActions.requestTramitacaoUpdate, updateTramitacaoSaga),
]);
