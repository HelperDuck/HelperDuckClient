import { UserType } from "../Types/UserType";
import { BACKEND_CONNECTION } from "./backEndConnection";

const BASE_URL: string = BACKEND_CONNECTION;

type AddCreditsToUserArgs = {
  uid: UserType;
  creditsBought: number;
};

export async function addCreditsToUser(user: AddCreditsToUserArgs) {
  // user = {uid: user.uid, creditsBought: amount}
  const addCreditsObj = {
    creditsBought: user.creditsBought,
    superSecret: "superSecret",
  };
  try {
    const creditsToUser: any = await fetch(
      `${BASE_URL}/user/${user.uid}/addCredits`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addCreditsObj),
      }
    );
    return creditsToUser;
  } catch (err) {
    console.log("Error at addCreditsToUser Service: ", err);
  }
}
