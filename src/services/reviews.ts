import { reviewType } from "../Types/ReviewType";

const BASE_URL: string = "https://helperduck-dev.herokuapp.com";

//TODO create tyoe for review

export async function postReviewHelpAsker(review: reviewType) {
  try {
    const newReview: any = await fetch(`${BASE_URL}/helpReview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });
    console.log(newReview, "newReview");
    return await newReview;
  } catch (err) {
    console.log("Error at postReviewHelpAsker Service: ", err);
  }
}
