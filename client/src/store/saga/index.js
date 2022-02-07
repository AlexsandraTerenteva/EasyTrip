/* eslint-disable max-len */
import { all } from 'redux-saga/effects';
import usersSaga from './user';
import sliderResSaga from './sliderRes';
import mapSaga from './map';
import getCitiesSaga from './cities';
import getUserTicketSaga from './personalarea';
import excursionsSaga from './excursions';

export default function* rootSaga() {
  yield all([usersSaga(), sliderResSaga(), getCitiesSaga(), mapSaga(), getUserTicketSaga(), excursionsSaga()]);
}
