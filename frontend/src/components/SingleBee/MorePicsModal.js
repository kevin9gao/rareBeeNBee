import React, { useState } from "react";
import { Modal } from '../../context/Modal';
import MorePics from "./MorePics";
import AllPics from '../../images/nine-dots.jpg';

function MorePicsModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        id="all-pics-btn"
        onClick={() => setShowModal(true)}>
          <img src={AllPics} />
          <span>Show all photos</span>
      </button>
      {showModal && (
        <Modal className='modals' onClose={() => setShowModal(false)}>
          <MorePics />
        </Modal>
      )}
    </>
  )
}

export default MorePicsModal;
