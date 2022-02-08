import * as types from '../types/user';

// Получение координат расположения города пользователя
export const getUserIpLoader = (payload) => ({
  type: types.GET_USER_IP_LOADER,
  payload,
});

export const getUserIpSuccess = (payload) => ({
  type: types.GET_USER_IP_SUCCESS,
  payload,
});

export const getUserIpError = (payload) => ({
  type: types.GET_USER_IP_ERROR,
  payload,
});

export const getUserIpSaga = (payload) => ({
  type: types.GET_USER_IP_SAGA,
  payload,
});

// Вход в профиль для старых пользователей
export const authUserStart = (payload) => ({
  type: types.AUTH_USER_START,
  payload,
});

export const authUserError = (payload) => ({
  type: types.AUTH_USER_ERROR,
  payload,
});

export const authUserSuccess = (payload) => ({
  type: types.AUTH_USER_SUCCESS,
  payload,
});

// Регистрация новых пользователей
export const regUserSuccess = (payload) => ({
  type: types.REG_USER_SUCCESS,
  payload,
});

export const regUserError = (payload) => ({
  type: types.REG_USER_ERROR,
  payload,
});

export const regUserStart = (payload) => ({
  type: types.REG_USER_START,
  payload,
});

// Выход из профиля пользователя
export const logoutUserSuccess = () => ({
  type: types.LOGOUT_USER_SUCCESS,
});

export const logoutUserError = (payload) => ({
  type: types.LOGOUT_USER_ERROR,
  payload,
});

export const logoutUserStart = () => ({
  type: types.LOGOUT_USER_START,
});
// Проверка наличии сессии
export const checkAuthStart = (payload) => ({
  type: types.CHECK_AUTH_START,
  payload,
});

export const checkAuthSuccess = (payload) => ({
  type: types.CHECK_AUTH_SUCCESS,
  payload,
});

export const checkAuthError = (payload) => ({
  type: types.CHECK_AUTH_ERROR,
  payload,
});

// Получение забронированных экскурсий пользователя

export const getUserExcursionsStart = (payload) => ({
  type: types.GET_USER_EXCURSIONS_START,
  payload,
});

export const getUserExcursionsSuccess = (payload) => ({
  type: types.GET_USER_EXCURSIONS_SUCCESS,
  payload,
});

export const getUserExcursionsError = (payload) => ({
  type: types.GET_USER_EXCURSIONS_ERROR,
  payload,
});
// удаление экскурсии
export const deleteUserBookingStart = (payload) => ({
  type: types.DELETE_USER_BOOKING_START,
  payload,
});

export const deleteUserBookingError = (payload) => ({
  type: types.DELETE_USER_BOOKING_ERROR,
  payload,
});

export const deleteUserBookingSuccess = (payload) => ({
  type: types.DELETE_USER_BOOKING_SUCCESS,
});

export const newSagaUserPass = (payload) => ({
  type: types.NEW_USER_PASS,
  payload,
});
