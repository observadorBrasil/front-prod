import {
  createUser,
  deleteUserById,
  login,
} from "../../../src/api/services/user";
import { setCookie } from "cookies-next";
import Router from "next/router";
import { SagaIterator } from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { UserActions } from "../slices/user";
import { ApiRequestWrapperResponse } from "../../api/interfaces/api-request-wrapper-response.interface";
import { UserInterface } from "../../api/services/user/interfaces/user.interface";

function* loginUserSaga({
  payload,
}: ReturnType<typeof UserActions.requestUserLogin>): SagaIterator {
  const res = yield call(login, payload);

  if (res.data) {
    setCookie("observatorio_token", res.data.accessToken, {
      sameSite: "strict",
    });
    yield put(UserActions.requestUserLoginSuccess(res.data));
  } else {
    yield put(UserActions.requestUserLoginFailed());
  }
}

function* registerUserSaga({
  payload,
}: ReturnType<typeof UserActions.requestUserRegister>): SagaIterator {
  try {
    const res: ApiRequestWrapperResponse<UserInterface> = yield call(createUser, payload);

    if (res.data) {
      Router.push("/usuarios");
      yield put(UserActions.requestUserRegisterSuccess());
    } else {
      yield put(UserActions.requestUserRegisterFailed());
    }
  } catch (error) {
    yield put(UserActions.requestUserRegisterFailed());
  }
}

function* deleteUserSaga({
  payload,
}: ReturnType<typeof UserActions.requestUserDelete>): SagaIterator {
  const res = yield call(deleteUserById, payload.userId);

  if (res.data) {
    yield put(UserActions.requestUserDeleteSuccess());
  } else {
    yield put(UserActions.requestUserDeleteFailed());
  }
}

export default all([
  takeLatest(UserActions.requestUserLogin, loginUserSaga),
  takeLatest(UserActions.requestUserRegister, registerUserSaga),
  takeLatest(UserActions.requestUserDelete, deleteUserSaga),
]);
