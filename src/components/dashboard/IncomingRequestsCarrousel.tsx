import { useSelector } from "react-redux";
import { requestAskedType } from "../../Types/RequestAskedType";
import { IncomingRequest } from "./IncomingRequest";
//@ts-ignore
import notification from "../../media/Notification.svg";

import "./IncomingRequestsCarrousel.css";

type Props = {};

export const IncomingRequestsCarrousel = (props: Props) => {
  const allHelpRequests = useSelector((state: any) => state.helpRequests.value);
  const user = useSelector((state: any) => state.user.value);
  const userTechs = user.technologies.map((item: any) => item.technology.name);

  const filteredHR = allHelpRequests
    .filter((helpRequest: any) => {
      if (
        helpRequest.user &&
        user.uid !== helpRequest.user.uid &&
        helpRequest.status === "open"
      ) {
        for (let i = 0; i < helpRequest.technologies.length; i++) {
          if (userTechs.includes(helpRequest.technologies[i].technology.name)) {
            return true;
          }
        }
      }

      return false;
    })
    .filter((helpRequest: any) => {
      if (helpRequest.helpOffers.length) {
        for (let j = 0; j < helpRequest.helpOffers.length; j++) {
          if (
            helpRequest.helpOffers[j].userId === user.id &&
            helpRequest.helpOffers[j].status !== "declined"
          ) {
            return true;
          } else {
            return false;
          }
        }
      }
      return true;
    });

  return (
    <div className="carrousel-outer-container">
      <div className="title">
        <span>Incoming Requests</span>
        <div className="notification-icon">
          <img src={notification} alt="notification" />
        </div>
      </div>
      <div className="request-carrousel">
        {filteredHR.length ? (
          filteredHR.reverse().map((help: requestAskedType, key: number) => {
            return <IncomingRequest help={help} key={key}></IncomingRequest>;
          })
        ) : (
          <div className="noRequests">
            <div>No Incoming Requests</div>
          </div>
        )}
      </div>
    </div>
  );
};
