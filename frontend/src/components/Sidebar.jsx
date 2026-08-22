import { NavLink, useNavigate } from "react-router-dom";
import "../css/Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    navigate("/");
  };

  return (
    <div className="sidebar">

      <div className="logo">
        <h2>💰 FinRelief AI</h2>
      </div>

      <ul>
        <li>
          <NavLink to="/dashboard">🏠 Dashboard</NavLink>
        </li>

        <NavLink to="/financial-health">
  💚 Financial Health
</NavLink>

        <li>
          <NavLink to="/settlement">🎯 Settlement Predictor</NavLink>
        </li>

        <li>
          <NavLink to="/negotiation">📄 Negotiation Email</NavLink>
        </li>

        <NavLink to="/rights">
  ⚖️ Know Your Rights
</NavLink>

        <li>
          <NavLink to="/history">🕘 History</NavLink>
        </li>
      </ul>

      <button className="logout" onClick={handleLogout}>
        Sign Out
      </button>

    </div>
  );
}

export default Sidebar;