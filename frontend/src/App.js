import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import './index.css';
import SingleBee from "./components/SingleBee";
import NewBeeForm from "./components/NewBeeForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="main-container">
      <div id="navbar">
        <Navigation isLoaded={isLoaded} />
      </div>
      <main>
        {isLoaded && (
          <Switch>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
          </Switch>
        )}
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path='/bees/new'>
            <NewBeeForm />
          </Route>
          <Route exact path={`/bees/:beeId`}>
            <SingleBee />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
