import React from "react";
import { useSelector } from "react-redux";
import { requestAskedType } from "../Types/RequestAskedType";
import { IncomingRequest } from "./IncomingRequest";
import "./IncomingRequestsCarrousel.css";

type Props = {};

export const IncomingRequestsCarrousel = (props: Props) => {
  const allHelpRequests = useSelector((state: any) => state.helpRequests.value);

  // const filteredHR = allHelpRequests.filter((item) => {
  //   item.technologies.map((tech) => {
  //     if(user.technologies.map((userTech) => {userTech.technologyId === tech.technologyId }))
  //     {return <IncomingRequest></IncomingRequest>}
  //   })

  return (
    <div className="carrousel-outer-container">
      <div className="title">
        <span>Incomming Requests</span>
      </div>
      <div className="request-carrousel">
        {allHelpRequests.map((help: requestAskedType) => {
          return <IncomingRequest help={help} key={help.id}></IncomingRequest>;
        })}
      </div>
    </div>
  );
};
