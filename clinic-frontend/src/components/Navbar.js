import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ setToken }) {
  const navigate = useNavigate();
  const username = localStorage.getItem("username"); // ✅ get username

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");

    // Reset token in App state
    setToken(null);

    // ✅ Redirect to login
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/doctors">
          🏥 Appointment System
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/doctors">
                Doctors
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/appointments">
                My Appointments
              </Link>
            </li>
            <li className="nav-item d-flex align-items-center ms-3 text-white">
              👋 Welcome, <strong className="ms-1">{username}</strong>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger ms-3" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
