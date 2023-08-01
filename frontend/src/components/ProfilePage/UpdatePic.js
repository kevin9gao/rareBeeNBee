import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DeadLink from '../../images/dead link.jpg';
import { updateProfPic } from "../../store/session";

const UpdatePic = ({ user, setShowModal }) => {
  const dispatch = useDispatch();
  const [profilePic, setProfilePic] = useState(user?.profilePicUrl);
  const [changeProfPic, setChangeProfPic] = useState(profilePic);

  useEffect(() => {
    if (!profilePic) {
      setProfilePic(DeadLink);
    }
  }, []);

  useEffect(() => {
    if (!changeProfPic) return;
    if (changeProfPic === profilePic) return;

    const previewUrl = URL.createObjectURL(changeProfPic);
    if (previewUrl) setProfilePic(previewUrl);
  }, [changeProfPic]);

  const updateFile = e => {
    const file = e.target.files[0];
    // console.log('file', file);
    if (file) {
      setChangeProfPic(file);
    }
  }
  // console.log('changeProfPic', changeProfPic);

  const handleSubmit = async e => {
    e.preventDefault();

    const updatedUser = await dispatch(updateProfPic(changeProfPic, user.id));
    if (updatedUser) setShowModal(false);
  }

  return (
    <div className="update-profile-pic-wrapper">
      <div className="update-avatar-wrapper">
        <img
          src={profilePic}
          className='avatar-profile-page update-prof-pic'
        />
        <form
          onSubmit={handleSubmit}
          className='update-avatar-form'
        >
          <label>
            Upload a file from your computer
          </label>
          <input
            type='file'
            accept="image/*"
            onChange={updateFile}
            placeholder='Update Profile Picture'
          />
          <button id="update-avatar-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePic;
