import { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await login(username, password);

      console.log("Login API Response:", res.data); // 👈 debug once

      // ✅ handle all possible token formats
      const token =
        res.data.access || res.data.token || res.data.key || null;
      const refresh = res.data.refresh || null;

      if (token) {
        localStorage.setItem("token", token);
        if (refresh) localStorage.setItem("refresh", refresh);
        localStorage.setItem("username", username);

        // ✅ update parent App state
        setToken(token);

        // ✅ redirect to doctors page
        navigate("/doctors");
      } else {
        setError("❌ No token received from server");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError("❌ Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
          url('https://media.istockphoto.com/id/2099357117/vector/heart-pulse-and-heartbeat-heartbeat-lone-cardiogram-beautiful-healthcare-medical-background.jpg?s=612x612&w=0&k=20&c=5agokqkO2Ls-JGCXC5eYl8mH_EO1ZnihZc-pEYtVBOI=')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="card p-4 shadow-lg border-0"
        style={{
          width: "400px",
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(12px)",
          borderRadius: "15px",
        }}
      >
        <h2 className="text-center mb-4 text-white">
          <i className="bi bi-heart-pulse-fill text-danger me-2"></i>
          Login
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-white">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            className="btn w-100 fw-bold"
            type="submit"
            disabled={loading}
            style={{
              background: "linear-gradient(90deg, #007bff, #00c6ff)",
              border: "none",
              color: "white",
              boxShadow: "0 4px 15px rgba(0, 123, 255, 0.5)",
              borderRadius: "8px",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
