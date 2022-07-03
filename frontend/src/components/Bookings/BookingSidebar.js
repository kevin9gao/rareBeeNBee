import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom";
import { createBooking } from "../../store/bookings";

const BookingSidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { beeId } = useParams();
  const user = useSelector(state => state.session.user);
  const errors = useSelector(state => state.bookings.errors);
  const beeName = useSelector(state => state.bees[beeId]['name'])
  const location = useSelector(state => {
    return `${state.bees[beeId]['address']}, ${state.bees[beeId]['city']}, ${state.bees[beeId]['state']}, ${state.bees[beeId]['country']}`
  })
  const price = useSelector(state => state.bees[beeId]['price'])
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hideErrors, setHideErrors] = useState(true);

  // console.log('beeName: ', beeName);
  // console.log('location: ', location);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      startDate,
      endDate,
      beeName,
      location,
      price,
      userId: user.id,
      beeId
    };

    const newBooking = await dispatch(createBooking(payload));

    if (newBooking.id) {
      history.push(`/bookings/${newBooking.id}`);
    } else {
      setHideErrors(false);
    }
  };

  return (
    <div id='booking-container'>
      <div
        className="errors"
        hidden={hideErrors}
      >
        <ul>
          {errors && errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Book Your Stay Here!</h2>
        <form
          onSubmit={handleSubmit}
        >
          <input
            id='start-date'
            placeholder="Start Date"
            name="startDate"
            onChange={e => setStartDate(e.target.value)}
            value={startDate}
            type="date"
          ></input>
          <input
            id='end-date'
            placeholder="End Date"
            name="endDate"
            onChange={e => setEndDate(e.target.value)}
            value={endDate}
            type="date"
          ></input>
          <button>
            Reserve
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingSidebar;
