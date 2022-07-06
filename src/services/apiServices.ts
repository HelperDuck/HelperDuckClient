import { getAllLanguages, getAllTechnologies } from "./languages";
import { getAllUsers, getUserProfile } from "./profile";
import { getAllHelpRequests } from "./request";

const fetchLanguages = async () => {
  try {
    return await getAllLanguages();
  } catch (err) {
    console.error(err, "Error in All Languages apiService fetch");
  }
};

const fetchTechnologies = async () => {
  try {
    return await getAllTechnologies();
  } catch (err) {
    console.error(err, "Error in All Languages apiService fetch");
  }
};

const fetchAllHelpRequests = async () => {
  try {
    return await getAllHelpRequests();
  } catch (err) {
    console.error(err, "Error in All Languages apiService fetch");
  }
};

const fetchAllUsers = async () => {
  try {
    return await getAllUsers();
  } catch (err) {
    console.error(err, "Error in All Languages apiService fetch");
  }
};

const fetchProfile = async (AuthUser: any) => {
  try {
    return await getUserProfile(AuthUser);
  } catch (err) {
    console.error(err);
  }
};

export {
  fetchAllUsers,
  fetchAllHelpRequests,
  fetchProfile,
  fetchTechnologies,
  fetchLanguages,
};
