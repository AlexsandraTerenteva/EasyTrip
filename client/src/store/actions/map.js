import * as types from '../types/map';

export const getCitiesLocationLoader = () => ({
  type: types.GET_CITIES_LOCATION_LOADER,
});

export const getCitiesLocationError = (payload) => ({
  type: types.GET_CITIES_LOCATION_ERROR,
  payload,
});

export const getCitiesLocationSuccess = (payload) => ({
  type: types.GET_CITIES_LOCATION_SUCCESS,
  payload,
});

export const getCitiesLocationSaga = (payload) => ({
  type: types.GET_CITIES_LOCATION_SAGA,
  payload,
});

export const getTicketsPriceLoader = () => ({
  type: types.GET_TICKETS_PRICE_LOADER,
});

export const getTicketsPriceError = (payload) => ({
  type: types.GET_TICKETS_PRICE_ERROR,
  payload,
});

export const getTicketsPriceSuccess = (payload) => ({
  type: types.GET_TICKETS_PRICE_SUCCESS,
  payload,
});

export const getTicketsPriceSaga = (payload) => ({
  type: types.GET_TICKETS_PRICE_SAGA,
  payload,
});

export const getAirlineNameStart = (payload) => ({
  type: types.GET_AIRLINE_NAME_START,
  payload,
});

export const getAirlineNameError = (payload) => ({
  type: types.GET_AIRLINE_NAME_ERROR,
  payload,
});

export const getAirlineNameSuccess = (payload) => ({
  type: types.GET_AIRLINE_NAME_SUCCESS,
  payload,
});

export const setCurrentTicketStart = (payload) => ({
  type: types.SET_CURRENT_TICKET_START,
  payload,
});

export const setCurrentTicketError = (payload) => ({
  type: types.SET_CURRENT_TICKET_ERROR,
  payload,
});

export const setCurrentTicketSuccess = (payload) => ({
  type: types.SET_CURRENT_TICKET_SUCCESS,
  payload,
});

export const findCurrentTicketStart = (payload) => ({
  type: types.FIND_CURRENT_TICKET_START,
  payload,
});

export const findDCurrentTicketError = (payload) => ({
  type: types.FIND_CURRENT_TICKET_ERROR,
  payload,
});

export const findCurrentTicketSuccess = (payload) => ({
  type: types.FIND_CURRENT_TICKET_SUCCESS,
  payload,
});
