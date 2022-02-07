import * as types from '../types/excursions';

// получение всех экскурсий

export const getExcursionsCityStart = (payload) => ({
  type: types.GET_EXCURSIONS_CITY_START,
  payload,
});

export const getExcursionsCityError = (payload) => ({
  type: types.GET_EXCURSIONS_CITY_ERROR,
  payload,
});

export const getExcursionsCitySuccess = (payload) => ({
  type: types.GET_EXCURSIONS_CITY_SUCCESS,
  payload,
});

// бронирование экскурсии
export const postExcursionBookingStart = (payload) => ({
  type: types.POST_EXCURSION_BOOKING_START,
  payload,
});

export const postExcursionBookingError = (payload) => ({
  type: types.POST_EXCURSION_BOOKING_ERROR,
  payload,
});

export const postExcursionBookingSuccess = (payload) => ({
  type: types.POST_EXCURSION_BOOKING_SUCCESS,
  payload,
});
