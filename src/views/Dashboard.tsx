import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, logout } from "../services/authentication";

function Dashboard() {
  const [isAuthUser, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  console.log("isAuthUser", isAuthUser);

  useEffect(() => {
    if (loading) return;
    if (!isAuthUser) return navigate("/");
  }, [isAuthUser, loading]); //eslint-disable-line

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <div>{error ? error.message : ""}</div>
        <div>{isAuthUser?.email}</div>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
