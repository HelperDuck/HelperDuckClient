import { UserType } from "../Types/UserType";
import { BASE_URL } from "./profile";

type AddCreditsToUserArgs = {
  uid: UserType,
  creditsBought: number,
}

export async function addCreditsToUser(user: AddCreditsToUserArgs){
  // user = {uid: user.uid, creditsBought: amount}
  const addCreditsObj = {
    creditsBought: user.creditsBought,
    superSecret: "superSecret"
  }
  console.log(user, 'user inside the service')
  try {
    const creditsToUser: any = await fetch(`${BASE_URL}/user/${user.uid}/addCredits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addCreditsObj),
    });
    console.log(creditsToUser, 'stringified payload')
    return creditsToUser;
  } catch (err) {
    console.log("Error at addCreditsToUser Service: ", err);
  }
}