const LOAD = 'images/LOAD';
const ADD = 'images/ADD';
const REMOVE = 'images/REMOVE';

const load = list => ({
  type: LOAD,
  list
})

const add = image => ({
  type: ADD,
  image
})

const remove = imageId => ({
  type: REMOVE,
  imageId
})

export const getImages = () => async dispatch => {
  const res = await fetch('/api/images');

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
  }
}

export const getSingleBeeImages = beeId => async dispatch => {
  const res = await fetch(`/api/images/bees/${beeId}`);

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
  }
}

export const addBeeImages = (images, beeId) => async dispatch => {
  images.forEach(image => {})
}

const imagesReducer = (state, action) => {
  let newState;
  switch (action.type) {
    // case LOAD:
    //   return { ...state }
    default:
      return state;
  }
}

export default imagesReducer;
