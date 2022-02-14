/* eslint-disable no-unused-vars */
import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import * as types from '../types/cities';
import * as actions from '../actions/cities';
import * as actionsS from '../actions/index';

function* getCitiesFrom(action) {
  const { type, payload } = action;
  const city = payload;
  const { data } = yield call(
    axios.get,
    `http://localhost:4000/cities?city=${city}`,
  );
  yield put(actions.getNewCitiesFrom(data));
}

function* getCitiesTo(action) {
  const { type, payload } = action;
  const city = payload;
  const { data } = yield call(
    axios.get,
    `http://localhost:4000/cities?city=${city}`,
  );
  yield put(actions.getNewCitiesTo(data));
}

function* giveAwayInfoForTicket(action) {
  const { type, payload } = action;
  const {
    from, to, datefrom, dateto,
  } = payload;
  const { data } = yield call(axios.post, 'http://localhost:4000/tickets', {
    origin: from, destination: to, departureAt: datefrom, returnAt: dateto,
  });
  yield put(actionsS.getSliderResSuccess({ data }));
}

export default function* getCitiesSaga() {
  yield takeEvery(types.GET_CITIES_FROM, getCitiesFrom);
  yield takeEvery(types.GET_CITIES_TO, getCitiesTo);
  yield takeEvery(types.GET_INFO_FOR_TICKET, giveAwayInfoForTicket);
}
