import React, { useState } from "react";
import API from "../services/api";

const TransactionList = ({ transactions, onUpdate }) => {
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({ title: "", amount: "", type: "expense" });

  const handleEdit = (t) => {
    setEditing(t._id);
    setEditData({ title: t.title, amount: t.amount, type: t.type });
  };

  const handleUpdate = async (id) => {
    await API.put(`/transactions/${id}`, editData);
    setEditing(null);
    onUpdate();
  };

  const handleDelete = async (id) => {
    await API.delete(`/transactions/${id}`);
    onUpdate();
  };

  return (
    <div className="space-y-2">
      {transactions.map((t) => (
        <div key={t._id} className="border p-3 flex justify-between items-center rounded">
          {editing === t._id ? (
            <>
              <input
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="border p-1 mr-2"
              />
              <input
                type="number"
                value={editData.amount}
                onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                className="border p-1 mr-2 w-24"
              />
              <select
                value={editData.type}
                onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                className="border p-1 mr-2"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <button
                onClick={() => handleUpdate(t._id)}
                className="bg-green-500 text-white px-2 py-1 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(null)}
                className="bg-gray-400 text-white px-2 py-1 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <div>
                <p className="font-semibold">{t.title}</p>
                <p className="text-sm text-gray-600">
                  ₹{t.amount} ({t.type})
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(t)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
