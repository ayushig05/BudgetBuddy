import { useEffect, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config";
import useGetUserInfo from "./useGetUserInfo";

const useGetTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionsTotals, setTransactionsTotals] = useState({
    balance: 0.0,
    income: 0.0,
    expenses: 0.0,
  });

  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  const getTransactions = async () => {
    let unsubscribe;
    try {
      if (!userID) {
        console.error("userID is not defined");
        return;
      }
      const queryTransactions = query(
        transactionCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );

      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpense = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          docs.push({ ...data, id });

          if(data.transactionType === "expense") {
            totalExpense += Number(data.transactionAmount);
          } else {
            totalIncome += Number(data.transactionAmount);
          }
        });
        console.log("Fetched Transactions:", docs);
        setTransactions(docs);
        let balance = totalIncome - totalExpense;
        setTransactionsTotals({balance,
          expenses: totalExpense,
          income: totalIncome
        })
      });
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
    return () => unsubscribe();
  };

  useEffect(() => {
    if (userID) {
      getTransactions();
    }
  }, [userID]); 

  return { transactions, transactionsTotals }; 
};

export default useGetTransaction;
