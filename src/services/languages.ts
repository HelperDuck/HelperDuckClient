import { BACKEND_CONNECTION } from "./backEndConnection";
const BASE_URL: string = BACKEND_CONNECTION;

export async function getAllLanguages(): Promise<any> {
  try {
    const allLanguages = await fetch(`${BASE_URL}/languages`);
    return await allLanguages.json();
  } catch (err) {
    console.log("Error at getAllLanguages Service: ", err);
  }
}

export async function getAllTechnologies(): Promise<any> {
  try {
    const allTechnologies = await fetch(`${BASE_URL}/technologies`);
    return await allTechnologies.json();
  } catch (err) {
    console.log("Error at getAllTechnologies Service: ", err);
  }
}
