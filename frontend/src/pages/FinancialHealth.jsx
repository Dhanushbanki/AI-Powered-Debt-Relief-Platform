import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../css/FinancialHealth.css";

function FinancialHealth() {

  const [income] = useState(75000);
  const [expenses] = useState(25000);
  const [lumpSum] = useState(100000);
  const [emi] = useState(9000);

  const surplus = income - expenses;
  const emiRatio = ((emi / income) * 100).toFixed(0);
  const debtRatio = 18;

  const getTips = () => {
    let tips = [];

    if (surplus < 10000) {
      tips.push("📉 Reduce discretionary spending to increase surplus.");
    }

    if (emiRatio > 30) {
      tips.push("🏦 Contact lenders for EMI restructuring options.");
    }

    if (lumpSum > 50000) {
      tips.push("💰 Use lump sum for highest-interest loan first.");
    }

    if (expenses > income * 0.7) {
      tips.push("📋 Track all expenses to find saving opportunities.");
    }

    if (tips.length === 0) {
      tips.push("🎉 Great! Your financial health is excellent.");
    }

    return tips;
  };

  return (
    <div className="dashboard">

      <Sidebar />

      <div className="main-content">

        {/* Header */}

        <div className="fh-header">

          <h1>💚 Financial Health</h1>

          <p>
            Detailed analysis of your debt stress and repayment capacity
          </p>

        </div>

        {/* Overall Financial Stress */}

        <div className="overall-card">

          <div>

            <h2>Overall Financial Stress</h2>

            <p>
              ✅ Low stress. You're managing debt well.
            </p>

          </div>

          <div className="status-low">
            LOW
          </div>

        </div>
                {/* Top Cards */}

        <div className="health-grid">

          <div className="health-card income">
            <span>MONTHLY INCOME</span>
            <h2>₹{income.toLocaleString()}</h2>
          </div>

          <div className="health-card expense">
            <span>MONTHLY EXPENSES</span>
            <h2>₹{expenses.toLocaleString()}</h2>
          </div>

          <div className="health-card surplus">
            <span>MONTHLY SURPLUS</span>
            <h2>₹{surplus.toLocaleString()}</h2>
          </div>

          <div className="health-card lump">
            <span>LUMP SUM AVAILABLE</span>
            <h2>₹{lumpSum.toLocaleString()}</h2>
          </div>

        </div>

        {/* Ratio Cards */}

        <div className="ratio-grid">

          <div className="ratio-card">

            <div className="ratio-head">
              <span>EMI-to-Income Ratio</span>
              <strong>{emiRatio}%</strong>
            </div>

            <div className="progress">
              <div className="progress-fill emi"></div>
            </div>

            <small>Ideal: Below 30%</small>

          </div>

          <div className="ratio-card">

            <div className="ratio-head">
              <span>Debt-to-Income Ratio</span>
              <strong>{debtRatio}%</strong>
            </div>

            <div className="progress">
              <div className="progress-fill debt"></div>
            </div>

            <small>Ideal: Below 50%</small>

          </div>

        </div>

        <div className="tips-grid">

  <div className="tip">
    📉 Reduce discretionary spending to increase surplus.
  </div>

  <div className="tip">
    🏦 Contact lenders for EMI restructuring options.
  </div>

  <div className="tip">
    💰 Use lump sum for highest-interest loan first.
  </div>

  <div className="tip">
    📋 Track all expenses to find saving opportunities.
  </div>

</div>

        </div>

      </div>


  );
}

export default FinancialHealth;
