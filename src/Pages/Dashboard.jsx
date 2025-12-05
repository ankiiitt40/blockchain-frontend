import React, { useEffect, useState } from "react";
import StatsCard from "../Components/StatsCard";
import QuickLinkCard from "../Components/QuickLinkCard";
import SectionBox from "../Components/SectionBox";
import { Banknote, Building2, Wallet, Lock, Clock } from "lucide-react";


// BACKEND BASE URL
const API_BASE = "http://localhost:5000/api";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [depositRequests, setDepositRequests] = useState([]);
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [history, setHistory] = useState([]); // ⭐ NEW — Payment History

  // ---------------------------
  // 🟢 AUTO LOAD BALANCE
  // ---------------------------
  useEffect(() => {
    const fetchBalance = () => {
      fetch(`${API_BASE}/balance`)
        .then(res => res.json())
        .then(data => setBalance(data.balance || 0))
        .catch(err => console.log("Balance error:", err));
    };

    fetchBalance();
    const interval = setInterval(fetchBalance, 5000);
    return () => clearInterval(interval);
  }, []);

  // ---------------------------
  // 🟡 DEPOSIT REQUESTS
  // ---------------------------
  useEffect(() => {
    const loadDeposits = () => {
      fetch(`${API_BASE}/deposits`)
        .then(res => res.json())
        .then(data => setDepositRequests(data))
        .catch(err => console.log("Deposit Requests error:", err));
    };

    loadDeposits();
    const interval = setInterval(loadDeposits, 8000);
    return () => clearInterval(interval);
  }, []);

  // ---------------------------
  // 🔵 WITHDRAWAL REQUESTS
  // ---------------------------
  useEffect(() => {
    const loadWithdrawals = () => {
      fetch(`${API_BASE}/withdrawals`)
        .then(res => res.json())
        .then(data => setWithdrawRequests(data))
        .catch(err => console.log("Withdraw Requests error:", err));
    };

    loadWithdrawals();
    const interval = setInterval(loadWithdrawals, 8000);
    return () => clearInterval(interval);
  }, []);

  // ---------------------------
  // 🟣 PAYMENT HISTORY (ALL TRANSACTIONS)
  // ---------------------------
  useEffect(() => {
    const loadHistory = () => {
      fetch(`${API_BASE}/transactions`)
        .then(res => res.json())
        .then(data => setHistory(data))
        .catch(err => console.log("History error:", err));
    };

    loadHistory();
    const interval = setInterval(loadHistory, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 flex flex-col gap-4 mb-20">

      {/* 🟢 Stats Row */}
      <div className="grid grid-cols-2 gap-3">
        <StatsCard 
          icon={<Banknote />} 
          title="Net Balance" 
          value={balance.toFixed(2)} 
        />

        <StatsCard 
          icon={<Building2 />} 
          title="Commission Earned" 
          value="0.00" 
        />

        <StatsCard 
          icon={<Lock />} 
          title="Blocked Deposit" 
          value="0.00" 
        />

        <StatsCard 
          icon={<Clock />} 
          title={`WDR Hold Amount (0)`} 
          value="0" 
        />
      </div>

      {/* 🟡 Quick Links */}
      <div className="flex justify-between text-center py-2">
       <QuickLinkCard 
  label="Bank Accounts" 
  icon={<Building2 className="text-green-400" />}
  onClick={() => (window.location.href = "/banks")}
/>

        <QuickLinkCard 
          label="Deposit Requests" 
          icon={<Wallet className="text-yellow-400" />} 
        />
        <QuickLinkCard 
          label="Withdrawal Requests" 
          icon={<Building2 className="text-blue-400" />} 
        />
        <QuickLinkCard 
          label="Withdraw" 
          icon={<Wallet className="text-pink-400" />} 
        />
      </div>

      {/* 🟣 Summary Boxes */}
      <div className="grid grid-cols-3 gap-4">
        <StatsCard title="Total Banks" value="0" />
        <StatsCard title="Active Banks" value="0" />
        <StatsCard title="Disputed WDR" value="0.00" />
      </div>

      {/* LIVE DATA */}
      <SectionBox title={`Deposit Requests - (${depositRequests.length})`} />
      <SectionBox title={`Withdrawal Requests - (${withdrawRequests.length})`} />


      {/* ⭐ PAYMENT HISTORY SECTION */}
      <div className="mt-4 p-4 bg-gray-900 text-white rounded-lg shadow">
        <h2 className="text-lg font-bold mb-3">
          Payment History ({history.length})
        </h2>

        {history.length === 0 ? (
          <p className="opacity-50">No transactions found.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {history.map((t) => (
              <div
                key={t._id}
                className="p-3 bg-gray-800 rounded-lg border border-gray-700"
              >
                <p><b>Amount:</b> {t.amount} USDT</p>
                <p><b>Network:</b> {t.network}</p>
                <p className="break-all"><b>Hash:</b> {t.txHash}</p>
                <p>
                  <b>Status:</b>{" "}
                  <span
                    className={
                      t.status === "confirmed"
                        ? "text-green-400"
                        : "text-yellow-300"
                    }
                  >
                    {t.status}
                  </span>
                </p>
                <p className="text-sm opacity-50">
                  {new Date(t.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
