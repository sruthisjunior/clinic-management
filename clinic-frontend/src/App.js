import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/MyAppointments";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      {token && <Navbar setToken={setToken} />}
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<Login setToken={setToken} />} />

        {/* Normal Pages */}
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointments" element={<Appointments />} />

        {/* Default route: if not logged in → login */}
        <Route path="*" element={<Navigate to={token ? "/doctors" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
