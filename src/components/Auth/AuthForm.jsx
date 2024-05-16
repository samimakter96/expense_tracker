import React, { useState } from 'react';
import './AuthForm.css';
import { auth } from '../../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const authContext = useAuth();

  const navigate = useNavigate();

  const switchAuthModelHandler = () => {
    setIsLogin(!isLogin);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      let response;
      if (isLogin) {
        // Handle login
        response = await signInWithEmailAndPassword(auth, email, password);
        // console.log('User has successfully logged in');
      } else {
        // Handle sign up
        await createUserWithEmailAndPassword(auth, email, password);
        // console.log('User has successfully signed Up');
      }

      const token = await response.user.getIdToken();
      authContext.login(token);

      // Clear input fields after successful submission
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Navigate to Home page
      navigate('/');
      
    } catch (error) {
      alert(error.message);
    } finally {
      // Ensure setIsLoading(false) is called regardless of success or failure
      setIsLoading(false);
    }
  };

  return (
    <section className="shadow login-form">
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
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
          {/* render the button when isLoading is false  */}
          {!isLoading && (
            <button
              type="submit"
              className="btn btn-primary p-2 mt-2 form-control rounded"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          )}
          {/* if isLoading is true then render this message */}
          {isLoading && <p>Sending request...</p>}

          <button
            type="button"
            className="toggle"
            onClick={switchAuthModelHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
    </section>
  );
};

export default AuthForm;
