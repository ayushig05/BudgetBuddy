import React from "react";
import { useState } from "react";
import useAddTransaction from "../hooks/useAddTransaction";
import useGetTransaction from "../hooks/useGetTransaction";
import useGetUserInfo from "../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

const Tracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions = [], transactionsTotals } = useGetTransaction();
  const { profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, income, expenses } = transactionsTotals;

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount(0);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <h1>Expense Tracker</h1>
            {profilePhoto && (
              <div>
                <img src={profilePhoto} alt="User" />
                <div>
                  <p>John Doe</p>
                  <span>johndoe@gmail.com</span>
                </div>
                <button onClick={handleSignOut}>Sign Out</button>
              </div>
            )}
          </div>
          <div>
            <h3>Your Balance</h3>
            {balance >= 0 ? <h2>${balance}</h2> : <h2>-${balance * -1}</h2>}
          </div>
          <div>
            <div>
              <h4>Income</h4>
              <p>${income}</p>
            </div>
            <div>
              <h4>Expenses</h4>
              <p>${expenses}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
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
            <button className="border border-4" type="submit">Add Transaction</button>
          </form>
        </div>
      </div>

      <div>
        <h3>Transactions</h3>
        <ul>
          {transactions.length > 0 ? (
            transactions.map((transaction) => {
              const { description, transactionAmount, transactionType, id } =
                transaction;

              return (
                <li key={id}>
                  <h4>{description}</h4>
                  <p>
                    ${transactionAmount}
                    <label
                      style={{
                        color: transactionType === "expense" ? "red" : "green",
                      }}
                    >
                      {transactionType}
                    </label>
                  </p>
                </li>
              );
            })
          ) : (
            <p>No transactions available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Tracker;
