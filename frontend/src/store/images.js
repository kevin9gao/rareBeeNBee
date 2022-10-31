import { csrfFetch } from "./csrf";

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
    return list;
  }
}

export const addBeeImages = (payload, beeId) => async dispatch => {
  const { imageList } = payload;

  Array.from(imageList).forEach(async singleImage => {
    const formData = new FormData();
    formData.append('image', singleImage);

    const res = await csrfFetch(`/api/images/bees/${beeId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: formData,
    });

    const image = await res.json();
    dispatch(add(image));
  })
}

// export const addBeeImages = (payload, beeId) => async dispatch => {
//   const formData = new FormData();
//   formData.append('beeId', beeId);

//   const { imageList } = payload;

//   if (imageList) {
//     for (let i = 0; i < imageList.length; i++) {
//       formData.append('images', imageList[i]);
//     }
//   }

//   const res = await fetch(`/api/images/bees/${beeId}`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'multipart/form-data' },
//     body: formData,
//   });

//   const images = await res.json();
//   dispatch(add(images));
//   return images;
// }

const imagesReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case LOAD:
      newState = {};
      action.list.forEach(image => {
        newState[image.id] = image;
      })
      return newState;
    case ADD:
      newState = { ...state };
      newState[action.image.id] = action.image;
      return newState;
    default:
      return state;
  }
}

export default imagesReducer;
