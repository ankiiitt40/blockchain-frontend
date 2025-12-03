import React, { useState } from "react";

const Withdrawal = () => {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [msg, setMsg] = useState("");

  const submitForm = async () => {
    const body = { amount, address, status: "pending" };

    const res = await fetch("http://localhost:5000/api/withdrawals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setMsg("Withdrawal request sent!");
      setAmount("");
      setAddress("");
    }
  };

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-4">Withdraw Funds</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="w-full p-2 rounded bg-gray-800 mb-3"
      />

      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Your Wallet Address"
        className="w-full p-2 rounded bg-gray-800 mb-3"
      />

      <button
        onClick={submitForm}
        className="w-full bg-blue-600 py-2 rounded font-bold"
      >
        Submit Withdraw Request
      </button>

      {msg && <p className="mt-4 text-green-400">{msg}</p>}
    </div>
  );
};

export default Withdrawal;
