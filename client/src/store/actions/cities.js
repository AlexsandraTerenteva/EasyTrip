import * as types from '../types/cities';

export const getCitiesFrom = (payload) => ({
  type: types.GET_CITIES_FROM,
  payload,
});

export const getNewCitiesFrom = (payload) => ({
  type: types.GET_NEW_CITIES_FROM,
  payload,
});
export const getCitiesTo = (payload) => ({
  type: types.GET_CITIES_TO,
  payload,
});

export const getNewCitiesTo = (payload) => ({
  type: types.GET_NEW_CITIES_TO,
  payload,
});

export const getNewInfoForSaga = (payload) => ({
  type: types.GET_INFO_FOR_TICKET,
  payload,
});
