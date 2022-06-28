import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleBee } from "../../store/bees";
import './SingleBee.css';

const SingleBee = () => {
  const dispatch = useDispatch();
  const { beeId } = useParams();
  const bee = useSelector(state => state.bees[beeId]);

  if (!bee) {
    return null;
  }

  return (
    <div className="single-bee-container">
      <h1>{bee.name}</h1>
      <h3>{`${bee.city}, ${bee.state}, ${bee.country}`}</h3>
      <img className="bee-pic" src={bee.imageUrl} alt='bee' />
    </div>
  );
}

export default SingleBee;
