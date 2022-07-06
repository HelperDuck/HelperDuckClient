import { useSelector } from "react-redux";
import "./SingleReview.css";

type Props = {
  review: any;
};

export const SingleReview = (props: Props) => {
  const { review } = props;
  const allUsers = useSelector((state: any) => state.allUsers.value);
  const allHelpRequests = useSelector((state: any) => state.helpRequests.value);

  const findHelpReq = allHelpRequests.filter((help: any) => {
    return review.helpRequestId === help.id;
  });

  const findHelpOffer = findHelpReq[0].helpOffers.filter((offer: any) => {
    return offer.status === "solved";
  });

  const userFound = allUsers.filter((user: any) => {
    return findHelpOffer[0].userId === user.id;
  });

  console.log(findHelpOffer, "findHelpOffer full");
  console.log(findHelpReq, "findHelpReq");
  console.log(review, "review");

  return (
    <div className="single-review-wrapper dash-wrapper">
      {" "}
      <div className="single-review-info">
        <div className="single-review-pic">
          <img
            className="review-pic"
            src={userFound[0].profilePic}
            alt="foto"
          ></img>{" "}
        </div>
        <div className="single-review-user">
          {" "}
          by {userFound[0].firstName + " " + userFound[0].lastName}
        </div>
      </div>
      <div className="review-text-container">
        <div className="single-review-title">{findHelpReq[0].subject}</div>
        <div className="single-review-text">{review.comment}</div>
      </div>
    </div>
  );
};
