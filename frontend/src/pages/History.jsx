import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../css/History.css";

function History() {

const [history,setHistory]=useState([

{

id:1,

type:"Settlement",

lender:"KISHT",

amount:"₹48,000",

date:"09 Jul 2026",

status:"Completed"

},

{

id:2,

type:"Negotiation Letter",

lender:"HDFC Bank",

amount:"₹90,000",

date:"08 Jul 2026",

status:"Generated"

},

{

id:3,

type:"Settlement",

lender:"ICICI Bank",

amount:"₹35,000",

date:"07 Jul 2026",

status:"Pending"

}

]);

const deleteHistory=(id)=>{

setHistory(

history.filter(item=>item.id!==id)

);

};

return(

<div className="dashboard">

<Sidebar/>

<div className="main-content">

<div className="header">

<h1>🕘 History</h1>

<p>

View all generated settlements and negotiation letters

</p>

</div>

<div className="history-card">

<h2>Activity History</h2>

<table className="history-table">

<thead>

<tr>

<th>ID</th>

<th>Type</th>

<th>Lender</th>

<th>Amount</th>

<th>Date</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>

<tbody>
          {

            history.length > 0 ? (

              history.map((item) => (

                <tr key={item.id}>

                  <td>{item.id}</td>

                  <td>{item.type}</td>

                  <td>{item.lender}</td>

                  <td>{item.amount}</td>

                  <td>{item.date}</td>

                  <td>

                    <span
                      className={
                        item.status === "Completed"
                          ? "status completed"
                          : item.status === "Generated"
                          ? "status generated"
                          : "status pending"
                      }
                    >
                      {item.status}
                    </span>

                  </td>

                  <td>

                    <button
                      className="delete-btn"
                      onClick={() => deleteHistory(item.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="7"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                    color: "#94a3b8"
                  }}
                >
                  No History Available
                </td>

              </tr>

            )

          }

        </tbody>

      </table>

    </div>

  </div>

</div>

);

}

export default History;