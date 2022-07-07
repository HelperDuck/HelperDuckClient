import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Rating from "./Rating";
import SliderRange from "./Slider";
import { Backdrop } from "./Backdrop";
import { useDispatch, useSelector } from "react-redux";
import { reviewType } from "../../Types/ReviewType";

import {
  getRequestByRoomId,
  postReviewHelpAsker,
  postReviewHelpOffer,
} from "../../services/reviews";
import { modalState } from "../../Redux/reducers/ModalReducer";
import { loginProfile, updateCredits } from "../../Redux/reducers/user";
import { getUserProfile } from "../../services/profile";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0vh",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

export const ModalContainer = ({ children }: any) => (
  // Enables the animation of components that have been removed from the tree
  <AnimatePresence
    // Disable any initial animations on children that
    // are present when the component is first rendered
    initial={true}
    // Only render one component at a time.
    // The exiting component will finish its exit
    // animation before entering component is rendered
    exitBeforeEnter={true}
    // Fires when all exiting nodes have completed animating out
  >
    {children}
  </AnimatePresence>
);

export const Modal = ({ handleClose }: any) => {
  return (
    <Backdrop>
      <motion.div
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
        className="modal-gradient"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <ModalText />
      </motion.div>
    </Backdrop>
  );
};

const ModalText = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.value);
  const roomIdState = useSelector((state: any) => state.roomIdState.value);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [value, setValue] = useState(0);
  const [requestByRoomId, setRequestByRoomId] = useState({
    helpOffer: { user: { id: 0 }, id: 0 },
    helpRequest: { id: 0, userId: 0 },
  });
  const helpByRoomId = async () => {
    try {
      const result = await getRequestByRoomId(roomIdState);
      setRequestByRoomId(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (roomIdState) {
      helpByRoomId();
    }
  }, []); //eslint-disable-line

  const onSubmitReview = async (e: any) => {
    e.preventDefault();

    if (!requestByRoomId) {
      //Checks to update user for extra credits
      const profileFound = await getUserProfile(user);
      if (profileFound && profileFound.uid === user.uid) {
        dispatch(loginProfile(profileFound));
      }
      dispatch(modalState(false));
    }

    const newAskerReview: reviewType = {
      tipGiven: value,
      review: {
        rating: rating,
        comment: comment,
      },
    };

    const newOfferReview: reviewType = {
      rating: rating,
      comment: comment,
      userId: requestByRoomId.helpRequest.userId,
      helpOfferId: requestByRoomId.helpOffer.id,
    };

    if (requestByRoomId && user.id === requestByRoomId.helpRequest.userId) {
      postReviewHelpAsker(
        requestByRoomId.helpRequest.id,
        requestByRoomId.helpOffer.id,
        newAskerReview
      );

      if (newAskerReview.tipGiven) {
        dispatch(updateCredits(newAskerReview.tipGiven * -1));
      }
    } else {
      postReviewHelpOffer(newOfferReview);
    }

    setRating(0);
    setComment("");
    setValue(0);

    if (!rating) {
      alert("Please give us your feedback");
    }
    dispatch(modalState(false));
    // window.location.reload();
  };

  return (
    <div className="modal-text">
      <div className="model-header-container">
        <h1 id="h1">We value your feedback</h1>
        <h2 id="h2">
          Please complete the following form and help us grow our community
        </h2>
      </div>
      <form className="form-container">
        <div className="box-wrapper">
          <label htmlFor="rating">How do you rate this service?</label>
          <Rating
            rating={rating}
            onRating={(rate: any) => setRating(rate)}
          ></Rating>
          <textarea
            className="write-review"
            placeholder="Please write a review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        {requestByRoomId && user.id === requestByRoomId.helpRequest.userId ? (
          <>
            <label className="price-range-label">
              Was it helpful? Contribute with a tip!
            </label>
            <SliderRange value={value} setValue={setValue}></SliderRange>{" "}
          </>
        ) : (
          <></>
        )}
        <button id="form-submit" onClick={onSubmitReview}>
          Submit
        </button>
      </form>
    </div>
  );
};
