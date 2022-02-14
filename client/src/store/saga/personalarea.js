/* eslint-disable no-unused-vars */
import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import * as types from '../types/personalarea';
import * as actionsS from '../actions/index';

//! получение всех билетов юзера из БД
function* getPersonalTicketList(action) {
  const { type, payload } = action;
  const userID = payload;
  const { data } = yield call(
    axios.get,
    'http://localhost:4000/user/personalticket',

    { withCredentials: true },
  );
  yield put(actionsS.getSliderResSuccess({ data }));
}

//! отправка купленного билета в БД
function* givePersonalTicket(action) {
  const { type, payload } = action;
  const userTicket = payload.ticket;
  const { auth } = payload;
  const { data } = yield call(axios.post, 'http://localhost:4000/user/personalticket', {
    userTicket,
  }, { withCredentials: true });
  const { email } = yield call(axios.post, 'http://localhost:4000/user/sendticketbyemail', {
    userTicket, auth,
  }, { withCredentials: true });
}

//! удаление билета в БД
function* deletePersonalTicket(action) {
  const { type, payload } = action;
  const userTicket = payload.ticket;
  const { auth } = payload;
  const { sorted } = payload;
  const { data } = yield call(axios.delete, 'http://localhost:4000/user/personalticket', {
    data: { userTicket, auth },
  }, { withCredentials: true });
  if (sorted) {
    const newData = data.data.filter((item) => new Date(item.departure_at) > Date.now());
    const newDataData = { success: true, data: newData };
    yield put(actionsS.getSliderResSuccess({ data: newDataData }));
  } else { yield put(actionsS.getSliderResSuccess({ data })); }
}

//! сортировка списка билетов из БД
function* sortPersonalTicket(action) {
  const { type, payload } = action;
  const auth = payload;
  const { data } = yield call(axios.post, 'http://localhost:4000/user/personalticket/sort', { auth }, { withCredentials: true });
  const newData = data.data.filter((item) => new Date(item.departure_at) > Date.now());
  const newDataData = { success: true, data: newData };
  yield put(actionsS.getSliderResSuccess({ data: newDataData }));
}

export default function* getUserTicketSaga() {
  yield takeEvery(types.GET_USER_PERSONAL_TICKET_LIST, getPersonalTicketList);
  yield takeEvery(types.GIVE_USER_PERSONAL_TICKET_LIST, givePersonalTicket);
  yield takeEvery(types.DELETE_USER_PERSONAL_TICKET_LIST, deletePersonalTicket);
  yield takeEvery(types.SORT_USER_PERSONAL_TICKET_LIST, sortPersonalTicket);
}
