import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import "./SingleReview.css";

type Props = {
  review: any;
};

export const SingleReview = (props: Props) => {
  const user = useSelector((state: any) => state.user.value);
  const { review } = props;
  const allHelpRequests = useSelector((state: any) => state.helpRequests.value);

  const findHelpReq = allHelpRequests.filter((help: any) => {
    return review.helpRequestId === help.id;
  });

  return (
    <div className="single-review-wrapper dash-wrapper">
      {" "}
      <div className="single-review-info">
        <div className="single-review-pic">
          <img
            className="review-pic"
            src={findHelpReq[0].user.profilePic}
            alt="foto"
          ></img>{" "}
        </div>
        <div className="single-review-user">
          {" "}
          by{" "}
          {user.id === findHelpReq[0].userId
            ? "me"
            : findHelpReq[0].user.firstName +
              " " +
              findHelpReq[0].user.lastName}
        </div>
      </div>
      <div className="review-text-container">
        <div className="single-review-title">
          {findHelpReq[0].subject}{" "}
          {user.id === findHelpReq[0].userId ? (
            <Icon icon="bxs:help-circle" hFlip={false} />
          ) : (
            <Icon icon="ant-design:exclamation-circle-filled" hFlip={false} />
          )}{" "}
        </div>
        <div className="single-review-text">{review.comment}</div>
      </div>
    </div>
  );
};
