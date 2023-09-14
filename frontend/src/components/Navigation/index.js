import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import DemoUser from '../DemoUser';
import Logo from '../../../src/favicon.png';
import './Navigation.css';
import SignupFormModal from '../SignupFormModal';
import AboutPageModal from './AboutPageModal';
import SearchModal from '../SearchBar/SearchModal';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink exact className='links' to='/bees/new'>Add A New Bee</NavLink>
        <ProfileButton id='profile-button' user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <DemoUser className='links' id='demo-user' />
        <LoginFormModal className='links' />
        <SignupFormModal className='links' />
      </>
    );
  }

  return (
    <div className='navbar-wrapper'>
      <div className='navbar-wrapper-2'>
        <div id='left-side'>
          <a href='/' id='logo-wrapper'>
            <img id='logo' alt='logo' src={Logo} />
            <h2 id='title'>RareBeeNBee</h2>
          </a>
          <AboutPageModal />
        </div>
        <div id='middle'>
          <SearchModal />
        </div>
        <div id='right-side'>
          <NavLink exact className='links' to="/">Home</NavLink>
          {isLoaded && sessionLinks}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
