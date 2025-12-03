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

  // -------------------------------------
  // 🟢 AUTO LOAD BALANCE EVERY 5 SECONDS
  // -------------------------------------
  useEffect(() => {
    const fetchBalance = () => {
      fetch(`${API_BASE}/balance`)
        .then(res => res.json())
        .then(data => setBalance(data.balance || 0))
        .catch(err => console.log("Balance error:", err));
    };

    fetchBalance();                // initial load
    const interval = setInterval(fetchBalance, 5000); // auto refresh

    return () => clearInterval(interval);
  }, []);

  // ------------------------------------------
  // 🟡 FETCH DEPOSIT REQUESTS
  // ------------------------------------------
  useEffect(() => {
    const loadDeposits = () => {
      fetch(`${API_BASE}/deposits`)
        .then(res => res.json())
        .then(data => setDepositRequests(data))
        .catch(err => console.log("Deposit Requests error:", err));
    };

    loadDeposits();
    const interval = setInterval(loadDeposits, 8000); // refresh every 8 sec
    
    return () => clearInterval(interval);
  }, []);

  // ------------------------------------------
  // 🔵 FETCH WITHDRAWAL REQUESTS
  // ------------------------------------------
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

      {/* 🔥 LIVE DATA FROM BACKEND */}
      <SectionBox title={`Deposit Requests - (${depositRequests.length})`} />
      <SectionBox title={`Withdrawal Requests - (${withdrawRequests.length})`} />
      
    </div>
  );
};

export default Dashboard;
