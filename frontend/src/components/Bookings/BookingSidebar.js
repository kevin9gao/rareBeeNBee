import React from "react";
import { useSelector } from "react-redux"

const BookingSidebar = () => {
  const user = useSelector(state => state.session.user);

  return (
    <div id='booking-container'>
      <div>
        <h2>Book Your Stay Here!</h2>
        <form>
          <input
            id='start-date'
            placeholder="Start Date"
            ></input>
        </form>
      </div>
    </div>
  );
}

export default BookingSidebar;
