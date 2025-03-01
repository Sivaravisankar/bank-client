import axios from "axios";
import { useState, useEffect } from "react";

export default function Deposit() {
  let [user, setUser] = useState(null);
  let [amount, setAmount] = useState(0);

  useEffect(() => {
    axios.get("https://bank-server-obsg.onrender.com/data").then((res) => {
      let lastUser = res.data[res.data.length - 1];
      setUser(lastUser);
    });
  }, []);

  function handleDeposit(e) {
    e.preventDefault();
    if (!user) return;

    let updatedUser = { ...user, amount: user.amount + Number(amount) };
    axios.put(`https://bank-server-obsg.onrender.com/update/${user._id}`, updatedUser).then(() => {
      setUser(updatedUser); 
    });
  }

  return (
    <>
      <h1>Deposit</h1>
      {user && (
        <>
          <form onSubmit={handleDeposit}>
            <input type="number" onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
            <button type="submit">Deposit</button>
          </form>
          <h2>Balance: {user.amount}</h2>
        </>
      )}
    </>
  );
}
