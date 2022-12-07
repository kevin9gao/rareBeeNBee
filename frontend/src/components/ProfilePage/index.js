import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import DeadLink from '../../images/dead link.jpg';
import './ProfilePage.css';
import UpdatePic from "./UpdatePic";
import EmailIcon from '../../images/email-icon.jpg';

const ProfilePage = () => {
  const user = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [profilePic, setProfilePic] = useState(user?.profilePicUrl);
  console.log('profilePicUrl', user?.profilePicUrl);

  useEffect(() => {
    if (!user?.profilePicUrl) {
      setProfilePic(DeadLink);
    } else setProfilePic(user?.profilePicUrl);
  }, [user]);

  return (
    <div id="profile-page-wrapper">
      <div id="left-right-wrapper">
        <div className="left">
          <div className="avatar-wrapper">
            <img
              src={profilePic}
              className='avatar-profile-page'
            />
            <button
              id="change-profile-pic-btn"
              onClick={() => setShowModal(true)}>
                Update photo
              </button>
            {showModal && (
              <Modal className='modals' onClose={() => {setShowModal(false)}}>
                <UpdatePic user={user} setShowModal={setShowModal} />
              </Modal>
            )}
          </div>
        </div>
        <div className="right">
          <div className="header">
            <h1>{`Hi, I'm ${user?.username}`}</h1>
            <p>{`Joined in ${new Date(user?.createdAt).getFullYear()}`}</p>
          </div>
          <div className="profile-about">
            <h3>About</h3>
            <div className="email">
              <img src={EmailIcon} />
              <p>{`Email: ${user?.email}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
