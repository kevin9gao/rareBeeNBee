import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Logo from '../../favicon.png';

const BookingSuccess = () => {
  const user = useSelector(state => state.session.user);

  if (!user) return null;

  return (
    <>
      <img
        src={Logo}
        id='booking-success-logo'
        alt="logo"
      />
      <h1>You've successfully booked your bee!</h1>
      <div id="my-reservations-container">
        <NavLink
          to={`/users/${user.id}/bookings`}
          className='gradient-buttons'
          id="my-reservations"
        >My Reservations</NavLink>
      </div>
    </>
  );
}

export default BookingSuccess;
