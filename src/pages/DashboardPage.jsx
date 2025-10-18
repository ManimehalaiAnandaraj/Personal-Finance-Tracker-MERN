import React, { useState } from "react";
import Transactions from "./Transactions";
import DashboardCards from "../components/DashboardCards";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);

  const chartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Total",
        data: [
          transactions
            .filter((t) => t.type === "income")
            .reduce((a, b) => a + Number(b.amount), 0),
          transactions
            .filter((t) => t.type === "expense")
            .reduce((a, b) => a + Number(b.amount), 0),
        ],
        backgroundColor: ["#16a34a", "#dc2626"],
      },
    ],
  };

  return (
    <div>
      <DashboardCards transactions={transactions} />
      <Bar data={chartData} />
      <Transactions onDataChange={setTransactions} />
    </div>
  );
};

export default DashboardPage;
