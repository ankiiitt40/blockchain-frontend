import React, { useEffect, useState } from "react";

const Transactions = () => {
  const [txns, setTxns] = useState([]);

  useEffect(() => {
    const fetchTxns = async () => {
      const res = await fetch("http://localhost:5000/api/transactions");
      const data = await res.json();
      setTxns(data);
    };

    fetchTxns();
    const interval = setInterval(fetchTxns, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Payment History</h2>

      {txns.length === 0 ? (
        <p className="text-center text-gray-500">No transactions yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {txns.map((t) => (
            <div
              key={t.txHash}
              className="p-3 bg-[#333] text-white rounded-lg shadow flex flex-col"
            >
              <div className="flex justify-between">
                <span className="font-bold">{t.network}</span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    t.status === "confirmed"
                      ? "bg-green-600"
                      : "bg-yellow-600"
                  }`}
                >
                  {t.status}
                </span>
              </div>

              <p className="mt-1 text-sm">Amount: {t.amount} USDT</p>
              <p className="mt-1 text-xs break-all text-gray-300">
                Hash: {t.txHash}
              </p>

              <p className="text-xs opacity-60 mt-1">
                {new Date(t.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transactions;
