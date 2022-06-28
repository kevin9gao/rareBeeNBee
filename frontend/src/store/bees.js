import { csrfFetch } from "./csrf";

const LOAD = 'bees/LOAD';
const ADD_EDIT = 'bees/ADD_EDIT';

const load = list => ({
  type: LOAD,
  list
});

const addOneBee = bee => ({
  type: ADD_EDIT,
  bee
});

export const getBees = () => async dispatch => {
  const res = await fetch(`/api/bees`);

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
  }
}

export const createBee = (payload) => async dispatch => {
  const res = await csrfFetch(`/api/bees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const bee = await res.json();
    dispatch(addOneBee(bee));
    return bee;
  }
}

const initialState = {
  list: []
};

const sortList = list => {
  return list.sort((beeA, beeB) => {
    return beeA.country - beeB.country;
  }).map((bee) => bee.id);
}

const beesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const allBees = {};
      action.list.forEach(bee => {
        allBees[bee.id] = bee;
      });
      return {
        ...allBees,
        ...state,
        list: sortList(action.list)
      };
    case ADD_EDIT:
      if (!state[action.bee.id]) {
        const newState = {
          ...state,
          [action.bee.id]: action.bee
        };
        const beeList = newState.list.map(id => newState[id]);
        beeList.push(action.bee);
        newState.list = sortList(beeList);
        return newState;
      }
      return {
        ...state,
        [action.bee.id]: {
          ...state[action.bee.id],
          ...action.bee
        }
      };
    default:
      return state;
  }
}

export default beesReducer;
