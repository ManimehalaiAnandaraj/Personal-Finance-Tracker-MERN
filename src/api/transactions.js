import connectDB from "./db";
import Transaction from "./models/Transaction";
import jwt from "jsonwebtoken";

connectDB();

const verifyToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new Error("No token provided");
  const token = authHeader.split(" ")[1];
  return jwt.verify(token, process.env.JWT_SECRET);
};

export default async function handler(req, res) {
  try {
    const user = verifyToken(req);

    if (req.method === "GET") {
      const transactions = await Transaction.find({ user: user.id }).sort({ date: -1 });
      return res.status(200).json(transactions);
    }

    if (req.method === "POST") {
      const { type, amount, category, description } = req.body;
      const transaction = await Transaction.create({ user: user.id, type, amount, category, description });
      return res.status(201).json(transaction);
    }

    if (req.method === "PUT") {
      const { id, ...rest } = req.body;
      const transaction = await Transaction.findById(id);
      if (!transaction) return res.status(404).json({ message: "Transaction not found" });
      if (transaction.user.toString() !== user.id) return res.status(401).json({ message: "Unauthorized" });

      const updatedTransaction = await Transaction.findByIdAndUpdate(id, rest, { new: true });
      return res.status(200).json(updatedTransaction);
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      const transaction = await Transaction.findById(id);
      if (!transaction) return res.status(404).json({ message: "Transaction not found" });
      if (transaction.user.toString() !== user.id) return res.status(401).json({ message: "Unauthorized" });

      await transaction.remove();
      return res.status(200).json({ message: "Transaction removed" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
