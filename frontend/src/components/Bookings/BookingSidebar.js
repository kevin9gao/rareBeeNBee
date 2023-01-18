import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom";
import { getBees } from "../../store/bees";
import { createBooking } from "../../store/bookings";
import './Booking.css';

const BookingSidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { beeId } = useParams();
  const user = useSelector(state => state.session.user);
  const beeName = useSelector(state => state.bees[beeId]['name']);
  const location = useSelector(state => {
    return `${state.bees[beeId]['address']}, ${state.bees[beeId]['city']}, ${state.bees[beeId]['state']}, ${state.bees[beeId]['country']}`
  });
  const price = useSelector(state => state.bees[beeId]['price']);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [hideErrors, setHideErrors] = useState(true);

  let stayLength = useRef(0);
  let totalPrice = useRef(0);
  let hospitalityFee = (price <= 1000) ? 100 : price / 5;

  useEffect(() => {
    stayLength.current = ((new Date(endDate)) - (new Date(startDate))) / 86400000;
    totalPrice.current = ((price * stayLength.current) + hospitalityFee).toFixed(2);
    dispatch(getBees());
  }, [startDate, endDate, hospitalityFee, price, dispatch]);
  
  // console.log('validationErrors', validationErrors)
  // console.log('validationErrors.length', validationErrors.length)
  // console.log('stayLength.current', stayLength.current)

  useEffect(() => {
    const errors = [];
    
    if (!startDate) {
      errors.push('Please enter a start date.');
    }
    if (!endDate) {
      errors.push('Please enter a end date.');
    }
    
    if (new Date(startDate) < (new Date())) {
      errors.push('Start date must be in the future.');
    } else if (new Date(endDate) < new Date(startDate)) {
      errors.push('End date cannot be before Start date.');
    }

    setValidationErrors(errors);

    dispatch(getBees());
  }, [startDate, endDate, dispatch]);

  useEffect(() => {
    const notLoggedInError = 'You must be logged in to reserve an appointment.';
    const find = validationErrors.find(error => error === notLoggedInError);

    if (user) {
      if (find) {
        const validationsFilter = validationErrors.filter(error => {
          return error !== find;
        });

        setValidationErrors(validationsFilter)
      }
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const notLoggedInError = 'You must be logged in to reserve an appointment.';
    const find = validationErrors.find(error => error === notLoggedInError);

    if (!user) {
      if (!find) {
        setValidationErrors([...validationErrors, notLoggedInError]);
      }
      return setHideErrors(false);
    }

    const payload = {
      startDate,
      endDate,
      beeName,
      location,
      price,
      totalPrice: totalPrice.current,
      userId: user.id,
      beeId
    };

    // console.log('validationErrors: ', validationErrors)

    if (!validationErrors.length) {
      const newBooking = await dispatch(createBooking(payload));
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
          {validationErrors && validationErrors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      </div>
      <div id='booking-form-container'>
        <div id='price-div-container'>
          <div className='price-div'>
            <h2>{`$${price}`}</h2>
            <p id='day'>day</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          >
          <div className="reservation-dates">
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
              {!!stayLength.current && (
                <div
                  className="price-totals"
                  hidden={validationErrors.length}
                >
                  <div className="price-breakdown-div">
                    <p className="subtotals">
                      {`$${price} x ${stayLength.current} days`}
                    </p>
                    <p className="subtotal-by-day">
                      {`$${(price * stayLength.current).toFixed(2)}`}
                    </p>
                  </div>
                  <div className="price-breakdown-div">
                    <p>Hospitality fees</p>
                    <p>{`$${hospitalityFee}`}</p>
                  </div>
                  <div className="price-breakdown-div" id="total">
                    <p>Total</p>
                    <p>{`$${totalPrice.current}`}</p>
                  </div>
                </div>
              )}
          </div>
          <button id='reserve-button' className="big-buttons">
            Reserve
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingSidebar;
