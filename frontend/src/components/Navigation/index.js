import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import DemoUser from '../DemoUser';
import Logo from '../../../src/favicon.png';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton id='profile-button' user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal className='links' />
        <DemoUser className='links' id='demo-user' />
        <NavLink className='links' id='sign-up' to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='navbar-wrapper'>
      <div id='left-side'>
        <a href='/' id='logo-wrapper'>
          <img id='logo' alt='logo' src={Logo} />
          <h2 id='title'>RareBeeNBee</h2>
        </a>
      </div>
      <div id='right-side'>
        <NavLink exact className='links' to="/">Home</NavLink>
        <NavLink exact className='links' to='/bees/new'>Add A New Bee</NavLink>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
