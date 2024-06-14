import { SagaIterator } from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { toggleActiveSearch } from "../../../../src/api/services/search";
import { SearchActions } from "../../slices/search";

function* deleteSearchSaga({
  payload,
}: ReturnType<typeof SearchActions.requestSearchDelete>): SagaIterator {
  const id = payload;

  const res = yield call(toggleActiveSearch, id, false);
  if (res.data) {
    yield put(SearchActions.sucessfulSearchDelete(id));
  }
  yield put(SearchActions.setLoading(false));
}

export default all([
  takeLatest(SearchActions.requestSearchDelete, deleteSearchSaga),
]);
