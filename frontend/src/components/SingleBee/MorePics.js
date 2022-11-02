import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import BackButton from '../../images/back-button.png';
import { getSingleBeeImages } from "../../store/images";

function MorePics({}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { beeId } = useParams();
  const bee = useSelector(state => state.bees[beeId]);
  const images = Object.values(useSelector(state => state.images));
  const [open, setOpen] = useState(true);

  useEffect(() => {
    dispatch(getSingleBeeImages(beeId));
  }, [beeId]);

  useEffect(() => {
    if (!open) return;

    const escapeClose = e => {
      if (e.key === 'Escape') {
        back();
      }
    }

    document.onkeydown = e => escapeClose(e);

    return () => document.onkeydown = e => e.preventDefault();
  }, []);

  const back = e => {
    history.goBack();
  }

  return (
    <div id="all-pics-wrapper">
      <div className="back-btn-wrapper">
        <button onClick={back}>
          <img src={BackButton} />
          Back
        </button>
      </div>
      {!images && (
        <div className="no-add-pics wrapper">
          <img src={bee?.imageUrl} />
        </div>
      )}
      {images && (
        <div className="add-pics wrapper">
          <img src={bee?.imageUrl} />
          {images.map(image => (
            <img src={image.imageUrl} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MorePics;
