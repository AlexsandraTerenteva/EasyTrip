import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import * as types from '../types/user';
import * as actions from '../actions/user';

function* getUserIp(action) {
  yield put(actions.getUserIpLoader());
  try {
    const { data: ip } = yield call(() => axios.get('http://api.ipify.org'));
    if (ip) {
      const { data: location } = yield call(() => axios.post('http://localhost:4000/user/location/', { ip }, { withCredentials: true }));
      yield put(actions.getUserIpSuccess(location));
    } else {
      yield put(actions.getUserIpSuccess(
        {
          coordinates: '37.617634:55.755787',
          country_name: 'Россия',
          iata: 'MOW',
          name: 'Москва',
        },
      ));
    }
  } catch (error) {
    yield put(actions.getUserIpError(error));
  }
}

function* loginUser(action) {
  const { payload } = action;
  try {
    const { data } = yield call(() => axios.post('http://localhost:4000/auth/login', payload, { withCredentials: true }));
    yield put(actions.authUserSuccess(data));
  } catch (error) {
    yield put(actions.authUserError(error));
  }
}

function* regUser(action) {
  const { payload } = action;
  try {
    const { data } = yield call(() => axios.post('http://localhost:4000/auth/registrate', payload, { withCredentials: true }));
    yield put(actions.regUserSuccess(data));
  } catch (error) {
    yield put(actions.regUserError(error));
  }
}
function* logoutUser() {
  try {
    const res = yield call(() => axios.get('http://localhost:4000/auth/logout', { withCredentials: true }));
    if (res.status !== 200) {
      throw Error();
    }
    yield put(actions.logoutUserSuccess());
  } catch (error) {
    yield put(actions.logoutUserError(error));
  }
}

function* checkAuthUser() {
  try {
    const { data } = yield call(() => axios.get('http://localhost:4000/auth/check', { withCredentials: true }));
    if (!data || data === '') {
      yield put(actions.checkAuthSuccess({ auth: null }));
    }
    yield put(actions.checkAuthSuccess(data));
  } catch (error) {
    yield put(actions.checkAuthError(error));
  }
}

function* getUserExcursions() {
  try {
    const { data } = yield call(() => axios.get('http://localhost:4000/user/excursions', { withCredentials: true }));
    yield put(actions.getUserExcursionsSuccess(data));
  } catch (error) {
    yield put(actions.getUserExcursionsError(error));
  }
}
function* deleteUserBokingExcursion(action) {
  const { payload } = action;
  try {
    const { data } = yield call(axios.delete, `http://localhost:4000/user/excursions/${payload}`, { withCredentials: true });
    if (data) {
      yield put(actions.getUserExcursionsSuccess(data));
    }
  } catch (error) {
    yield put(actions.deleteUserBookingError());
  }
}
function* newUserPass(action) {
  const { payload } = action;
  yield call(() => axios.post('http://localhost:4000/auth/newpass', payload, { withCredentials: true }));
}

export default function* usersSaga() {
  yield takeEvery(types.GET_USER_IP_SAGA, getUserIp);
  yield takeEvery(types.AUTH_USER_START, loginUser);
  yield takeEvery(types.REG_USER_START, regUser);
  yield takeEvery(types.LOGOUT_USER_START, logoutUser);
  yield takeEvery(types.CHECK_AUTH_START, checkAuthUser);
  yield takeEvery(types.GET_USER_EXCURSIONS_START, getUserExcursions);
  yield takeEvery(types.DELETE_USER_BOOKING_START, deleteUserBokingExcursion);
  yield takeEvery(types.NEW_USER_PASS, newUserPass);
}
