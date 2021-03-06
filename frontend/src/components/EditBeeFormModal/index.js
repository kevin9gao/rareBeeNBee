import { useState } from "react";
import { Modal } from "../../context/Modal";
import EditBeeForm from "./EditBeeForm";
import '../SingleBee/SingleBee.css';

const EditBeeFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className='edit-bee'
      >Edit Bee</button>
      {showModal && (
        <Modal className='modals' onClose={() => setShowModal(false)}>
          <EditBeeForm setShowModal={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default EditBeeFormModal;
