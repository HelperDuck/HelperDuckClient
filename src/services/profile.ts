import { UserType } from "../Types/UserType";

// const BASE_URL: string = "https://helperduck.herokuapp.com";
const BASE_URL: string = "https://helperduck-dev.herokuapp.com";

//logic needs to be getUserProfileByID
export async function getUserProfile(isAuthUser: {
  uid: string;
  email: string;
  displayName?: string;
}): Promise<any> {
  try {
    const userProfileById = await fetch(`${BASE_URL}/user/${isAuthUser.uid}`);
    return await userProfileById.json();
  } catch (err) {
    console.log("Error at getUserProfile Service: ", err);
    return null;
  }
}

export async function createUser(isAuthUser: {
  uid: string;
  email: string;
  displayName?: string;
  userName?: string;
}): Promise<any> {
  try {
    const newUserData = {
      userName: isAuthUser.displayName ? isAuthUser.displayName : "new User",
      email: isAuthUser.email,
      uid: isAuthUser.uid,
    };
    console.log("newUserData: ", newUserData);
    const newUserProfile: any = await fetch(`${BASE_URL}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUserData),
    });
    return newUserProfile;
  } catch (err) {
    console.log("Error at createUserProfile Service: ", err);
  }
}

export async function getAllUsers(): Promise<any> {
  try {
    const userProfileById = await fetch(`${BASE_URL}/users`);
    return await userProfileById.json();
  } catch (err) {
    console.log("Error at getUserProfile Service: ", err);
  }
}

export async function editUserProfile(user: UserType) {
  try {
    const editedUserProfile: any = await fetch(`${BASE_URL}/user/${user.uid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    return await editedUserProfile;
  } catch (err) {
    console.log("Error at editUserProfile Service: ", err);
  }
} //use the returned value to set or manage state;

export async function getOtherProfile(userId: string): Promise<any> {
  try {
    const userProfileById = await fetch(`${BASE_URL}/user/${userId}`);
    return await userProfileById.json();
  } catch (err) {
    console.log("Error at getUserProfile Service: ", err);
  }
}
