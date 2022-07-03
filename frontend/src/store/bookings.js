import { csrfFetch } from "./csrf";

const LOAD = 'bookings/LOAD';
const ADD = 'bookings/ADD';
const REMOVE = 'bookings/REMOVE';

const load = list => ({
  type: LOAD,
  list
});

const add = booking => ({
  type: ADD,
  booking
});

const remove = bookingId => ({
  type: REMOVE,
  bookingId
});

export const getUserBookings = (userId) => async dispatch => {
  const res = await csrfFetch(`/api/bookings/${userId}`);

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
    return list;
  }
}

export const getSingleBooking = (bookingId) => async dispatch => {
  const res = await csrfFetch(`/api/bookings/${bookingId}`);

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
    return list;
  }
}

export const createBooking = (payload) => async dispatch => {
  const res = await csrfFetch(`/api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const booking = await res.json();
    await dispatch(add(booking));
    return booking;
  }
}

export const cancelBooking = (bookingId) => async dispatch => {
  const res = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    // const booking = await res.json();
    dispatch(remove(bookingId));
  }
}

const initialState = {};

const bookingsReducer = (state = initialState, action) => {
  if (state.errors) {
    delete state.errors;
  }
  switch (action.type) {
    case LOAD:
      if (!action.list.length) {
        return {
          [action.list.id]: action.list
        }
      } else {
        const allBookings = {};
        action.list.forEach(booking => {
          allBookings[booking.id] = booking;
        });
        return {
          ...allBookings,
          ...state
        };
      }
    case ADD:
      if (Array.isArray(action.booking)) {
        const newState = {
          ...state,
          errors: action.booking
        }
        return newState;
      } else {
        const newState = {
          ...state,
          [action.booking.id]: action.booking
        };
        return newState;
      }
    case REMOVE:
      const newState = {
        ...state
      };
      delete newState[action.bookingId];
      return newState;
    default:
      return state;
  }
}

export default bookingsReducer;
