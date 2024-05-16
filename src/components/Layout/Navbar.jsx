import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const authContext = useAuth();
  const isLoggedIn = authContext.isLoggedIn;

  const logOutHandler = () => {
    authContext.logout();
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.logo}>Expense Tracker</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}


          {isLoggedIn && (
            <li>
              <button onClick={logOutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
