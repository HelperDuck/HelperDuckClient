import { UserType } from "../Types/UserType";
import { BASE_URL } from "./profile";

export async function addCreditsToUser( user: { uid: UserType, creditsBought: number } ){
  try {
    const creditsToUser: any = await fetch(`${BASE_URL}/user/:uid/addCredits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    return await creditsToUser;
  } catch (err) {
    console.log("Error at addCreditsToUser Service: ", err);
  }
}