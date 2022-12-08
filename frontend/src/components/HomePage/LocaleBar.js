import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLocales } from "../../store/locales";

export default function LocaleBar({ setLocaleFilter }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLocales());
  }, []);

  const locales = useSelector(state => state.locales);
  const localeBar = locales ? Object.values(locales) : null;
  // console.log('localeBar', localeBar);

  const setFilter = (e, locale) => {
    e.preventDefault();
    // console.log('setFilter locale', locale);
    setLocaleFilter(locale.id);
  }

  return (
    <div id="locale-bar-wrapper">
      {localeBar && localeBar.map(locale => (
        <button
          className="locale-btn"
          onClick={e => setFilter(e, locale)}>
            <img src={locale.iconUrl} />
            <span>{locale.name}</span>
          </button>
      ))}
    </div>
  );
}
