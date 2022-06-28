import React from "react";
import { useSelector } from "react-redux";
import { requestAskedType } from "../Types/RequestAskedType";
import { CreatedByMe } from "./CreatedByMe";
import "./RequestHistory.css";
import { SinglePastRequest } from "./SinglePastRequest";

type Props = {};

export const RequestHistory = (props: Props) => {
  const user = useSelector((state: any) => state.user.value);
  const allHelpRequests = useSelector((state: any) => state.helpRequests.value);

  const filteredHR = allHelpRequests.filter((item: any) => {
    return item.userId === user.id;
  });

  return (
    <div className="RequestHistory-wrapper">
      <div className="outer-container">
        <div className="title">
          <span>Past Requests</span>
        </div>
        <div className="past-request-carrousel">
          <SinglePastRequest></SinglePastRequest>
        </div>
      </div>

      <div className="outer-container">
        <div className="title">
          <span>Created by me</span>
        </div>
        <div className="past-request-carrousel">
          {filteredHR.map((help: requestAskedType) => {
            return <CreatedByMe help={help}></CreatedByMe>;
          })}
        </div>
      </div>
    </div>
  );
};
