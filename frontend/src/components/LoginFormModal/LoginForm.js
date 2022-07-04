import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="login-signup-container">
      <div className="login-or-signup">
        <p>
          Log in
        </p>
        </div>
      <h3 className="welcome">Welcome To RareBeeNBee</h3>
      <form onSubmit={handleSubmit} className='login-signup-forms'>
        <ul
          hidden={!errors.length}
        >
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          placeholder='Username or Email'
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
        <button
          type="submit"
          className="big-buttons"
          id='login-signup-submits'
        >Log In</button>
      </form>
    </div>
  );
}

export default LoginForm;
