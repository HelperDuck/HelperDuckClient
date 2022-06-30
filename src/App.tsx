import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./views/userLogIn/Register";
import Reset from "./views/userLogIn/Reset";
import { ProfilePage } from "./Pages/ProfilePage";
import { DashboardPage } from "./Pages/DashboardPage";
import { useDispatch } from "react-redux";
import { VideoCallPage } from "./Pages/VideoCallPage";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { allUsers } from "./Redux/reducers/AllUsers";
import { helpRequests } from "./Redux/reducers/helpRequest";
import { allLanguages } from "./Redux/reducers/languages";
import { Technologies } from "./Redux/reducers/technologies";
import { loginProfile } from "./Redux/reducers/user";
import { auth } from "./services/authentication";
import { getAllLanguages, getAllTechnologies } from "./services/languages";
import { getUserProfile, getAllUsers } from "./services/profile";
import { getAllHelpRequests } from "./services/request";
import { UserType } from "./Types/UserType";
import { CreateRequestPage } from "./Pages/CreateRequestPage";
import LoginPage from "./Pages/LoginPage";
import Protected from "./ProtectRoutes";

function App() {
  const [isAuthUser, loading] = useAuthState(auth);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("isAuthUser inside app", isAuthUser);

  useEffect(() => {
    if (loading) return;
    if (isAuthUser) {
      fetchProfile();
    }
  }, [isAuthUser]); //eslint-disable-line

  useEffect(() => {
    fetchLanguages();
    fetchTechnologies();
    fetchAllHelpRequests();
    fetchAllUsers();
  }, []); //eslint-disable-line

  const fetchProfile = async () => {
    try {
      const profileFound = await getUserProfile(
        isAuthUser as unknown as UserType
      );
      dispatch(loginProfile(profileFound));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLanguages = async () => {
    try {
      const AllLanguages = await getAllLanguages();
      dispatch(allLanguages(AllLanguages));
    } catch (err) {
      console.error(err, "Error in All Languages Fetch reducer");
    }
  };

  const fetchTechnologies = async () => {
    try {
      const allTechnologies = await getAllTechnologies();
      dispatch(Technologies(allTechnologies));
    } catch (err) {
      console.error(err, "Error in All Languages Fetch reducer");
    }
  };

  const fetchAllHelpRequests = async () => {
    try {
      const allHelpRequests = await getAllHelpRequests();
      console.log(allHelpRequests, "allHelpRequests");
      dispatch(helpRequests(allHelpRequests));
    } catch (err) {
      console.error(err, "Error in All Languages Fetch reducer");
    }
  };

  const fetchAllUsers = async () => {
    try {
      const allUser = await getAllUsers();
      console.log(allUser, "allUser");
      dispatch(allUsers(allUser));
    } catch (err) {
      console.error(err, "Error in All Languages Fetch reducer");
    }
  };

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />

          <Route
            path="/dashboard"
            element={
              <Protected isAuthUser={isAuthUser}>
                <DashboardPage />
              </Protected>
            }
          />

          <Route
            path="/profile"
            element={
              <Protected isAuthUser={isAuthUser}>
                <ProfilePage />
              </Protected>
            }
          />
          <Route
            path="/call/:roomId"
            element={
              <Protected isAuthUser={isAuthUser}>
                <VideoCallPage />
              </Protected>
            }
          />
          <Route
            path="/newrequest"
            element={
              <Protected isAuthUser={isAuthUser}>
                <CreateRequestPage />
              </Protected>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
