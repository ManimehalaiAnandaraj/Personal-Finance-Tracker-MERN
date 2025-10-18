import React, { useState } from "react";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import Transactions from "./Transactions";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);

  const chartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Total",
        data: [
          transactions.filter((t) => t.type === "income").reduce((a, b) => a + Number(b.amount), 0),
          transactions.filter((t) => t.type === "expense").reduce((a, b) => a + Number(b.amount), 0),
        ],
        backgroundColor: ["#16a34a", "#dc2626"],
      },
    ],
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <DashboardCards transactions={transactions} />
        <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
          <h2>Spending Overview</h2>
          <Bar data={chartData} />
        </div>
        <Transactions onDataChange={setTransactions} />
      </div>
    </div>
  );
};

export default DashboardPage;
