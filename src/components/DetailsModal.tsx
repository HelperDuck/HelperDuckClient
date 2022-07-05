import React from "react";
import "./DetailsModal.css";

function DetailsModal(props: any) {
  const setOpenModal = props;

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="body">
          <div className="modal-user-info">
            <div className="modal-profile-pic-container">
              <img
                className="modal-profile-pic"
                alt="foto"
                src="https://firebasestorage.googleapis.com/v0/b/helper-duck.appspot.com/o/profilePics%2Fhackercat.jpg?alt=media&token=3cd1ed19-6dd5-47b1-8f19-9da64389cbb8"
              ></img>
            </div>
            <div className="modal-info-container">
              <div className="modal-help-title">help request title</div>
              <div className="modal-help-creator"> by Mauricio Scain</div>
            </div>
          </div>
          <div className="modal-help-info">
            <label className="modal-help-tech">Technologies:</label>
            <div className="modal-help-tech">React Javascript</div>
            <label className="modal-help-description">Description:</label>
            <div className="modal-help-description">
              I need help center a div
            </div>
            <label className="modal-help-sandbox">Sandbox link:</label>
            <div className="modal-help-sandbox">www.sandbox.com</div>
            <label className="modal-help-snippet">Code snippet:</label>
            <div className="modal-help-snippet"> aaaaaaaaaaaaaaaaa</div>
          </div>

          <div className="modal-solver-info">
            <div className="modal-solver-pic">
              <img
                className="modal-solver-pic"
                alt="foto"
                src="https://firebasestorage.googleapis.com/v0/b/helper-duck.appspot.com/o/profilePics%2Fhackercat.jpg?alt=media&token=3cd1ed19-6dd5-47b1-8f19-9da64389cbb8"
              ></img>
            </div>
            <div className="modal-solver">
              <label className="modal-solver-by">Solved by: </label>
              <div className="modal-solver-name">Fernanda Gananciosa</div>
            </div>
          </div>
        </div>
        <div className="footer"></div>
      </div>
    </div>
  );
}

export default DetailsModal;
