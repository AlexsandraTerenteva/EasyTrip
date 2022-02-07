/* eslint-disable import/prefer-default-export */
import * as types from '../types';

export const getSliderRes = (payload) => ({
  type: types.GET_SLIDER_RES,
  payload,
});

export const getSliderResError = (payload) => ({
  type: types.GET_SLIDER_RES_ERROR,
  payload,
  error: true,
});

export const getSliderResSuccess = (payload) => ({
  type: types.GET_SLIDER_RES_SUCCESS,
  payload,
});
