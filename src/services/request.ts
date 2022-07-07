import { requestAskedType } from "../Types/RequestAskedType";
import { BACKEND_CONNECTION } from "./backEndConnection";

const BASE_URL: string = BACKEND_CONNECTION;

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

export async function postOfferHelp(helpRequest: any, offer: any) {
  try {
    const createNewHelpOffer: any = await fetch(
      `${BASE_URL}/helpRequest/${helpRequest}/helpOffer`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offer),
      }
    );
    return await createNewHelpOffer;
  } catch (err) {
    console.log("Error at postOfferHelp Service: ", err);
  }
}

export async function postDeclineOffer(helpRequestId: any, offer: any) {
  try {
    const DeclineOffer: any = await fetch(
      `${BASE_URL}/helpRequest/${helpRequestId}/helpOfferDecline`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offer),
      }
    );
    return await DeclineOffer;
  } catch (err) {
    console.log("Error at postDeclineOffer Service: ", err);
  }
}

export async function deleteRequest(request: requestAskedType) {
  try {
    const deletedRequest: any = await fetch(
      `${BASE_URL}/helpRequest?helpRequestId=${request}`,
      {
        method: "DELETE",
      }
    );
    return deletedRequest;
  } catch (err) {
    console.log("Error at deleteRequest Service: ", err);
  }
}

export async function getHelpById(HelpID: any): Promise<any> {
  try {
    const helpById = await fetch(`${BASE_URL}/helpRequest/${HelpID}`);
    return await helpById.json();
  } catch (err) {
    console.log("Error at helpById Service: ", err);
    return null;
  }
}
