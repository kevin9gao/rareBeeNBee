import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBees } from '../../store/bees';
import './HomePage.css';

function HomePage () {
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
            <article className="bee-cards">
              <img src={bee.imageUrl} alt={bee.name} className='bee-pics' />
              <div className="card-content">
                <p className="card-location">
                  {`${bee.city}, ${bee.state}, ${bee.country}`}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}

export default HomePage;
