// src/app/sagas.js

import { all, takeLatest, call, put } from "redux-saga/effects";
import {
  fetchApiSuccess,
  fetchApiFailure,
  fetchApiAllSuccess,
  fetchApiAllFailure
} from "./apiSlice";
import * as api from "./api"; // API functions

function* fetchSagaApi(action) {
  try {
    const apidata = yield call(api.getFetchApi, action.payload);
    yield put(fetchApiSuccess(apidata));
  } catch (error) {
    yield put(fetchApiFailure(error.message));
  }
}

function* fetchSagaApiAll(action) {
  try {
    const apidata = yield call(api.getFetchApiAll);
    yield put(fetchApiAllSuccess(apidata));
  } catch (error) {
    yield put(fetchApiAllFailure(error.message));
  }
}

function* fetchSaga() {
  yield takeLatest("apis/fetchApi", fetchSagaApi);
}

function* fetchSagaAll() {
  yield takeLatest("apis/fetchApiAll", fetchSagaApiAll);
}

export default function* rootSaga() {
  yield all([
    fetchSaga(),
    fetchSagaAll()
    // Add more sagas as needed
  ]);
}
