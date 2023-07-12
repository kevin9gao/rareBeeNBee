import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './SearchBar.css';

export default function SearchBar({ setShowModal }) {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const bees = Object.values(useSelector(state => state.bees));
  // console.log('bees', bees);

  useEffect(() => {
    if (!searchInput) return;

    const matches = [];

    bees.forEach(bee => {
      if (bee.name.toLowerCase().includes(searchInput.toLowerCase())) {
        matches.push(bee);
      }
    });

    setSuggestions(matches);

    if (!searchInput.length) setSuggestions([]);
  }, [searchInput]);
  // console.log('suggestions', suggestions);

  return (
    <div id="search-wrapper">
      <div>
        <form id="search-form">
          <input
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder='Search for a bee...'
            autoFocus
            />
        </form>
        <div
          id="suggestions-wrapper"
          hidden={!suggestions.length}
          >
          {suggestions && suggestions.map(bee => (
            <div className="suggestions">
              <NavLink exact to={`/bees/${bee.id}`} onClick={() => setShowModal(false)}>
                {bee.name}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
