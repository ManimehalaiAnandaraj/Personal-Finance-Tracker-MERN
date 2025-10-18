import React, { useState } from "react";
import API from "../services/api";

const TransactionForm = ({ onAdd }) => {
  const [form, setForm] = useState({ title: "", amount: "", type: "expense" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/transactions", form);
    setForm({ title: "", amount: "", type: "expense" });
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="border p-2 flex-1"
        required
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        className="border p-2 w-32"
        required
      />
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="border p-2"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button className="bg-blue-500 text-white px-4 rounded">Add</button>
    </form>
  );
};

export default TransactionForm;
