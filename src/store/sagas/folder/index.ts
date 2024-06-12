import { patchFolder } from "../../../api/services/folders";
import { SagaIterator } from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { FolderActions } from "../../slices/folder";
import { PropositionActions } from "../../slices/proposition";

function* updateFolderSaga({
  payload,
}: ReturnType<typeof FolderActions.requestFolderUpdate>): SagaIterator {
  const res = yield call(patchFolder, payload.folderId, payload.data);
  if (res.data) {
    yield put(FolderActions.successfulFolderUpdate());
    yield put(PropositionActions.refreshPropositionData());
  } else {
    yield put(FolderActions.failedFolderUpdate());
  }
}

export default all([
  takeLatest(FolderActions.requestFolderUpdate, updateFolderSaga),
]);
