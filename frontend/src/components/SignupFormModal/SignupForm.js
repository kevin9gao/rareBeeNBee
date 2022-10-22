import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import Logo from '../../favicon.png';
import '../LoginFormModal/LoginSignup.css';

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState('');
  const [image, setImage] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [hideErrors, setHideErrors] = useState(true);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);
  // console.log('users SignupForm', users);

  useEffect(() => {
    const errors = [];

    if (email.length === 0) {
      errors.push('Please provide an email.');
    } else if (email.length > 256) {
      errors.push('Email cannot be more than 256 characters long.');
    } else if (users.map(user => user.email).includes(email)) {
      errors.push('Email is already in use.');
    } else if (!email.includes('@')) {
      errors.push('Please provide a valid email.');
    }

    if (username.length === 0) {
      errors.push('Please provide a username.');
    } else if (username.length > 30) {
      errors.push('Username cannot be more than 30 characters long.');
    } else if (users.map(user => user.username).includes(username)) {
      errors.push('Username is taken.');
    }

    if (!password.length) {
      errors.push('Please provide a password.');
    } else if (confirmPassword !== password) {
      errors.push('Confirm password must match password.');
    }

    setValidationErrors(errors);
  }, [email, username, password, image, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setValidationErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setValidationErrors(data.errors);
      });
    }
    return setValidationErrors(['Confirm Password field must be the same as the Password field']);
  };

  const updateFile = e => {
    const file = e.target.files[0];
    if (file) setImage(file);
  }

  if (sessionUser) return <Redirect to="/" />;

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
          hidden={hideErrors}
        >
          {validationErrors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          className="login-signup-inputs"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
          className="login-signup-inputs"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          className="login-signup-inputs"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='Confirm password'
          className="login-signup-inputs"
        />
        <input
          type='text'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder='Profile Picture URL (You can leave this empty.)'
          className="login-signup-inputs"
        />
        <label>Or, upload your own image!</label>
        <input
          type='file'
          onChange={updateFile}
          className='upload-file'
        />
        <button
          type="submit"
          className="big-buttons"
          id='login-signup-submits'
        >Sign Up</button>
      </form>
      <img
        src={Logo}
        className='logo'
        id="logo-signup"
        alt="logo"
      />
    </div>
  );
}

export default SignupForm;
