import { reviewType } from "../Types/ReviewType";
import { BACKEND_CONNECTION } from "./backEndConnection";

const BASE_URL: string = BACKEND_CONNECTION;

export async function getRequestByRoomId(roomId: string): Promise<any> {
  try {
    const requestByRoomId = await fetch(`${BASE_URL}/roomData/${roomId}`);
    return await requestByRoomId.json();
  } catch (err) {
    console.log("Error at userRequestByRoomId Service: ", err);
  }
}

export async function postReviewHelpAsker(
  helpRequestId: any,
  helpOfferId: any,
  review: reviewType
) {
  try {
    const newReview: any = await fetch(
      `${BASE_URL}/helpRequest/${helpRequestId}/${helpOfferId}/solved`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      }
    );
    console.log(newReview, "newReview");
    return await newReview;
  } catch (err) {
    console.log("Error at postReviewHelpAsker Service: ", err);
  }
}
