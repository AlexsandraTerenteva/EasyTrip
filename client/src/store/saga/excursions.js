import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import * as types from '../types/excursions';
import * as actions from '../actions/excursions';

function* getExcursions(action) {
  const { payload } = action;
  try {
    const { data } = yield call(axios.post, 'http://localhost:4000/excursions', payload, { withCredentials: true });
    yield put(actions.getExcursionsCitySuccess(data));
  } catch (error) {
    yield put(actions.getExcursionsCityError());
  }
}

function* postBokingExcursion(action) {
  const { payload } = action;
  try {
    const { data } = yield call(axios.post, 'http://localhost:4000/excursions/booking', payload, { withCredentials: true });
    yield put(actions.postExcursionBookingSuccess(data));
  } catch (error) {
    yield put(actions.postExcursionBookingError());
  }
}

export default function* excursionsSaga() {
  yield takeEvery(types.GET_EXCURSIONS_CITY_START, getExcursions);
  yield takeEvery(types.POST_EXCURSION_BOOKING_START, postBokingExcursion);
}
