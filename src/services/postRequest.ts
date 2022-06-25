import { requestAskedType } from "../Types/RequestAskedType";
import { UserType } from "../Types/UserType";

export async function postRequest( user: UserType, request: requestAskedType) {
  console.log(user, 'user');
  console.log(request, 'request');
}