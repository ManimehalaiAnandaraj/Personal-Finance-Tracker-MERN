import React, { useState } from "react";

const TransactionForm = ({ transactions, setTransactions }) => {
  const [type, setType] = useState("Income");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = { type, category, amount: parseFloat(amount), description, date: new Date() };
    setTransactions([newTransaction, ...transactions]);
    // Reset form
    setType("Income");
    setCategory("");
    setAmount("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "20px 0" }}>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
