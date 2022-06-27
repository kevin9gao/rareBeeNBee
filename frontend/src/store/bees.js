const LOAD = 'bees/LOAD';

const load = list => ({
  type: LOAD,
  list
});

export const getBees = () => async dispatch => {
  const res = await fetch(`/api/bees`);

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
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
    default:
      return state;
  }
}

export default beesReducer;
