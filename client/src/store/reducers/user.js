import * as types from '../types/user';

export default function userReducer(state = {}, actions) {
  const { type, payload } = actions;
  switch (type) {
    case types.GET_USER_IP_LOADER: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loading = true;
      newState.error = null;
      return newState;
    }
    case types.AUTH_USER_START,
    types.REG_USER_START,
    types.LOGOUT_USER_START,
    types.CHECK_AUTH_START,
    types.GET_USER_EXCURSIONS_START,
    types.DELETE_USER_BOOKING_START: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loading = true;
      newState.error = null;
      return newState;
    }
    case types.GET_USER_IP_ERROR,
    types.AUTH_USER_ERROR,
    types.REG_USER_ERROR,
    types.LOGOUT_USER_ERROR,
    types.CHECK_AUTH_ERROR,
    types.GET_USER_EXCURSIONS_ERROR,
    types.DELETE_USER_BOOKING_ERROR: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loading = false;
      newState.error = payload;
      return newState;
    }
    case types.GET_USER_IP_SUCCESS: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loading = false;
      newState.error = null;
      newState.data.location = { ...newState.data.location, payload };
      return newState;
    }
    case types.REG_USER_SUCCESS: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loading = false;
      newState.error = null;
      newState.data.auth = { ...payload };
      return newState;
    }
    case types.AUTH_USER_SUCCESS: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loading = false;
      newState.error = null;
      newState.data.auth = { ...payload };
      return newState;
    }
    case types.CHECK_AUTH_SUCCESS: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loading = false;
      newState.error = null;
      newState.data.auth = { ...payload };
      return newState;
    }
    case types.LOGOUT_USER_SUCCESS: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loading = false;
      newState.error = null;
      newState.data.auth = null;
      return newState;
    }

    case types.GET_USER_EXCURSIONS_SUCCESS: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loading = false;
      newState.error = null;
      newState.data.excursions = payload;
      return newState;
    }

    default: {
      return state;
    }
  }
}
