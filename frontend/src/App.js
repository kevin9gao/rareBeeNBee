import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import './index.css';
import SingleBee from "./components/SingleBee";
import NewBeeForm from "./components/NewBeeForm";
import { getBees } from "./store/bees";
import BookingSuccess from "./components/Bookings/BookingSuccess";
import UserBookings from "./components/Bookings/UserBookings";
import ProfilePage from "./components/ProfilePage";
import MorePics from "./components/SingleBee/MorePics";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // console.log('App.js restoreUser dispatched');
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    // console.log('App.js getBees dispatched');
    dispatch(getBees());
  }, [dispatch])

  return (
    <div className="main-container">
      <div id="navbar">
        <Navigation isLoaded={isLoaded} />
      </div>
      <main>
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path='/bees/new'>
            <NewBeeForm />
          </Route>
          <Route exact path='/bees/:beeId/all-pics'>
            <MorePics />
          </Route>
          <Route path={`/bees/:beeId`}>
            <SingleBee />
          </Route>
          <Route path={`/bookings/:bookingId`}>
            <BookingSuccess />
          </Route>
          <Route path='/users/:userId/bookings'>
            <UserBookings />
          </Route>
          <Route path='/users/:userId'>
            <ProfilePage />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
