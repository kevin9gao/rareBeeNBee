import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const BookingSuccess = () => {
  const userId = useSelector(state => state.session.user.id);

  return (
    <>
      <h1>You've successfully booked your bee!</h1>
      <NavLink to={`/users/${userId}/bookings`}>My Reservations</NavLink>
    </>
  );
}

export default BookingSuccess;
