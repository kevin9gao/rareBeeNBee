import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from "react-router-dom";
import { getUserBookings } from '../../store/bookings';
import * as sessionActions from '../../store/session';
import CancelResModal from './CancelResModal';
import './Booking.css';

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

  const stayLength = (startDate, endDate) => {
    return ((new Date(endDate)) - (new Date(startDate))) / 86400000;
  }

  if (!isLoaded) return null;

  return (
    <div className='user-bookings-container'>
      <h1>Bookings</h1>
      {bookingsArray && bookingsArray.map(booking => {
        return (
          <div className='individual-bookings' key={booking.id}>
            <NavLink to={`/bees/${booking.beeId}`}>
              <div className='booking-groupings'>
                <p className='booking-beename'>
                  {booking.beeName}
                </p>
                <p>
                  {`$${booking.price} / ${stayLength(booking.startDate, booking.endDate)} days`}
                </p>
                <p className='booking-total'>
                  {`Total: $${booking.totalPrice}`}
                </p>
              </div>
            </NavLink>
            <div className='booking-groupings'>
              <p className='booking-location'>{booking.location}</p>
              <CancelResModal booking={booking} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UserBookings;
