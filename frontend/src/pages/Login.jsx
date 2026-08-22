import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        {
          email,
          password,
        }
      );

      alert(response.data.message);

      if (response.data.user_id) {
        localStorage.setItem("user_id", response.data.user_id);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        console.log(error.response.data);
        alert(JSON.stringify(error.response.data));
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="logo">
        <div className="logo-box">📱</div>
        <h2>FinRelief AI</h2>
      </div>

      <div className="left">
        <h1>
          Take Control of Your <span>Financial Future</span>
        </h1>

        <p>
          AI-powered debt management that helps you organize, analyze,
          settle loans and build debt-free success.
        </p>

        <div className="cards">
          <div className="card">
            <h3>40-75%</h3>
            <p>Settlement Range</p>
          </div>

          <div className="card">
            <h3>AI</h3>
            <p>Powered Strategy</p>
          </div>

          <div className="card">
            <h3>Free</h3>
            <p>To Get Started</p>
          </div>
        </div>
      </div>

      <div className="right">
        <h2>Welcome back</h2>
        <p>Sign in to your dashboard</p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Sign In</button>

        <p className="register-text">
          Don't have an account? <a href="#">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;