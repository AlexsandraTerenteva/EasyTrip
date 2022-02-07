import * as types from '../types/personalarea';

export const getSagaPersonalTicketList = (payload) => ({
  type: types.GET_USER_PERSONAL_TICKET_LIST,
  payload,
});

export const givSagaPersonalTicketList = (payload) => ({
  type: types.GIVE_USER_PERSONAL_TICKET_LIST,
  payload,
});

export const deleteSagaPersonalTicketList = (payload) => ({
  type: types.DELETE_USER_PERSONAL_TICKET_LIST,
  payload,
});

export const sortSagaPersonalTicketList = (payload) => ({
  type: types.SORT_USER_PERSONAL_TICKET_LIST,
  payload,
});
