import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
  signInWithGithub,
} from "../../services/authentication";
import { useAuthState } from "react-firebase-hooks/auth";
import "./LoginPage.css";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

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
    <>
      <motion.div
        className="home"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth, transition: { duration: 0.9 } }}
      ></motion.div>
      <div className="login-wrapper">
        <Icon
          className="icon"
          icon="icon-park-solid:duck"
          color="rgb(255, 218, 35)"
          height={150}
          width={150}
        />
        <div className="login-container">
          <div className="login">
            <div>{error ? error.message : ""}</div>
            <div className="login__container">
              <div className="signin">
                <p id="signin">Sign In:</p>
              </div>
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
              <button
                className="login__btn login__google"
                onClick={signInWithGithub}
              >
                Login with GitHub
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
      </div>
    </>
  );
}

export default Login;
