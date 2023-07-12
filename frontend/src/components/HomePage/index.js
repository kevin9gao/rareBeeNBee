import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getBees } from '../../store/bees';
import './HomePage.css';
import LocaleBar from "./LocaleBar";

function HomePage() {
  const dispatch = useDispatch();
  const [localeFilter, setLocaleFilter] = useState('');
  // console.log('localeFilter', localeFilter);

  const beesSelector = useSelector(state => state.bees);

  const beesArray = beesSelector ? Object.values(beesSelector) : null;

  const bees = localeFilter ? beesArray.filter(bee => bee.localeId === localeFilter) : beesArray;

  useEffect(() => {
    dispatch(getBees());
  }, [dispatch])

  if (bees) {
    return (
      <main>
        <div className="main-wrapper">
          <div className="hp-locale-wrapper">
            <LocaleBar localeFilter={localeFilter} setLocaleFilter={setLocaleFilter} />
          </div>
          <div id="bee-grid">
            {bees.map(bee => {
              return (bee && (
                <NavLink
                  className='card-navlinks'
                  key={bee.id}
                  exact to={`/bees/${bee.id}`}
                >
                  <article className="bee-cards">
                    <img src={bee.imageUrl} alt={bee.name} className='bee-pics' />
                    <div className="card-content">
                      <h4 className="bee-names">{bee.name}</h4>
                      <p className="card-location">
                        {`${bee.city}, ${bee.state}, ${bee.country}`}
                      </p>
                    </div>
                  </article>
                </NavLink>
              ));
            })}
          </div>
        </div>
      </main>
    );
  }
}

export default HomePage;
