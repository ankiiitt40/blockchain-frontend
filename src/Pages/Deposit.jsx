import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import trcImg from "../assets/trc20.jpg";
import bepImg from "../assets/bep20.jpg";

const Deposit = () => {
  const [network, setNetwork] = useState("TRC20");
  const [status, setStatus] = useState("pending");
  const [latestTxn, setLatestTxn] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const navigate = useNavigate();

  const TRC20_ADDRESS = "TWCtpUaW6dzmgi9B2quh3VoxVUmThNLcxR";
  const BEP20_ADDRESS = "0x4d8322883f4bd1f06e246e940efb2cdd5ed708f8";

  // Copy wallet
  const copyAddress = () => {
    const addr = network === "TRC20" ? TRC20_ADDRESS : BEP20_ADDRESS;
    navigator.clipboard.writeText(addr);
    alert("Address copied ✔");
  };

  // Copy hash
  const copyHash = () => {
    navigator.clipboard.writeText(latestTxn.txHash);
    alert("Transaction hash copied ✔");
  };

  // Auto check payment
  useEffect(() => {
    const checkPayment = async () => {
      const wallet =
        network === "TRC20" ? TRC20_ADDRESS.toLowerCase() : BEP20_ADDRESS.toLowerCase();

      const res = await fetch("http://localhost:5000/api/transactions");
      const tx = await res.json();

      const found = tx.find(
        (t) => t.address.toLowerCase() === wallet && t.status === "confirmed"
      );

      if (found) {
        setLatestTxn(found);
        setStatus("confirmed");
        setShowConfetti(true);

        setTimeout(() => setShowConfetti(false), 6000);
      }
    };

    checkPayment();
    const interval = setInterval(checkPayment, 4000);
    return () => clearInterval(interval);
  }, [network]);

  return (
    <div className="p-4 relative">

      {/* 🎉 CONFETTI */}
      {showConfetti && <Confetti numberOfPieces={200} gravity={0.15} />}

      {/* SWITCH NETWORK */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => {
            setStatus("pending");
            setLatestTxn(null);
            setNetwork("TRC20");
          }}
          className={`px-4 py-2 rounded ${
            network === "TRC20" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          TRC20
        </button>

        <button
          onClick={() => {
            setStatus("pending");
            setLatestTxn(null);
            setNetwork("BEP20");
          }}
          className={`px-4 py-2 rounded ${
            network === "BEP20" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          BEP20
        </button>
      </div>

      {/* QR IMAGE */}
      <div className="flex justify-center">
        <img
  src={network === "TRC20" ? trcImg : bepImg}
  alt="QR"
  className="w-60 h-60 object-contain rounded-lg shadow-md border bg-white p-2"
/>

      </div>

      {/* WALLET ADDRESS */}
      <div className="mt-4 p-3 bg-gray-800 text-white rounded-lg">
        <p className="text-sm opacity-60">Wallet Address</p>
        <p className="font-mono break-all">
          {network === "TRC20" ? TRC20_ADDRESS : BEP20_ADDRESS}
        </p>

        <button
          onClick={copyAddress}
          className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          Copy Address
        </button>
      </div>

      {/* 🔥 PAYMENT STATUS */}
      <div className="mt-6 flex justify-center">
        {status === "pending" ? (
          <div className="px-4 py-2 bg-yellow-500 text-white rounded-full animate-pulse font-semibold">
            Waiting for payment...
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center animate-bounce shadow-lg">
              <span className="text-white text-5xl font-bold">✔</span>
            </div>

            <div className="px-4 py-2 bg-green-600 text-white rounded-full font-semibold">
              Payment Confirmed!
            </div>
          </div>
        )}
      </div>

      {/* DETAILS AFTER CONFIRMATION */}
      {status === "confirmed" && latestTxn && (
        <div className="mt-6 p-4 bg-green-800 text-white rounded-lg shadow animate-fade-in">
          <p className="text-lg font-bold mb-3">Payment Details</p>
          <p><b>Amount:</b> {latestTxn.amount} USDT</p>
          <p><b>Network:</b> {latestTxn.network}</p>

          <div className="mt-2">
            <p className="break-all"><b>Hash:</b> {latestTxn.txHash}</p>
            <button
              onClick={copyHash}
              className="mt-2 bg-white text-black px-3 py-1 rounded"
            >
              Copy Hash
            </button>
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-4 w-full bg-blue-500 py-2 rounded text-white font-bold hover:bg-blue-600"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default Deposit;
