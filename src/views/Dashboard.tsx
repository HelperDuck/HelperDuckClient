import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { auth, logout } from '../services/authentication';

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  console.log('user', user);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');
  }, [user, loading]); //eslint-disable-line

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <div>{error ? error.message : ''}</div>
        <div>{user?.email}</div>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
