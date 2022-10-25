import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import Logo from '../../../src/favicon.png';
import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const [profPic, setProfPic] = useState(user.profilePicUrl);

  // console.log('profilePicUrl profile button', user);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!profPic) {
      setProfPic(Logo);
    };

    if (user?.profilePicUrl) setProfPic(user.profilePicUrl);
  }, [user?.profilePicUrl]);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/');
  };

  return (
    <>
      <div className="dropdown-wrapper">
        <button onClick={openMenu}>
          <img
            src={profPic}
            className='avatars'
            alt="avatar"
          />
        </button>
        {showMenu && (
          <div className="profile-dropdown">
            <p>
              <NavLink to={`/users/${user.id}`} className='navbar-links'>
                {user.username}
              </NavLink>
            </p>
            <p>{user.email}</p>
            <p>
              <NavLink to={`/users/${user.id}/bookings`} className='navbar-links'>
                Bookings
              </NavLink>
            </p>
            <p>
              <button onClick={logout} id='log-out'>Log Out</button>
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
