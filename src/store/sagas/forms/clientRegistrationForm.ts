import { SagaIterator } from "redux-saga";
import { all, takeLatest } from "redux-saga/effects";
import { FormsActions } from "../../slices/forms";

function* submitClientRegistrationSaga({
  payload,
}: ReturnType<
  typeof FormsActions.requestClientRegistrationFormSubmit
>): SagaIterator {
  // const res: ApiRequestWrapperResponse<ClientInterface> = yield call(
  //   createClient,
  //   {
  //     ...payload,
  //     contractStartDate: new Date(payload.contractStartDate),
  //   }
  // );
  // if (res.data) {
  //   yield put(FormsActions.clientRegistrationFormSubmitSuccessful());
  //   Router.push(`/clientes/${res.data.id}/proposicoes`);
  // } else {
  //   yield put(FormsActions.clientRegistrationFormSubmitFailed());
  // }
}

export default all([
  takeLatest(
    FormsActions.requestClientRegistrationFormSubmit,
    submitClientRegistrationSaga
  ),
]);
