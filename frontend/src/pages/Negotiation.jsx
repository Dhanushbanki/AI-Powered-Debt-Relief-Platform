import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../css/Negotiation.css";

function Negotiation() {

  const loans = [
    {
      lender: "KISHT",
      amount: 80000,
      emi: 9000,
      overdue: 3,
      settlement: 48000
    },
    {
      lender: "HDFC Bank",
      amount: 150000,
      emi: 12000,
      overdue: 2,
      settlement: 90000
    }
  ];

  const [selectedLoan, setSelectedLoan] = useState(loans[0]);

  const [letter, setLetter] = useState("");

  const generateLetter = () => {

    const text = `Subject: Request for One-Time Settlement – Loan Account

To,
The Settlement Department,
${selectedLoan.lender}

Dear Sir/Madam,

I am writing to formally request a One-Time Settlement (OTS) for my outstanding loan account.

ACCOUNT DETAILS:

Lender : ${selectedLoan.lender}

Outstanding Amount : ₹${selectedLoan.amount.toLocaleString()}

Monthly EMI : ₹${selectedLoan.emi.toLocaleString()}

Overdue Period : ${selectedLoan.overdue} months

FINANCIAL SITUATION:

Due to genuine financial hardship, I am unable to continue servicing my loan as per the original schedule.

SETTLEMENT PROPOSAL:

I respectfully propose a One-Time Settlement of ₹${selectedLoan.settlement.toLocaleString()}.

I request a written settlement confirmation and No Objection Certificate (NOC) after payment.

Thank you for your consideration.

Yours faithfully,

[Your Name]

[Contact Number]

[Date]`;

    setLetter(text);

  };

  const copyLetter = () => {

    navigator.clipboard.writeText(letter);

    alert("Letter copied successfully.");

  };

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="main-content">

        <div className="header">

          <h1>📄 Negotiation Email Generator</h1>

          <p>
            AI-crafted professional letters to send to your lenders
          </p>

        </div>

        <div className="generate-card">

          <h3>Generate a Negotiation Letter</h3>

          <p>
            Select a loan and we'll write a professional settlement request.
          </p>

          <label>Select Loan</label>

          <div className="generate-row">

            <select

              value={selectedLoan.lender}

              onChange={(e) => {

                const loan = loans.find(
                  item => item.lender === e.target.value
                );

                setSelectedLoan(loan);

              }}

            >

              {loans.map((loan, index) => (

                <option
                  key={index}
                  value={loan.lender}
                >

                  {loan.lender} — ₹{loan.amount.toLocaleString()}

                </option>

              ))}

            </select>

            <button
              className="generate-btn"
              onClick={generateLetter}
            >
              📄 Generate Letter
            </button>

          </div>
                  </div>

        {/* Generated Letter */}

        <div className="letter-card">

          <div className="letter-header">

            <h3>📄 Generated Letter</h3>

            <button
              className="copy-btn"
              onClick={copyLetter}
            >
              📋 Copy
            </button>

          </div>

          <textarea

            className="letter-box"

            value={letter}

            readOnly

            placeholder="Click 'Generate Letter' to generate a professional settlement request."

          />

        </div>

      </div>

    </div>

  );

}

export default Negotiation;