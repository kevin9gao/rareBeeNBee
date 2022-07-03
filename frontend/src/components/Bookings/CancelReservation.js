import { useDispatch } from "react-redux";
import { cancelBooking } from "../../store/bookings";

const CancelReservation = ({ booking, setShowModal }) => {
  const dispatch = useDispatch();

  return (
    <div className="modal-headers">
      <h2>Cancel Reservation?</h2>
      <button
        onClick={setShowModal}
      >Nevermind.</button>
      <button onClick={(e) => {
        e.preventDefault();
        dispatch(cancelBooking(booking.id))
      }}>Cancel My Reservation.</button>
    </div>
  );
}

export default CancelReservation;
