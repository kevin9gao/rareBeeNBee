import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { deleteBee, getBees } from "../../store/bees";
import EditBeeFormModal from "../EditBeeFormModal";
import './SingleBee.css';

const SingleBee = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { beeId } = useParams();
  const bee = useSelector(state => state.bees[beeId]);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getBees());
  }, [dispatch]);

  const handleDeleteBee = () => {
    dispatch(deleteBee(beeId));
    history.push('/');
  }

  if (!bee) {
    return null;
  }

  return (
    <div className="single-bee-container">
      <h1>{bee.name}</h1>
      {user && (bee.userId === user.id) && (
        <EditBeeFormModal />
      )}
      {user && (bee.userId === user.id) && (
        <button onClick={handleDeleteBee}>Delete Bee</button>
      )}
      <h3>{`${bee.city}, ${bee.state}, ${bee.country}`}</h3>
      <img className="bee-pic" src={bee.imageUrl} alt='bee' />
    </div>
  );
}

export default SingleBee;
