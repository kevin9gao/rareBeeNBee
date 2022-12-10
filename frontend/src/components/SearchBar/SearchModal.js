import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SearchBar from "./SearchBar";
import './SearchBar.css';

export default function SearchModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div id="search-btn-wrapper">
      <button
        onClick={() => setShowModal(true)}
        id='search-btn'
      >Search for a bee...</button>
      {showModal && (
        <Modal className='modals' onClose={() => setShowModal(false)} isSearch={true}>
          <SearchBar setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}
