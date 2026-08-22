import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../css/Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);

  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [lumpSum, setLumpSum] = useState(50000);

  const [showLoanForm, setShowLoanForm] = useState(false);

  const [loan, setLoan] = useState({
    lenderName: "",
    amount: "",
    interest: "",
    emi: "",
    overdue: ""
  });

  const [loans, setLoans] = useState([]);

  useEffect(() => {

    const user = localStorage.getItem("user_id");

    if (!user) {
      navigate("/");
      return;
    }

    fetchDashboard();
    fetchLoans();

  }, []);

  const fetchDashboard = async () => {

    try {

      const user_id = localStorage.getItem("user_id");

      const response = await axios.get(

        "http://127.0.0.1:8000/dashboard-data",

        {
          params: {
            user_id
          }
        }

      );

      setIncome(response.data.monthly_income);
      setExpenses(response.data.monthly_expenses);

    }

    catch (err) {

      console.log(err);

    }

  };

  const fetchLoans = async () => {

    try {

      const response = await axios.get(

        "http://127.0.0.1:8000/loans"

      );

      setLoans(response.data);

    }

    catch (err) {

      console.log(err);

    }

  };

  const handleSaveProfile = async () => {

    try {

      const user_id = localStorage.getItem("user_id");

      await axios.put(

        "http://127.0.0.1:8000/update-profile",

        {

          name: "User",

          email: "user@gmail.com",

          password: "123456",

          monthly_income: Number(income),

          monthly_expenses: Number(expenses)

        },

        {

          params: {
            user_id
          }

        }

      );

      alert("Profile Updated");

      setEditMode(false);

      fetchDashboard();

    }

    catch (err) {

      console.log(err);

      alert("Update Failed");

    }

  };

  const handleChange = (e) => {

    setLoan({

      ...loan,

      [e.target.name]: e.target.value

    });

  };
    const addLoan = async () => {

    if (
      loan.lenderName === "" ||
      loan.amount === "" ||
      loan.interest === "" ||
      loan.emi === "" ||
      loan.overdue === ""
    ) {
      alert("Fill all fields");
      return;
    }

    try {

      const user_id = localStorage.getItem("user_id");

      await axios.post(

        "http://127.0.0.1:8000/add-loan",

        {

          lender_name: loan.lenderName,
          outstanding_amount: Number(loan.amount),
          interest_rate: Number(loan.interest),
          overdue_months: Number(loan.overdue),
          emi: Number(loan.emi)

        },

        {

          params: {
            user_id
          }

        }

      );

      alert("Loan Added Successfully");

      setLoan({

        lenderName: "",
        amount: "",
        interest: "",
        emi: "",
        overdue: ""

      });

      setShowLoanForm(false);

      fetchLoans();

    }

    catch (err) {

      console.log(err);

      alert("Failed To Add Loan");

    }

  };

  const deleteLoan = async (loanId) => {

    try {

      await axios.delete(

        `http://127.0.0.1:8000/delete-loan/${loanId}`

      );

      fetchLoans();

    }

    catch (err) {

      console.log(err);

    }

  };

  const monthlySurplus = income - expenses;

  const totalOutstanding = loans.reduce(

    (sum, loan) => sum + Number(loan.outstanding_amount || 0),

    0

  );

  const totalEMI = loans.reduce(

    (sum, loan) => sum + Number(loan.emi || 0),

    0

  );

  const debtRatio =

    income > 0

      ? ((totalEMI / income) * 100).toFixed(1)

      : 0;
        return (

    <div className="dashboard">

      <Sidebar />

      <div className="main-content">

        <div className="header">
          <h1>Dashboard Overview</h1>
          <p>Your financial snapshot at a glance</p>
        </div>

        <div className="cards">

          <div className="card card1">
            <h5>MONTHLY SURPLUS</h5>
            <h2>₹{monthlySurplus.toLocaleString()}</h2>
            <p>After all expenses</p>
          </div>

          <div className="card card2">
            <h5>TOTAL OUTSTANDING</h5>
            <h2>₹{totalOutstanding.toLocaleString()}</h2>
            <p>{loans.length} Active Loan(s)</p>
          </div>

          <div className="card card3">
            <h5>TOTAL EMI</h5>
            <h2>₹{totalEMI.toLocaleString()}</h2>
            <p>{debtRatio}% of income</p>
          </div>

          <div className="card card4">
            <h5>DEBT TO INCOME</h5>
            <h2>{debtRatio}%</h2>
            <p>Healthy Ratio</p>
          </div>

          <div className="card card5">
            <h5>STRESS LEVEL</h5>
            <h2 className="green">
              {debtRatio < 30 ? "LOW" : debtRatio < 50 ? "MEDIUM" : "HIGH"}
            </h2>
            <p>Financial stress index</p>
          </div>

        </div>

        <div className="profile-card">

          <div className="profile-header">

            <div>

              <h3>Financial Profile</h3>

              <p>Your income and expense baseline</p>

            </div>

            {

              !editMode ?

              <button
                className="edit-btn"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>

              :

              <button
                className="edit-btn"
                onClick={handleSaveProfile}
              >
                Save
              </button>

            }

          </div>

          <div className="profile-grid">

            <div>

              <label>Monthly Income</label>

              {

                editMode ?

                <input
                  type="number"
                  value={income}
                  onChange={(e)=>setIncome(e.target.value)}
                />

                :

                <h4>₹{income}</h4>

              }

            </div>

            <div>

              <label>Monthly Expenses</label>

              {

                editMode ?

                <input
                  type="number"
                  value={expenses}
                  onChange={(e)=>setExpenses(e.target.value)}
                />

                :

                <h4>₹{expenses}</h4>

              }

            </div>

            <div>

              <label>Lump Sum Available</label>

              {

                editMode ?

                <input
                  type="number"
                  value={lumpSum}
                  onChange={(e)=>setLumpSum(e.target.value)}
                />

                :

                <h4>₹{lumpSum}</h4>

              }

            </div>

          </div>

        </div>

        <div className="loan-section">

          <div className="loan-header">

            <div>

              <h2>Active Loans</h2>

              <p>Manage your current debts</p>

            </div>

            <button
              className="edit-btn"
              onClick={()=>setShowLoanForm(true)}
            >
              + Add Loan
            </button>

          </div>

          {showLoanForm && (

            <div className="loan-form">

              <input
                name="lenderName"
                placeholder="Lender Name"
                value={loan.lenderName}
                onChange={handleChange}
              />

              <input
                name="amount"
                placeholder="Outstanding Amount"
                value={loan.amount}
                onChange={handleChange}
              />

              <input
                name="interest"
                placeholder="Interest Rate"
                value={loan.interest}
                onChange={handleChange}
              />

              <input
                name="emi"
                placeholder="Monthly EMI"
                value={loan.emi}
                onChange={handleChange}
              />

              <input
                name="overdue"
                placeholder="Overdue Months"
                value={loan.overdue}
                onChange={handleChange}
              />

              <button
                className="edit-btn"
                onClick={addLoan}
              >
                Save Loan
              </button>

            </div>

          )}

          <table>

            <thead>

              <tr>

                <th>Lender</th>

                <th>Outstanding</th>

                <th>Interest</th>

                <th>EMI</th>

                <th>Overdue</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {

                loans.map((item)=>(

                  <tr key={item.id}>

                    <td>{item.lender_name}</td>

                    <td>₹{item.outstanding_amount}</td>

                    <td>{item.interest_rate}%</td>

                    <td>₹{item.emi}</td>

                    <td>{item.overdue_months}</td>

                    <td>

                      <button
                        className="delete-btn"
                        onClick={()=>deleteLoan(item.id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;