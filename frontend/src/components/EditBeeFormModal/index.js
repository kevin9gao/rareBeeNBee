import { useState } from "react";
import { Modal } from "../../context/Modal";
import EditBeeForm from "./EditBeeForm";

const EditBeeFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Bee</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditBeeForm />
        </Modal>
      )}
    </>
  );
};

export default EditBeeFormModal;
