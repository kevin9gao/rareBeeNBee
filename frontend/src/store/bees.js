import { csrfFetch } from "./csrf";

const LOAD = 'bees/LOAD';
const ADD_EDIT = 'bees/ADD_EDIT';
const REMOVE = 'bees/REMOVE';

const load = list => ({
  type: LOAD,
  list
});

const add = bee => ({
  type: ADD_EDIT,
  bee
});

const update = bee => ({
  type: ADD_EDIT,
  bee
});

const remove = beeId => ({
  type: REMOVE,
  beeId
})

export const getBees = () => async dispatch => {
  const res = await fetch(`/api/bees`);

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
  }
}

export const getSingleBee = (beeId) => async dispatch => {
  const res = await fetch(`/api/bees/${beeId}`);

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
    return list;
  }
}

export const createBee = (payload) => async dispatch => {
  // console.log('got to createBee thunk, before fetch')

  const res = await csrfFetch(`/api/bees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  // console.log('got to createBee thunk, after fetch(res)', res)

  if (res.ok) {
    // console.log('createBee thunk, if res.ok running')
    const bee = await res.json();
    // console.log('before dispatch(add(bee)): ', bee);
    await dispatch(add(bee));
    // console.log('after dispatch(add(bee)): ', bee);
    return bee;
  }
}

export const editBee = (payload, beeId) => async dispatch => {
  // console.log('got to editBee thunk before fetch, payload: ', payload);

  const res = await csrfFetch(`/api/bees/${beeId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ payload, beeId })
  });

  // console.log('editBee thunk after fetch, res: ', res);

  if (res.ok) {
    const bee = await res.json();

    // console.log('editBee thunk if res.ok, bee: ', bee);

    dispatch(update(bee));
    // console.log('editBee thunk after dispatch, bee: ', bee);

    return bee;
  }
}

export const deleteBee = (beeId) => async dispatch => {
  const res = await csrfFetch(`/api/bees/${beeId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    const bee = await res.json();
    dispatch(remove(beeId));
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
  // Check if state has errors key, if so remove it
  if (state.errors) {
    delete state.errors;
  }
  switch (action.type) {
    case LOAD:
      console.log(!action.list.length);
      if (!action.list.length) {
        return {
          [action.list.id]: action.list
        }
      } else {
        const allBees = {};
        action.list.forEach(bee => {
          allBees[bee.id] = bee;
        });
        return {
          ...allBees,
          ...state,
          list: sortList(action.list)
        };
      }
    case ADD_EDIT:
      console.log('reducer ADD_EDIT, action.bee: ', action.bee);
      // Check if action.bee returned an errors array, if so return state with errors
      if (Array.isArray(action.bee)) {
        const newState = {
          ...state,
          errors: action.bee
        }
        return newState;
      }
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
