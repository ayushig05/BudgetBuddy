import React from "react";
import { useState } from "react";
import useAddTransaction from "../hooks/useAddTransaction";

const Tracker = () => {
  const { addTransaction } = useAddTransaction();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
  };

  return (
    <>
      <div>
        <div>
          <h1>Expense Tracker</h1>
          <div>
            <h3>Your Balance</h3>
            <h2>$0.00</h2>
          </div>
          <div>
            <div>
              <h4>Income</h4>
              <p>$0.00</p>
            </div>
            <div>
              <h4>Expenses</h4>
              <p>$0.00</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Description"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense">Expense</label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income">Income</label>
            <button type="submit">Add Transaction</button>
          </form>
        </div>
      </div>

      <div>
        <h3>Transactions</h3>
      </div>
    </>
  );
};

export default Tracker;
