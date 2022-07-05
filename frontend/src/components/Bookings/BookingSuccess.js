import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const BookingSuccess = () => {
  const user = useSelector(state => state.session.user);

  if (!user) return null;

  return (
    <>
      <h1>You've successfully booked your bee!</h1>
      <NavLink to={`/users/${user.id}/bookings`}>My Reservations</NavLink>
    </>
  );
}

export default BookingSuccess;
