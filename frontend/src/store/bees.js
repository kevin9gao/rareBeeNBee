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
    // console.log('getBees thunk, list: ', list);
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

// export const createBee = (payload) => async dispatch => {
//   const res = await csrfFetch(`/api/bees`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload)
//   });

//   if (res.ok) {
//     const bee = await res.json();
//     await dispatch(add(bee));
//     return bee;
//   }
// }

export const createBee = payload => async dispatch => {
  const {
    name,
    address,
    city,
    state,
    country,
    localeId,
    price,
    image,
    description,
    details,
    userId
  } = payload;

  const formData = new FormData();
  formData.append('name', name);
  formData.append('address', address);
  formData.append('city', city);
  formData.append('state', state);
  formData.append('country', country);
  formData.append('localeId', localeId);
  formData.append('price', price);
  formData.append('description', description);
  formData.append('details', details);
  formData.append('userId', userId);
  formData.append('image', image);

  const res = await csrfFetch('/api/bees', {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: formData,
  });

  if (res.ok) {
    const bee = await res.json()
    dispatch(add(bee));
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

  console.log('deleteBee thunk res', res)

  if (res.ok) {
    // const bee = await res.json();
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
      // console.log(action.list.length);
      // Loading a single bee
      if (!action.list.length) {
        return {
          [action.list.id]: action.list
        }
      // Loading multiple bees
      } else {
        // console.log('got to reducer');
        delete state['list']
        const allBees = {};
        action.list.forEach(bee => {
          allBees[bee.id] = bee;
        });
        return {
          ...allBees,
          ...state
        };
      }
    case ADD_EDIT:
      // console.log('reducer ADD_EDIT, action.bee: ', action.bee);
      // Check if action.bee returned an errors array, if so return state with errors
      if (Array.isArray(action.bee)) {
        const newState = {
          ...state,
          errors: action.bee
        }
        return newState;
      }
      // If bee doesn't already exist in state, i.e. add new bee
      if (!state[action.bee.id]) {
        const newState = {
          ...state,
          [action.bee.id]: action.bee
        };
        return newState;
      }
      // If bee already exists in state, i.e. edit bee
      return {
        ...state,
        [action.bee.id]: {
          ...state[action.bee.id],
          ...action.bee
        }
      };
    case REMOVE:
      const newState = {
        ...state
      };
      delete newState[action.beeId];
      return newState;
    default:
      return state;
  }
}

export default beesReducer;
