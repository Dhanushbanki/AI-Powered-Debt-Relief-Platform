import KnowYourRights from "./pages/KnowYourRights";
import FinancialHealth from "./pages/FinancialHealth";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Settlement from "./pages/Settlement";
import Negotiation from "./pages/Negotiation";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settlement" element={<Settlement />} />
        <Route path="/negotiation" element={<Negotiation />} />
        <Route path="/history" element={<History />} />
        <Route path="/financial-health" element={<FinancialHealth />} />
        <Route path="/rights" element={<KnowYourRights />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;