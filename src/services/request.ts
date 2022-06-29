import { requestAskedType } from "../Types/RequestAskedType";

const BASE_URL: string = "https://helperduck.herokuapp.com";

export async function postRequest(request: requestAskedType) {
  try {
    const newRequest: any = await fetch(`${BASE_URL}/helpRequest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    return await newRequest;
  } catch (err) {
    console.log("Error at postRequest Service: ", err);
  }
}

export async function getAllHelpRequests(): Promise<any> {
  try {
    const allIncomingRequests = await fetch(`${BASE_URL}/helpRequests`);
    return await allIncomingRequests.json();
  } catch (err) {
    console.log("Error at getAllIncomingRequests Service: ", err);
  }
}
