import React from "react";

function DashboardCards({ transactions }) {
  const totalIncome = transactions.filter(tx => tx.type === "income").reduce((a, b) => a + Number(b.amount), 0);
  const totalExpense = transactions.filter(tx => tx.type === "expense").reduce((a, b) => a + Number(b.amount), 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-green-200 p-4 rounded shadow text-center">
        <h4 className="font-bold">Income</h4>
        <p className="text-xl font-semibold">₹{totalIncome}</p>
      </div>
      <div className="bg-red-200 p-4 rounded shadow text-center">
        <h4 className="font-bold">Expense</h4>
        <p className="text-xl font-semibold">₹{totalExpense}</p>
      </div>
      <div className="bg-blue-200 p-4 rounded shadow text-center">
        <h4 className="font-bold">Balance</h4>
        <p className="text-xl font-semibold">₹{balance}</p>
      </div>
    </div>
  );
}

export default DashboardCards;
