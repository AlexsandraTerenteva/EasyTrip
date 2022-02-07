/* eslint-disable max-len */
/* eslint-disable spaced-comment */
import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import * as types from '../types/map';
import * as actions from '../actions/map';
import { getSliderResSuccess } from '../actions';
import transformDate from '../../utils/transformDate';

const currentFormateDate = 'YYYY-MM-DD';
const date = transformDate(new Date(), currentFormateDate);

function* getCitiesLocation(action) {
  const { payload } = action;
  yield put(actions.getCitiesLocationLoader());
  try {
    const { data } = yield call(() => axios.get(`http://map.aviasales.ru/supported_directions.json?origin_iata=${payload.iata}&one_way=true&locale=ru`));
    const { origin, directions } = data;
    const destination = directions.filter((item) => item.direct === true);
    yield put(actions.getCitiesLocationSuccess({ origin, destination }));
    yield put(actions.getTicketsPriceSaga({ iata: payload.iata, period: date }));
  } catch (error) {
    yield put(actions.getCitiesLocationError(error));
  }
}

function* getTicketsPrice(action) {
  const { payload } = action;
  yield put(actions.getTicketsPriceLoader());
  try {
    const { data } = yield call(() => axios.get(`http://map.aviasales.ru/prices.json?origin_iata=${payload.iata}&period=${payload.period}:season&direct=true&one_way=true&no_visa=true&schengen=true&need_visa=true&locale=ru&min_trip_duration_in_days=5&max_trip_duration_in_days=15`));
    const actialPrice = data.filter((item) => item.actual === true && !item.number_of_changes);
    const { data: airlinaName } = yield call(() => axios.post('http://localhost:4000/airline', actialPrice));
    yield put(actions.getTicketsPriceSuccess(airlinaName));
  } catch (error) {
    yield put(actions.getTicketsPriceError(error));
  }
}

function* findCurrentTicket(action) {
  const { payload } = action;
  const {
    origin, ticket,
  } = payload;
  const { iata, price } = ticket;
  const correctDate = transformDate(price.depart_date, currentFormateDate);
  const ticketReq = {
    origin: origin.iata, destination: iata, departureAt: correctDate, returnAt: '',
  };
  try {
    const { data } = yield call(axios.post, 'http://localhost:4000/tickets', ticketReq);
    yield put(actions.findCurrentTicketSuccess(data));
    yield put(getSliderResSuccess({ data }));
  } catch (error) {
    yield put(actions.findDCurrentTicketError(error));
  }
}

export default function* mapSaga() {
  yield takeEvery(types.GET_CITIES_LOCATION_SAGA, getCitiesLocation);
  yield takeEvery(types.GET_TICKETS_PRICE_SAGA, getTicketsPrice);
  yield takeEvery(types.FIND_CURRENT_TICKET_START, findCurrentTicket);
}
