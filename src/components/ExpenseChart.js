import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ transactions }) => {
  if (!transactions.length) return null;

  const expenseTransactions = transactions.filter(t => t.type === "Expense");
  const categories = [...new Set(expenseTransactions.map(t => t.category))];

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Expenses",
        data: categories.map(cat =>
          expenseTransactions.filter(t => t.category === cat).reduce((sum, t) => sum + t.amount, 0)
        ),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverOffset: 10
      }
    ]
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Expense Chart</h2>
      <Pie data={data} />
    </div>
  );
};

export default ExpenseChart;
