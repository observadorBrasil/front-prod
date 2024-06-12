import { SagaIterator } from "redux-saga";
import { all } from "redux-saga/effects";
import UserSaga from "./user";
import ClientRegistrationFormSaga from "./forms/clientRegistrationForm";
import PropositionSagas from "./proposition";
import PropositionFoldersSagas from "./proposition/proposition-folder";
import FolderSagas from "./folder";
import TechnicalNoteSagas from "./nota-tecnica";
import TramitacaoSagas from "./tramitacao";
import NotificationSagas from "./notification";
import SearchSaga from "./search";
import SearchResultsSaga from "./search-result";

export default function* rootSaga(): SagaIterator {
  yield all([
    UserSaga,
    ClientRegistrationFormSaga,
    PropositionSagas,
    PropositionFoldersSagas,
    FolderSagas,
    TechnicalNoteSagas,
    TramitacaoSagas,
    NotificationSagas,
    SearchSaga,
    SearchResultsSaga,
  ]);
}
