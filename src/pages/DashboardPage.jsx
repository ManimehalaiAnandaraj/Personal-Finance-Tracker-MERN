// src/pages/DashboardPage.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import Transactions from "./Transactions";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);

  // Update transactions state when Transactions component changes
  const handleDataChange = (data) => {
    setTransactions(data);
  };

  // Prepare chart data
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
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        {/* Cards */}
        <DashboardCards transactions={transactions} />

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-bold mb-2">Spending Overview</h2>
          <Bar data={chartData} />
        </div>

        {/* Transactions Table */}
        <Transactions onDataChange={handleDataChange} />
      </div>
    </div>
  );
};

export default DashboardPage;
