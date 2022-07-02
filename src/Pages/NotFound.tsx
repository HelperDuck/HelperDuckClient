import React from "react";
import { useNavigate } from "react-router-dom";

import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="login-wrapper">
      <div className="not-found-wrapper">
        <div className="not-found-btn-container">
          <div onClick={() => navigate("/")} className="not-found-btn">
            Back to <span> helperduck.com</span>
          </div>
        </div>
        <div className="not-found-image-container">
          {" "}
          <img
            className="not-found-img"
            alt="not found"
            src="https://res.cloudinary.com/brnl/image/upload/v1656701173/HelperDuck/giphy_q3wdha.gif"
          ></img>
        </div>
        <div className="not-found-msg">Oops...Page not found</div>
      </div>
    </div>
  );
}

export default NotFound;
