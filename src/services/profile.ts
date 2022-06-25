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

//logic needs to be getUserProfileByID
export async function getUserProfileById(uid: UserType): Promise<any> {
  try {
    const userProfileById = await fetch(`${BASE_URL}/profile/get/:${uid}`);
    return await userProfileById.json();
  } catch (err) {
      console.log('Error at getUserProfile Service: ', err);
  }
}