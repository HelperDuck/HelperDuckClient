import { UserType } from "../Types/UserType";


const BASE_URL: string = 'https://helperduck-dev.herokuapp.com'


// export async function createNewProfile(user: any, profileName: string) {
//   console.log('function not yet implemented');
// }

export async function postUserProfile(user: UserType) {
  try {

  const newUserProfile: any = await fetch(`${BASE_URL}/user`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user),
  });
  return await newUserProfile;

  } catch (err) {
    console.log("Error at postUserProfile Service: ", err);
  }
}

//logic needs to be getUserProfileByID
export async function getUserProfile(user: UserType): Promise<any> {
  try {

    console.log(user.uid, 'dentro do service')
    const userProfileById = await fetch(`${BASE_URL}/user/${user.uid}`);
    console.log(userProfileById, 'duserProfileByIde')
    let result = await userProfileById.json();
    console.log(result, 'result')
    return result

  } catch (err) {
    console.log("Error at getUserProfile Service: ", err);
  }
}

export async function editUserProfile(user: UserType) {
  try {

  const editedUserProfile: any = await fetch(`${BASE_URL}/user/${user.uid}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user),
  });
  return await editedUserProfile;

  } catch (err) {
    console.log("Error at editUserProfile Service: ", err);
  }
} //use the returned value to set or manage state;
