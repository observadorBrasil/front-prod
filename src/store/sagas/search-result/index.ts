import { SagaIterator } from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { SearchResultActions } from "../../slices/search-result";
import { getSearchById } from "../../../../src/api/services/search";
import {
  getResultsBySearchId,
  updateResultById,
} from "../../../../src/api/services/search-result";

function* getSearchResultsSaga({
  payload,
}: ReturnType<typeof SearchResultActions.requestSearchResults>): SagaIterator {
  const { searchId } = payload;

  const [currentSearch, searchResults] = yield all([
    call(getSearchById, searchId),
    call(getResultsBySearchId, searchId, ""),
  ]);

  if (currentSearch.data && searchResults.data) {
    yield put(SearchResultActions.setCurrentSearch(currentSearch.data));
    yield put(SearchResultActions.setSearchResults(searchResults.data));
  }
  yield put(SearchResultActions.setLoading(false));
}

function* updateSearchResultsSaga({
  payload,
}: ReturnType<
  typeof SearchResultActions.requestUpdateSearchResult
>): SagaIterator {
  const { id, status } = payload;

  const res = yield call(updateResultById, id, status);
  if (res.data) {
    yield put(SearchResultActions.sucessfulUpdateSearchResult(res.data));
  }
  yield put(SearchResultActions.setLoading(false));
}

export default all([
  takeLatest(SearchResultActions.requestSearchResults, getSearchResultsSaga),
  takeLatest(
    SearchResultActions.requestUpdateSearchResult,
    updateSearchResultsSaga
  ),
]);
