import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import DemoUser from '../DemoUser';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <DemoUser />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='navbar-wrapper'>
      <div className='left-side'>
        <img
          id='logo'
          src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9h5Zd_zjuA4wg9CNX9DpBbiJue7UEOtMAyOG2EWtaAl4nyJ44us9veKOtCfmjnwMWGHA&usqp=CAU'}
          />
        <h2 id='title'>RareBeeNBee</h2>
      </div>
      <ul>
        <li>
          <NavLink exact to="/">Home</NavLink>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
