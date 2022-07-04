import React, { useState, useEffect, useRef } from 'react';
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
  let userBookings = useRef(null);

  useEffect(() => {
    // console.log('UserBookings.js restoreUser dispatched');
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      userBookings.current = await dispatch(getUserBookings(userId));
    })()
  }, [userId, bookingsSelector, dispatch]);

  // console.log('userBookings.current: ', userBookings.current);
  const bookingsArray = userBookings.current;
  // console.log('bookingsArray', bookingsArray);

  // const handleDeleteBooking = (e) => {
  //   e.preventDefault();

  //   dispatch(cancelBooking(booking.id));
  // }

  if (!(isLoaded && bookingsArray)) return null;

  return (
    <div className='main-container'>
      <h1>Bookings</h1>
      {bookingsArray.map(booking => {
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
