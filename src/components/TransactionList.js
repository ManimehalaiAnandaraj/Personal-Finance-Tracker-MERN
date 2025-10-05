import React from "react";

const TransactionList = ({ transactions }) => {
  if (!transactions.length) return <p>No transactions yet.</p>;

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Transactions</h2>
      <table border="1" cellPadding="5" cellSpacing="0" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, idx) => (
            <tr key={idx}>
              <td>{t.type}</td>
              <td>{t.category}</td>
              <td>{t.amount}</td>
              <td>{t.description}</td>
              <td>{new Date(t.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
