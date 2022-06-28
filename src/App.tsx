import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./views/userLogIn/Login";
import Register from "./views/userLogIn/Register";
import Reset from "./views/userLogIn/Reset";
import Dashboard from "./views/Dashboard";
import { ProfilePage } from "./Pages/ProfilePage";
import { DashboardPage } from "./Pages/DashboardPage";
import { useDispatch } from "react-redux";
import { getAllUsers, getUserProfile } from "./services/profile";
import { loginProfile } from "./Redux/reducers/user";
import { allUsers } from "./Redux/reducers/AllUsers";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./services/authentication";
import { UserType } from "./Types/UserType";
import { helpRequests } from "./Redux/reducers/helpRequest";
import { allLanguages } from "./Redux/reducers/languages";
import { getAllLanguages, getAllTechnologies } from "./services/languages";
import { Technologies } from "./Redux/reducers/technologies";
import { getAllHelpRequests } from "./services/request";
import { CreateRequestPage } from "./Pages/CreateRequestPage";

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
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* the dashboard above should be another name */}
          <Route path="/dashboard2" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/newrequest" element={<CreateRequestPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
