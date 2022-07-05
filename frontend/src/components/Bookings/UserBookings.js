import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getUserBookings } from '../../store/bookings';
import * as sessionActions from '../../store/session';
import CancelResModal from './CancelResModal';

const UserBookings = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const bookingsSelector = useSelector(state => state.bookings);

  useEffect(() => {
    // console.log('UserBookings.js restoreUser dispatched');
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserBookings(userId));
  }, [userId, dispatch]);

  const bookingsArray = Object.values(bookingsSelector);

  // console.log('bookingsSelector: ', bookingsSelector);
  // console.log('bookingsArray', bookingsArray);


  if (!isLoaded) return null;

  return (
    <div className='main-container'>
      <h1>Bookings</h1>
      {bookingsArray && bookingsArray.map(booking => {
        return (
          <div className='individual-bookings' key={booking.id}>
            <p>{booking.beeName}</p>
            <p>{booking.location}</p>
            <p>{booking.price}</p>
            <CancelResModal booking={booking} />
          </div>
        );
      })}
    </div>
  );
}

export default UserBookings;
