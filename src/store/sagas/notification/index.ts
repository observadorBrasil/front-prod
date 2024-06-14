import { SagaIterator } from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { NotificationActions } from "../../slices/notification";
import {
  getActiveNotifications,
  markNotificationAsRead,
} from "../../../../src/api/services/notifications";

function* getNotificationsSaga(): SagaIterator {
  const res = yield call(getActiveNotifications);
  if (res.data) {
    yield put(NotificationActions.setNotifications(res.data));
  }
  yield put(NotificationActions.setLoading(false));
}

function* patchNotificationByIdSaga({
  payload,
}: ReturnType<typeof NotificationActions.setReadById>): SagaIterator {
  const res = yield call(markNotificationAsRead, payload);

  if (res.data) {
    yield put(NotificationActions.successfulSetRead());
  } else {
    yield put(NotificationActions.failedSetRead());
  }
}

export default all([
  takeLatest(NotificationActions.requestNotifications, getNotificationsSaga),
  takeLatest(NotificationActions.setReadById, patchNotificationByIdSaga),
]);
