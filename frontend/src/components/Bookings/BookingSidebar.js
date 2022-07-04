import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom";
import { getBees } from "../../store/bees";
import { createBooking } from "../../store/bookings";
import './BookingSidebar.css';

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
  const [hidePriceCalcs, setHidePriceCalcs] = useState(false);
  const [hideErrors, setHideErrors] = useState(true);

  let stayLength = useRef(0);
  let totalPrice = useRef(0);
  let hospitalityFee = (price <= 1000) ? 100 : price / 5;

  useEffect(() => {
    stayLength.current = ((new Date(endDate)) - (new Date(startDate))) / 86400000;
    // console.log('stayLength.current: ', stayLength.current);
    totalPrice.current = (price * stayLength.current) + hospitalityFee;
    dispatch(getBees());
  }, [startDate, endDate, hospitalityFee, price, dispatch]);

  useEffect(() => {
    const errors = [];

    if (new Date(startDate) < (new Date())) {
      errors.push('Start date must be in the future.');
    } else if (new Date(endDate) < new Date(startDate)) {
      errors.push('End date cannot be before Start date.');
    }

    setValidationErrors(errors);

    if (!validationErrors.length) {
      setHidePriceCalcs(false)
    } else setHidePriceCalcs(true);

    dispatch(getBees());
  }, [startDate, endDate, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    console.log('validationErrors: ', validationErrors)

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
          </div>
          <button id='reserve-button' className="big-buttons">
            Reserve
          </button>
        </form>
        {!!stayLength.current && (
          <div
            className="price-totals"
            hidden={hidePriceCalcs}
          >
            <div className="price-breakdown-div">
              <p className="subtotals">
                {`$${price} x ${stayLength.current} days`}
              </p>
              <p className="subtotal-by-day">
                {`$${price * stayLength.current}`}
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
    </div>
  );
}

export default BookingSidebar;
