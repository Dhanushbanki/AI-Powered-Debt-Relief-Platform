import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../css/Settlement.css";

function Settlement() {

  const [percentage, setPercentage] = useState(60);

  const loanAmount = 80000;

  const settlementAmount = (loanAmount * percentage) / 100;

  const saving = loanAmount - settlementAmount;

  const strategies = [

`📄 FINANCIAL NEGOTIATION STRATEGY

👤 YOUR FINANCIAL SNAPSHOT

• Monthly Surplus : ₹50,000
• EMI Burden : Low
• Stress Level : LOW

🎯 NEGOTIATION PLAN

• Offer 60% One-Time Settlement.
• Request interest waiver.
• Ask for No Objection Certificate (NOC).
• Obtain written settlement letter.`,

`📄 FINANCIAL NEGOTIATION STRATEGY

👤 YOUR FINANCIAL SNAPSHOT

• Stable Income
• Good repayment history

🎯 NEGOTIATION PLAN

• Request EMI reduction.
• Ask lender for flexible repayment.
• Negotiate processing charge waiver.
• Get confirmation through email.`,

`📄 FINANCIAL NEGOTIATION STRATEGY

👤 YOUR FINANCIAL SNAPSHOT

• High outstanding amount
• Moderate repayment capacity

🎯 NEGOTIATION PLAN

• Request 50% settlement.
• Mention financial hardship.
• Negotiate penalty waiver.
• Collect NOC after payment.`

  ];

  const [strategy, setStrategy] = useState(strategies[0]);

  const regenerateStrategy = () => {

    const random = Math.floor(Math.random() * strategies.length);

    setStrategy(strategies[random]);

  };

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="main-content">

        <div className="header">

          <h1>🎯 Settlement Predictor</h1>

          <p>AI-powered settlement estimates for each of your loans</p>

        </div>

        <div className="settlement-container">

          <div className="loan-card">

            <h3>KISHT</h3>

            <span className="risk">MEDIUM RISK</span>

            <h1>{percentage}%</h1>

            <p>Suggested Settlement</p>

            <h2>₹{settlementAmount.toLocaleString()}</h2>

            <small>Original ₹{loanAmount.toLocaleString()}</small>

            <div className="saving-box">
              💰 Potential Saving ₹{saving.toLocaleString()}
            </div>

          </div>

          <div className="strategy-card">

            <div className="strategy-header">

              <h2>🤖 AI Negotiation Strategy</h2>

              <button
                className="regen-btn"
                onClick={regenerateStrategy}
              >
                Regenerate
              </button>

            </div>

            <pre className="strategy-text">
              {strategy}
            </pre>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Settlement;