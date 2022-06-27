import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./views/userLogIn/Login";
import Register from "./views/userLogIn/Register";
import Reset from "./views/userLogIn/Reset";
import Dashboard from "./views/Dashboard";
import { ProfilePage } from "./Pages/ProfilePage";
import { DashboardPage } from "./Pages/DashboardPage";

type Props = {
  setFirstNameInput: React.Dispatch<React.SetStateAction<string>>;
  setLastNameInput: React.Dispatch<React.SetStateAction<string>>;
  setStackInput: React.Dispatch<any>;
  setLanguageInput: React.Dispatch<any>;
  setSocialMediaInput: React.Dispatch<any>;
  setAboutMeInput: React.Dispatch<React.SetStateAction<string>>;
};

function App() {
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
