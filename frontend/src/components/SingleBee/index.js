import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getBees } from "../../store/bees";
import { getSingleBeeImages } from '../../store/images';
import BookingSidebar from "../Bookings/BookingSidebar";
import EditBeeFormModal from "../EditBeeFormModal";
import DeleteBeeModal from "./DeleteBeeModal";
import './SingleBee.css';
import AllPics from '../../images/nine-dots.jpg';

const SingleBee = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { beeId } = useParams();
  const bee = useSelector(state => state.bees[beeId]);
  const user = useSelector(state => state.session.user);
  const images = Object.values(useSelector(state => state.images));
  // console.log('images SingleBee', images);

  useEffect(() => {
    dispatch(getBees());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSingleBeeImages(beeId));
  }, [beeId]);

  // if (images) {
  //   setAddImages(images.slice(0, 4));
  // }
  // console.log('addImages', addImages);

  if (!bee) {
    return null;
  }

  return (
    <main>
      <div className="upper">
        <h1>{bee.name}</h1>
        <div id="pictures-wrapper">
          <img className="bee-pic" src={bee.imageUrl} alt='bee' />
          <div id="small-pics-wrapper">
            {images && images.slice(0, 4).map(image => (
              <img
                className="small bee-pic"
                src={image.imageUrl}
                key={image.id}
              />
            ))}
            <div id="all-pics-btn-wrapper">
              <div id="all-pics-btn-wrapper-2">
                <button
                  id="all-pics-btn"
                  onClick={() => history.push(`/bees/${beeId}/all-pics`)}>
                  <img src={AllPics} />
                  <span>Show all photos</span>
                </button>
              </div>
            </div>
          </div>
        </div>
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
