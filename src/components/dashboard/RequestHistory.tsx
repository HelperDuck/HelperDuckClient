import React from "react";
import { useSelector } from "react-redux";
import { requestAskedType } from "../../Types/RequestAskedType";
import { CreatedByMe } from "./CreatedByMe";
import "./RequestHistory.css";
import { SinglePastRequest } from "./SinglePastRequest";

type Props = {};

export const RequestHistory = (props: Props) => {
  const user = useSelector((state: any) => state.user.value);
  const allHelpRequests = useSelector((state: any) => state.helpRequests.value);
  const solvedHelpRequests = user.helpOffers.filter(
    (item: any) => item.status === "solved"
  );
  const filteredHR = allHelpRequests.filter((item: any) => {
    return item.userId === user.id;
  });

  return (
    <div className="RequestHistory-wrapper">
      <div className="outer-container">
        <div className="title">
          <span>Requests Solved</span>
        </div>
        <div className="past-request-carrousel">
          {solvedHelpRequests.length ? (
            solvedHelpRequests.reverse().map((help: any, key: number) => {
              return (
                <SinglePastRequest key={key} help={help}></SinglePastRequest>
              );
            })
          ) : (
            <div className="noRequests">
              <div>No Requests Solved</div>
            </div>
          )}
        </div>
      </div>

      <div className="outer-container">
        <div className="title">
          <span>My Requests</span>
        </div>
        <div className="past-request-carrousel">
          <div className="single-review-outer-wrapper">
            {filteredHR.length ? (
              filteredHR
                .reverse()
                .map((help: requestAskedType, key: number) => {
                  return <CreatedByMe key={key} help={help}></CreatedByMe>;
                })
            ) : (
              <div className="noRequests">
                <div>No Requests Created</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
