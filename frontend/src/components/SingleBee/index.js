import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBees } from "../../store/bees";
import EditBeeFormModal from "../EditBeeFormModal";
import './SingleBee.css';

const SingleBee = () => {
  const dispatch = useDispatch();
  const { beeId } = useParams();
  const bee = useSelector(state => state.bees[beeId]);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getBees());
  }, [dispatch]);

  if (!bee) {
    return null;
  }

  return (
    <div className="single-bee-container">
      <h1>{bee.name}</h1>
      {user && (bee.userId === user.id) && (
        <EditBeeFormModal />
      )}
      <h3>{`${bee.city}, ${bee.state}, ${bee.country}`}</h3>
      <img className="bee-pic" src={bee.imageUrl} alt='bee' />
    </div>
  );
}

export default SingleBee;
