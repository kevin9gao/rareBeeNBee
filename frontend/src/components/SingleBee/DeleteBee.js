import { useDispatch } from "react-redux";
import { deleteBee } from "../../store/bees";
import { useHistory } from 'react-router-dom';
import '../Bookings/Booking.css';

const DeleteBee = ({ bee, setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  console.log('DeleteBee component bee', bee)

  return (
    <div className="cancel-res-container">
      <div>
        <h2>Remove Bee Spot?</h2>
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
            dispatch(deleteBee(bee.id));
            history.push('/');
          }}
          id='cancel-res-confirm'
        >
          Yes, remove the bee.
        </button>
      </div>
    </div>
  );
}

export default DeleteBee;
