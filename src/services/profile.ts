import { UserType } from "../Types/UserType";

const BASE_URL: string = 'http://localhost:3002'

// export async function createNewProfile(user: any, profileName: string) {
//   console.log('function not yet implemented');
// }

export async function postUserProfile( user: UserType ) {
  try {
  const newUserProfile: any = await fetch(`${BASE_URL}/profile/post`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user),
  });
  return await newUserProfile;
  } catch (err) {
    console.log('Error at postUserProfile Service: ', err)
  }
}
