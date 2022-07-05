import { useDispatch } from "react-redux";
import { cancelBooking } from "../../store/bookings";
import './Booking.css';

const CancelReservation = ({ booking, setShowModal }) => {
  const dispatch = useDispatch();

  return (
    <div className="cancel-res-container">
      <div>
        <h2>Cancel Reservation?</h2>
      </div>
      <div>
        <button
          onClick={setShowModal}
          id='cancel-res-nevermind'
        >
          Nevermind.
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(cancelBooking(booking.id))
          }}
          id='cancel-res-confirm'
        >
          Yes, cancel My Reservation.
        </button>
      </div>
    </div>
  );
}

export default CancelReservation;
