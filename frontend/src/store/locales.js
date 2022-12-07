const LOAD = 'locales/LOAD';

const load = list => ({
  type: LOAD,
  list
});

export const getAllLocales = () => async dispatch => {
  const res = await fetch('/api/locales');

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
    return list;
  }
}

export const getLocale = localeId => async dispatch => {
  const res = await fetch(`/api/locales/${localeId}`);

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
    return list;
  }
}

let newState;

const localesReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      if (!action.list.length) {
        newState = { ...state };
        newState['current'] = action.list;
        return newState;
      } else {
        newState = { ...state };
        action.list.forEach(locale => {
          newState[locale.id] = locale;
        })
        return newState;
      }
    default:
      return state;
  }
}

export default localesReducer;
