import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  };

  return (
    <>
      <motion.div
        className="home"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth, transition: { duration: 0.9 } }}
      ></motion.div>
      <div className="background-image">
        <div className="home-content">
          <div className="brand-name">Helper Duck</div>
          <div className="text-brand">
            Welcome to the platform where programmers can help each other by
            sharing knowledge and making the Tech World even better
          </div>
          <button className="btn-start" onClick={onClick}>
            Get started
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
