import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../services/authentication";
import { useAuthState } from "react-firebase-hooks/auth";
import "./LoginPage.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen/
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]); //eslint-disable-line

  return (
    <div className="login-wrapper">
      <div className="login-info-wrapper">
        <div className="login-container">
          <div className="login">
            <div>{error ? error.message : ""}</div>
            <div className="login__container">
              <div className="signin">Sing In:</div>
              <input
                type="text"
                className="login__textBox"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail Address"
              />
              <input
                type="password"
                className="login__textBox"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <button
                className="login__btn"
                onClick={() => logInWithEmailAndPassword(email, password)}
              >
                Login
              </button>
              <button
                className="login__btn login__google"
                onClick={signInWithGoogle}
              >
                Login with Google
              </button>
              <div>
                <Link to="/reset">Forgot Password</Link>
              </div>
              <div>
                Don't have an account? <Link to="/register">Register</Link> now.
              </div>
            </div>
          </div>
        </div>
        <div className="login-info-container">
          <div className="login-info">
            <div className="login-duck">
              {" "}
              <img
                className="duck-image"
                src="https://res.cloudinary.com/brnl/image/upload/v1656524921/brnl/patooo_hmcqfv.png"
                alt="pato"
              ></img>
            </div>
            <div className="login-title">Helper Duck</div>
            <div className="login-about">
              <span>Helper Duck</span> is a plataform where programmers can help
              each other by sharing knowledge and making the Tech World even
              better!{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
