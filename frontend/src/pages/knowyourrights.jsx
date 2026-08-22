
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../css/KnowYourRights.css";

function KnowYourRights() {

  const rights = [

    {
      title: "No Harassment",
      icon: "🚫",
      color: "#ef4444",
      description:
        "Recovery agents cannot call you before 7 AM or after 7 PM. Threats, abuse, or force are illegal under RBI guidelines.",

      details:
        "Banks and recovery agents must treat borrowers respectfully. Physical threats, abusive language, intimidation, and harassment are prohibited."
    },

    {
      title: "Right to Statement",
      icon: "📄",
      color: "#3b82f6",
      description:
        "You have the right to receive a full and detailed loan account statement at any time.",

      details:
        "Banks must provide loan statements, repayment schedules, outstanding balance, and interest details whenever requested."
    },

    {
      title: "Settlement Negotiation",
      icon: "🤝",
      color: "#10b981",
      description:
        "You can negotiate a one-time settlement with your lender.",

      details:
        "Banks may accept partial payments under a One-Time Settlement (OTS) if both parties agree."
    },

    {
      title: "Advance Notice Required",
      icon: "🔔",
      color: "#f59e0b",
      description:
        "Lenders must give notice before classifying your account as NPA.",

      details:
        "Borrowers must receive advance communication before legal recovery actions begin."
    },

    {
      title: "Grievance Redressal",
      icon: "⚖️",
      color: "#8b5cf6",
      description:
        "You can approach the RBI Banking Ombudsman if complaints remain unresolved.",

      details:
        "If the bank fails to resolve your complaint within 30 days, you may file an RBI complaint."
    },

    {
      title: "NOC After Settlement",
      icon: "📜",
      color: "#14b8a6",
      description:
        "After settlement, collect a No Objection Certificate (NOC).",

      details:
        "Never close a settlement without obtaining a written NOC from the lender."
    },

    {
      title: "Property Protection",
      icon: "🏠",
      color: "#2563eb",
      description:
        "Banks cannot seize property without following SARFAESI Act procedures.",

      details:
        "Property seizure requires proper legal notice and due process."
    },

    {
      title: "Privacy Rights",
      icon: "🔒",
      color: "#ec4899",
      description:
        "Recovery agents cannot contact your relatives unnecessarily.",

      details:
        "Your personal information must remain confidential during recovery."
    }

  ];

  const [selectedRight, setSelectedRight] = useState(null);

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="main-content">

        <div className="header">

          <h1>⚖️ Know Your Rights</h1>

          <p>
            RBI guidelines and legal protections for Indian borrowers
          </p>

        </div>

        {/* Overall Card */}

        <div className="rights-banner">

          <h2>💪 You Have Rights as a Borrower</h2>

          <p>

            Under RBI Fair Practices Code and the SARFAESI Act,
            lenders and recovery agents must follow strict rules.

            Knowing these rights protects you from illegal
            harassment and helps you negotiate from a
            position of strength.

          </p>

        </div>
                {/* Rights Cards */}

        <div className="rights-grid">

          {

            rights.map((item, index) => (

              <div

                key={index}

                className="right-card"

                style={{

                  borderColor: item.color

                }}

                onClick={() => setSelectedRight(item)}

              >

                <div
                  className="right-icon"
                  style={{
                    background: item.color
                  }}
                >
                  {item.icon}
                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

              </div>

            ))

          }

        </div>

        {/* What To Do If Harassed */}

        <div className="steps-card">

          <h2>🛡 What To Do If Harassed</h2>

          <p>Step-by-step protection guide</p>

          <div className="steps-grid">

            <div className="step-box">

              <h1>01</h1>

              <h3>Document Everything</h3>

              <p>

                Keep records of all calls, letters,
                messages and communications.

              </p>

            </div>

            <div className="step-box">

              <h1>02</h1>

              <h3>Request Written Settlement</h3>

              <p>

                Never make payment without getting
                a written settlement offer.

              </p>

            </div>

            <div className="step-box">

              <h1>03</h1>

              <h3>File a Complaint</h3>

              <p>

                If harassment continues,
                complain to the RBI Ombudsman.

              </p>

            </div>

            <div className="step-box">

              <h1>04</h1>

              <h3>Seek Legal Help</h3>

              <p>

                Consult a lawyer for
                serious recovery issues.

              </p>

            </div>

          </div>

        </div>
                {/* RBI Ombudsman */}

        <div className="ombudsman-card">

          <h2>🏛 RBI Banking Ombudsman</h2>

          <p>

            If your bank does not resolve your complaint within
            30 days, you can file a complaint through the
            RBI Integrated Ombudsman Scheme.

          </p>

          <button
            className="complaint-btn"
            onClick={() =>
              window.open(
                "https://cms.rbi.org.in",
                "_blank"
              )
            }
          >
            📤 File Complaint
          </button>

        </div>

      </div>

      {/* Rights Details Popup */}

      {selectedRight && (

        <div
          className="modal-overlay"
          onClick={() => setSelectedRight(null)}
        >

          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >

            <h2>{selectedRight.icon} {selectedRight.title}</h2>

            <p>

              {selectedRight.details}

            </p>

            <button
              className="close-btn"
              onClick={() => setSelectedRight(null)}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default KnowYourRights;