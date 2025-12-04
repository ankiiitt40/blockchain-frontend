import React from "react";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-4 py-4 bg-[#1F1F1F] text-white shadow-md">

      {/* Left Menu Icon */}
      <Menu size={26} className="cursor-pointer" />

      {/* Center Text Brand */}
      <div className="flex-1 flex justify-center">
        <h1 className="text-2xl font-bold tracking-wide text-white">
          FUNDMATE
        </h1>
      </div>

      {/* Right Deposit Button */}
      <button
        onClick={() => navigate("/deposit")}
        className="bg-green-600 px-4 py-1.5 text-sm rounded-lg text-white hover:bg-green-700 transition font-semibold"
      >
        Deposit
      </button>
    </div>
  );
};

export default Navbar;

