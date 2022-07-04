import { reviewType } from "../Types/ReviewType";

const BASE_URL: string = "https://helperduck-dev.herokuapp.com";

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
