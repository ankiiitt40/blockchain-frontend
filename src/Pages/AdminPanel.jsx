import React, { useEffect, useState } from "react";

const AdminPanel = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    loadWithdrawals();
  }, []);

  const loadWithdrawals = async () => {
    const res = await fetch("http://localhost:5000/api/withdrawals");
    const data = await res.json();
    setWithdrawals(data);
  };

  const updateStatus = async (id, newStatus) => {
    await fetch(`http://localhost:5000/api/withdrawals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    loadWithdrawals();
  };

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-4">Admin Panel - Withdrawals</h2>

      {withdrawals.map((w) => (
        <div
          key={w._id}
          className="bg-[#333] p-3 rounded mb-3 shadow text-white"
        >
          <p><b>Amount:</b> {w.amount} USDT</p>
          <p><b>Address:</b> {w.address}</p>
          <p><b>Status:</b> {w.status}</p>

          {w.status === "pending" && (
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => updateStatus(w._id, "approved")}
                className="bg-green-600 px-3 py-1 rounded"
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(w._id, "rejected")}
                className="bg-red-600 px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
