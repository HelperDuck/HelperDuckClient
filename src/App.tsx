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
import { getUserProfile, getAllUsers, createUser } from "./services/profile";
import { getAllHelpRequests } from "./services/request";
import { CreateRequestPage } from "./Pages/CreateRequestPage";
import LoginPage from "./Pages/LoginPage";
import Protected from "./ProtectRoutes";
import NotFound from "./Pages/NotFound";
import PaymentPage from "./Pages/PaymentPage";
import PaymentSuccessful from "./components/PaymentSuccessful";
import DetailsModal from "./components/DetailsModal";
import { CreateReviewPage } from "./Pages/CreateReviewPage";

function App() {
  const [isAuthUser, loading] = useAuthState(auth);
  const dispatch = useDispatch();

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
      let profileFound = await getUserProfile(isAuthUser as unknown as any);

      if (profileFound) dispatch(loginProfile(profileFound));

      //Create a new profile if one does not exist
      if (!profileFound) {
        let newUser = await createUser(isAuthUser as unknown as any);
        console.log("newUser", newUser);
        dispatch(loginProfile(newUser as unknown as any));
      }
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
      dispatch(helpRequests(allHelpRequests));
    } catch (err) {
      console.error(err, "Error in All Languages Fetch reducer");
    }
  };

  const fetchAllUsers = async () => {
    try {
      const allUser = await getAllUsers();
      dispatch(allUsers(allUser));
    } catch (err) {
      console.error(err, "Error in All Languages Fetch reducer");
    }
  };

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/review" element={<CreateReviewPage />} />
          <Route path="/modal" element={<DetailsModal />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />

          <Route
            path="/dashboard"
            element={
              <Protected isAuthUser={isAuthUser} loading={loading}>
                <DashboardPage />
              </Protected>
            }
          />

          <Route
            path="/profile"
            element={
              <Protected isAuthUser={isAuthUser} loading={loading}>
                <ProfilePage />
              </Protected>
            }
          />
          <Route path="/call/:roomId" element={<VideoCallPage />} />
          <Route
            path="/newrequest"
            element={
              <Protected isAuthUser={isAuthUser} loading={loading}>
                <CreateRequestPage />
              </Protected>
            }
          />
          <Route
            path="/profile/:uid"
            element={
              <Protected isAuthUser={isAuthUser} loading={loading}>
                <ProfilePage />
              </Protected>
            }
          />
          <Route
            path="/payment"
            element={
              <Protected isAuthUser={isAuthUser} loading={loading}>
                <PaymentPage />
              </Protected>
            }
          />
          <Route
            path="/payment/ok"
            element={
              <Protected isAuthUser={isAuthUser} loading={loading}>
                <PaymentSuccessful />
              </Protected>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
