import { useState } from "react";
import { Modal } from "../../context/Modal";
import CancelReservation from "./CancelReservation";

const CancelResModal = ({ booking }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Cancel Reservation</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CancelReservation
            booking={booking}
            setShowModal={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default CancelResModal;
