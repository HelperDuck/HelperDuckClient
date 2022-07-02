
import { requestAskedType } from "../Types/RequestAskedType";

// const BASE_URL: string = "https://helperduck.herokuapp.com";
const BASE_URL: string = "https://helperduck-dev.herokuapp.com";

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
    console.log(helpRequest, "helpRequest inside service")
    console.log(offer, "offer inside service")
    const createNewHelpOffer: any = await fetch(`${BASE_URL}/helpRequest/${helpRequest}/helpOffer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(offer),
    });
    console.log(createNewHelpOffer, 'createNewHelpOffer')
    return await createNewHelpOffer;
  } catch (err) {
    console.log("Error at postOfferHelp Service: ", err);
  }
}


export async function deleteRequest(request: requestAskedType) {
  try {
    console.log(request, 'request insite service')
    const deletedRequest: any = await fetch(`${BASE_URL}/helpRequest?helpRequestId=${request}`,{
      method: 'DELETE',
      redirect: 'follow'
    })
    console.log(deletedRequest, 'deletedRequest')
    return deletedRequest
    }

   catch (err) {
    console.log("Error at deleteRequest Service: ", err);
  }
}