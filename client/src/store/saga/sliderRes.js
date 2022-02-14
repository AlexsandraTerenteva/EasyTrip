// call, put, takeEvery
import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import * as types from '../types';
import * as actions from '../actions';

function* getSliderRes(action) {
  const { payload } = action;
  const { destination } = payload;
  try {
    const getCorrectDate = (date) => {
      const correctMonth = (date.getMonth() < 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`);
      const correctDay = (date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`);
      const correctDate = `${date.getFullYear()}-${correctMonth}-${correctDay}`;
      return correctDate;
    };

    const today = new Date();
    const departDate = getCorrectDate(today);
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    const returnDate = getCorrectDate(tomorrow);
    const dayForSlider = getCorrectDate(tomorrow);
    const { data } = yield call(axios.post, 'http://localhost:4000/tickets', {
      origin: 'MOW', destination, departureAt: dayForSlider, returnAt: returnDate,
    });
    console.log('data', data);
    yield put(actions.getSliderResSuccess({ data }));
  } catch (e) {
    yield put(actions.getSliderResError(e));
  }
}

export default function* sliderResSaga() { // watcher
  yield takeEvery(types.GET_SLIDER_RES, getSliderRes);
}
