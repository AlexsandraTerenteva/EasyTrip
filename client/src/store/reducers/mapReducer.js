import * as types from '../types/map';

export default function mapReducer(state = {}, actions) {
  const { type, payload } = actions;

  switch (type) {
    case types.GET_CITIES_LOCATION_LOADER,
    types.GET_TICKETS_PRICE_LOADER: {
      const newState = { ...state };
      newState.loading = true;
      newState.error = null;
      return newState;
    }
    case types.GET_CITIES_LOCATION_ERROR,
    types.GET_TICKETS_PRICE_ERROR,
    types.GET_AIRLINE_NAME_ERROR,
    types.SET_CURRENT_TICKET_ERROR,
    types.FIND_CURRENT_TICKET_ERROR: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = payload;
      return newState;
    }
    case types.GET_CITIES_LOCATION_SUCCESS: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = null;
      newState.data = payload;
      return newState;
    }
    case types.GET_TICKETS_PRICE_SUCCESS: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = null;
      newState.data.destination = newState.data.destination.map((item) => {
        const currentCity = payload.find((code) => code.destination == item.iata);
        if (currentCity) {
          return {
            ...item, price: currentCity,
          };
        }
        return item;
      });
      newState.data.destination = newState.data.destination.filter((item) => item.price);
      return newState;
    }

    case types.GET_AIRLINE_NAME_SUCCESS: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = null;
      newState.data = payload;
      return newState;
    }

    case types.SET_CURRENT_TICKET_SUCCESS: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = null;
      newState.data.ticket = payload;
      return newState;
    }
    case types.FIND_CURRENT_TICKET_SUCCESS: {
      const newState = { ...state };
      newState.loading = false;
      newState.error = null;
      newState.data.ticketlist = payload;
      return newState;
    }

    default: {
      return state;
    }
  }
}
