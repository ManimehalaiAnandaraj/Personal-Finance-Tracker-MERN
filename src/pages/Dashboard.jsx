import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Bar } from "react-chartjs-2";
import Navbar from "../components/Navbar";
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

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const { data } = await API.get("/transactions");
      setTransactions(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const chartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Total",
        data: [
          transactions
            .filter((t) => t.type === "income")
            .reduce((a, b) => a + b.amount, 0),
          transactions
            .filter((t) => t.type === "expense")
            .reduce((a, b) => a + b.amount, 0),
        ],
        backgroundColor: ["#16a34a", "#dc2626"],
      },
    ],
  };

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
        <h2>Spending Overview</h2>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
