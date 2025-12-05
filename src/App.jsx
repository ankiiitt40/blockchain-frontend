import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Dashboard from "./Pages/Dashboard";
import Deposit from "./Pages/Deposit";
import Transactions from "./Pages/Transaction";
import Withdrawal from "./Pages/Withdrawal";
import AdminPanel from "./Pages/AdminPanel";
import FloatingButtons from "./Components/FloatingButtons";
import Bank from "./pages/Bank";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* Home / Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Deposit Page */}
        <Route path="/deposit" element={<Deposit />} />

        {/* Payment History Page */}
        <Route path="/transactions" element={<Transactions />} />

        {/* Withdrawal Page */}
        <Route path="/withdraw" element={<Withdrawal />} />

         <Route path="/banks" element={<Bank />} />

        {/* Admin Panel */}
        <Route path="/admin" element={<AdminPanel />} />

      </Routes>

      <FloatingButtons />
    </BrowserRouter>
  );
}

export default App;
