import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route } from "react-router-dom";
import { getBees } from '../../store/bees';
import SingleBee from "../SingleBee";
import './HomePage.css';

function HomePage() {
  const dispatch = useDispatch();
  const bees = useSelector(state => {
    return state.bees.list.map(beeId => state.bees[beeId]);
  });

  useEffect(() => {
    dispatch(getBees());
  }, [dispatch]);

  return (
    <main>
      <div className="main-wrapper">
        {bees.map(bee => {
          return (
            <NavLink key={bee.name} to={`/api/bees/${bee.id}`}>
              <article className="bee-cards">
                <img src={bee.imageUrl} alt={bee.name} className='bee-pics' />
                <div className="card-content">
                  <p className="card-location">
                    {`${bee.city}, ${bee.state}, ${bee.country}`}
                  </p>
                </div>
              </article>
            </NavLink>
          );
        })}
      </div>
    </main>
  );
}

export default HomePage;
