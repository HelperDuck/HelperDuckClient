import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { myRequestModalState } from "../Redux/reducers/myRequestModalState";
import "./DetailsModal.css";

function DetailsModal(props: any) {
  const helpDetails = useSelector((state: any) => state.helpDetails.value);
  const allUsers = useSelector((state: any) => state.allUsers.value);
  const dispatch = useDispatch();

  const solvedHelpOffer = helpDetails.helpOffers.filter((item: any) => {
    if (item.status === "solved") return true;
    return false;
  });

  const solverUser = allUsers.filter(
    (solver: any) => solver.id === solvedHelpOffer[0].userId
  );

  return (
    <div className="modalBackground">
      <div className="modalContainer">
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
              <div className="modal-help-title">{helpDetails.subject}</div>
              <div className="modal-help-creator">
                {" "}
                by{" "}
                {helpDetails.user.firstName + " " + helpDetails.user.lastName}
              </div>
            </div>
          </div>
          <div className="modal-help-info">
            <label className="modal-help-label-tech">Technologies:</label>
            <div className="modal-help-tech">
              {helpDetails.technologies.map(
                (item: any) => item.technology.name + "  "
              )}
            </div>
            <label className="modal-help-label-description">Description:</label>
            <div className="modal-help-description">
              {helpDetails.description}
            </div>
            <label className="modal-help-label-sandbox">Sandbox link:</label>
            <div className="modal-help-sandbox">
              {helpDetails.linkToSandbox}
            </div>
            <label className="modal-help-label-snippet">Code snippet:</label>
            <div className="modal-help-snippet"> {helpDetails.codeSnippet}</div>
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
              <div className="modal-solver-name">
                {solverUser[0].firstName + " " + solverUser[0].lastName}
              </div>
              <div className="titleCloseBtn">
                <button
                  onClick={() => {
                    dispatch(myRequestModalState(false));
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsModal;
