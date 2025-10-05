import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import ExpenseChart from "./ExpenseChart";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.email}</p>
      <button onClick={logout}>Logout</button>

      <hr />
      <TransactionForm transactions={transactions} setTransactions={setTransactions} />
      <TransactionList transactions={transactions} />
      <ExpenseChart transactions={transactions} />
    </div>
  );
};

export default Dashboard;
