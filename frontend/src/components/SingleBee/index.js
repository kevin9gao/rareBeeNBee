import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBees } from "../../store/bees";
import BookingSidebar from "../Bookings/BookingSidebar";
import EditBeeFormModal from "../EditBeeFormModal";
import DeleteBeeModal from "./DeleteBeeModal";
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
    <main>
      <div className="upper">
        <h1>{bee.name}</h1>
        <img className="bee-pic" src={bee.imageUrl} alt='bee' />
        <h3>{`${bee.city}, ${bee.state}, ${bee.country}`}</h3>
        {user && (bee.userId === user.id) && (
          <div id="edit-delete-bee">
            <EditBeeFormModal />
            <DeleteBeeModal bee={bee} />
          </div>
        )}
      </div>
      <div className="lower">
          <div className="left-lower">
            <h2 id='lower-description'>
              {bee.description || `This is a bee description placeholder`}
            </h2>
            <p id='details'>
              {bee.details || `These are temporary details about the bee. We're gonna need a good
              amount of text inside this baby so we can really see what this thing's
              gonna look like. These are temporary details about the bee. We're gonna need a good
              amount of text inside this baby so we can really see what this thing's
              gonna look like. These are temporary details about the bee. We're gonna need a good
              amount of text inside this baby so we can really see what this thing's
              gonna look like. These are temporary details about the bee. We're gonna need a good
              amount of text inside this baby so we can really see what this thing's
              gonna look like.`}
            </p>
        </div>
        <div className="right-lower">
          <aside className="sidebar">
            <div id='booking-sidebar-container'>
              <BookingSidebar />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default SingleBee;
