import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./views/userLogIn/Login";
import Register from "./views/userLogIn/Register";
import Reset from "./views/userLogIn/Reset";
import Dashboard from "./views/Dashboard";
import { ProfilePage } from "./Pages/ProfilePage";
import { DashboardPage } from "./Pages/DashboardPage";
import { useDispatch } from "react-redux";
import { getUserProfile } from "./services/profile";
import {loginProfile} from "./Redux/reducers/user"
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./services/authentication";
import { UserType } from "./Types/UserType";



function App() {

const [isAuthUser, loading] = useAuthState(auth);
  // const navigate = useNavigate();
const dispatch = useDispatch();
  
  console.log("isAuthUser inside app", isAuthUser);
  
  useEffect(() => {
    if (loading) return;
    if(isAuthUser){ fetchProfile()}
  }, [isAuthUser]); //eslint-disable-line
  
  const fetchProfile = async () => {
    try {
      console.log('aquiii')
      const profileFound =  await getUserProfile(isAuthUser as unknown as UserType);
      console.log(profileFound, 'profileFOund')
      dispatch(loginProfile(profileFound));
    
    } catch (err) {
      console.error(err);
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
        </Routes>
      </Router>
  
    </div>
  );
}

export default App;
