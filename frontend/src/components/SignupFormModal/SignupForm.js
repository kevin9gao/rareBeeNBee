import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import '../LoginFormModal/LoginSignup.css';

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="login-signup-container">
      <div className="login-or-signup">
        <p>
          Sign up
        </p>
      </div>
      <h3 className="welcome">Welcome To RareBeeNBee</h3>
      <form
        onSubmit={handleSubmit}
        className='login-signup-forms'
        id="signup-form"
      >
        <ul
          hidden={!errors.length}
        >
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          required
          className="login-signup-inputs"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
          required
          className="login-signup-inputs"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          required
          className="login-signup-inputs"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='Confirm password'
          required
          className="login-signup-inputs"
        />
        <button
          type="submit"
          className="big-buttons"
          id='login-signup-submits'
        >Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
