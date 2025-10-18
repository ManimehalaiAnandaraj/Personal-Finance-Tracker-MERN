import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ type: "income", amount: "", category: "", description: "" });
  const [editId, setEditId] = useState(null);

  const fetchTransactions = async () => {
    const { data } = await API.get("/transactions");
    setTransactions(data);
  };

  useEffect(() => { fetchTransactions(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/transactions/${editId}`, form);
      setEditId(null);
    } else {
      await API.post("/transactions", form);
    }
    setForm({ type: "income", amount: "", category: "", description: "" });
    fetchTransactions();
  };

  const handleDelete = async (id) => {
    await API.delete(`/transactions/${id}`);
    fetchTransactions();
  };

  const handleEdit = (transaction) => {
  setEditId(transaction._id || transaction.id);
  setForm({
    type: transaction.type,
    amount: transaction.amount,
    category: transaction.category,
    description: transaction.description || "",
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
};


  const exportCSV = () => {
    let csv = "Type,Amount,Category,Description,Date\n";
    transactions.forEach((t) => {
      csv += `${t.type},${t.amount},${t.category},${t.description},${new Date(t.date).toLocaleDateString()}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
  };

  return (
    <div>
      <Navbar />
      <div className="transactions-container">
        <h2>{editId ? "Edit Transaction" : "Add Transaction"}</h2>
        <form onSubmit={handleSubmit}>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            required
          />
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
          />
          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          <button type="submit">{editId ? "Update" : "Add"}</button>
        </form>
        <button onClick={exportCSV}>Export CSV</button>

        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
  <tr key={t._id || t.id}>
    <td>{t.type}</td>
    <td>{t.amount}</td>
    <td>{t.category}</td>
    <td>{t.description}</td>
    <td>{new Date(t.date).toLocaleDateString()}</td>
    <td>
      <button className="edit-btn" onClick={() => handleEdit(t)}>Edit</button>
      <button className="delete-btn" onClick={() => handleDelete(t._id || t.id)}>Delete</button>
    </td>
  </tr>
))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
