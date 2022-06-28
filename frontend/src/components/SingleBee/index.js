import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleBee } from "../../store/bees";

const SingleBee = ({ bee }) => {
  const dispatch = useDispatch();
  const { beeId } = useParams();

  useEffect(() => {
    dispatch(getSingleBee(beeId))
  }, [beeId, dispatch]);

  return (
    <div>
      <h1>{bee.name}</h1>
      <h3>{`${bee.city}, ${bee.state}, ${bee.country}`}</h3>
      <img src={bee.imageUrl} alt='bee' />
    </div>
  );
}

export default SingleBee;
