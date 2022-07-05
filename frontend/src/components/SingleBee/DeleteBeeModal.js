import { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteBee from "./DeleteBee";
import './SingleBee.css';

const DeleteBeeModal = ({ bee }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className='delete-bee'
      >Delete Bee</button>
      {showModal && (
        <Modal className='modals' onClose={() => setShowModal(false)}>
          <DeleteBee
            bee={bee}
            setShowModal={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default DeleteBeeModal;
