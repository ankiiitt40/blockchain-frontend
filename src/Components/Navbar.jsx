import React from "react";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-4 py-4 bg-[#2A2A2A] text-white">

      {/* Left Menu Icon */}
      <Menu size={24} />

      {/* Brand Name */}
      <div className="text-xl font-semibold flex items-center gap-2">
        <span className="text-blue-400">B2B Gaming</span>
      </div>

      {/* Deposit Button */}
      <button
        onClick={() => navigate("/deposit")}
        className="bg-green-500 px-3 py-1 text-sm rounded-lg hover:bg-green-600 transition"
      >
        Deposit
      </button>
    </div>
  );
};

export default Navbar;
