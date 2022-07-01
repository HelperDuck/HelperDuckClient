import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  GithubAuthProvider,
} from "firebase/auth";

import { app } from "./firebase";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

    return user;
    //TODO: add user/or profile to db if not already there
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithGithub = async () => {
  try {
    const res = await signInWithPopup(auth, gitHubProvider);
    const user = res.user;

    return user;
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    //TODO: add user/or profile to db if not already there
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    return user;

    //TODO: add user/or profile to db if not already there
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  console.log("ooouuuutt")
  signOut(auth);
};

export {
  auth,
  signInWithGoogle,
  signInWithGithub,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
