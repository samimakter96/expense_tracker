import React, { useState } from 'react';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User has successfully signed up');

      // clearing the inputs fields after successfully submitting the data
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="shadow login-form">
      <h1>Sign Up</h1>
      <form onSubmit={submitHandler}>
        <div className="control">
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="control">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="control">
          <input
            className="form-control"
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-primary p-2 mt-2 form-control rounded"
          >
            Sign Up
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
