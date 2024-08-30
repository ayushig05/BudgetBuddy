import React from "react";
import { useState, useEffect } from "react";
import useAddTransaction from "../hooks/useAddTransaction";
import useGetTransaction from "../hooks/useGetTransaction";
import useGetUserInfo from "../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { BsCashCoin } from "react-icons/bs";
import { SiCashapp } from "react-icons/si";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiCurrencyLine } from "react-icons/ri";

const Tracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions = [], transactionsTotals } = useGetTransaction();
  const { name, profilePhoto, email } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, income, expenses } = transactionsTotals || {};

  const data = [
    {
      label: "Your Total Balance",
      amount: balance >= 0 ? `$${balance}` : `-$${balance * -1}`,
      icon: <BsCurrencyDollar size={20} />,
    },
    {
      label: "Total Income",
      amount: `$${income}`,
      icon: <BsCashCoin size={20} />,
    },
    {
      label: "Total Expense",
      amount: `$${expenses}`,
      icon: <SiCashapp size={20} />,
    },
  ];

  const ICON_STYLES = [
    "bg-blue-300 text-blue-800",
    "bg-emerald-300 text-emerald-800",
    "bg-rose-300 text-rose-800",
  ];

  useEffect(() => {
    console.log("Fetched Transactions:", transactions);
  }, [transactions]);

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
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-6xl min-h-full bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-violet-700 rounded-xl">
              <RiCurrencyLine className="text-white text-xl w-14 hover:animate-spin" />
            </div>
            <h1 className="text-3xl font-bold text-black">Expense Tracker</h1>
          </div>
          {profilePhoto && (
            <div className="flex justify-center gap-2">
              <img
                src={profilePhoto}
                alt="User"
                className="w-10 md:w-12 h-10 md:h-12 rounded-full object-cover cursor-pointer"
              />
              <div className="block cursor-pointer">
                <p className="text-base font-medium text-black">{name}</p>
                <span className="text-xs text-gray-700">{email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="mt-3 bg-red-500 text-white px-2 py-1 rounded"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 2xl:gap-30 my-5">
          {data.map((item, index) => (
            <div
              key={index + item.label}
              className="w-72 2xl:min-w-60 h-16 flex items-center justify-between gap-5 px-4 py-8 rounded-lg bg-gray-100 border border-gray-100 0"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${ICON_STYLES[index]}`}
                >
                  {item.icon}
                </div>
                <div>
                  <span className="text-gray-600 text-base md:text-base">
                    {item.label}
                  </span>
                  <p className="text-base 2xl:text-2xl font-medium text-black ">
                    {item.amount}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center mb-6"
        >
          <div className="flex w-full mb-4 gap-4">
            <input
              type="text"
              placeholder="Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
              className="w-80 p-2 border rounded"
            />
          </div>
          <div className="flex mb-1">
            <div className="mr-4">
              <input
                type="radio"
                id="expense"
                value="expense"
                checked={transactionType === "expense"}
                onChange={(e) => setTransactionType(e.target.value)}
                className="mr-1 cursor-pointer"
              />
              <label htmlFor="expense" className="cursor-pointer text-sm">
                Expense
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="income"
                value="income"
                checked={transactionType === "income"}
                onChange={(e) => setTransactionType(e.target.value)}
                className="mr-1 cursor-pointer mt-1"
              />
              <label htmlFor="income" className="cursor-pointer text-sm">
                Income
              </label>
            </div>
          </div>
          <button
            className="bg-blue-400 text-white text-base mt-2 px-4 py-1 rounded"
            type="submit"
          >
            Add Transaction
          </button>
        </form>
        <div>
          <h3 className="text-lg font-semibold text-center">Transactions</h3>
          <ul className="mt-2">
            {transactions.length > 0 ? (
              transactions.map((transaction) => {
                const { description, transactionAmount, transactionType, id } =
                  transaction;

                return (
                  <li
                    key={id}
                    className="flex justify-between text-center items-center mb-2"
                  >
                    <h4 className="text-md text-center">{description}</h4>
                    <p>
                      ${transactionAmount}
                      <span
                        style={{
                          color:
                            transactionType === "expense" ? "red" : "green",
                        }}
                      >
                        {transactionType}
                      </span>
                    </p>
                  </li>
                );
              })
            ) : (
              <p className="text-center">No transactions available</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tracker;
