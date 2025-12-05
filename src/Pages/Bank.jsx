import React, { useState, useEffect } from "react";
import { addBank, getBanks } from "../api/bankApi";
import emailjs from "@emailjs/browser";


const Bank = () => {
  const [banks, setBanks] = useState([]);

  const [form, setForm] = useState({
    name: "",
    accountNumber: "",
    ifsc: "",
    upi: "",
    email: ""
  });

  useEffect(() => {
    loadBanks();
  }, []);

  const loadBanks = async () => {
    const data = await getBanks();
    setBanks(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1️⃣ DB Save
    const res = await addBank(form);

    if (res.success) {
      // 2️⃣ FRONTEND → EmailJS se email send
      emailjs.send(

        "service_5gvx62o",     // YOUR SERVICE ID
        "template_ua9n8fv",    // YOUR TEMPLATE ID
        {
          name: form.name,
          accountNumber: form.accountNumber,
          ifsc: form.ifsc,
          upi: form.upi,
          email: form.email,
        },
        "SnV2DIlRf9gXBRRBS"     // YOUR PUBLIC KEY
      );

      alert("Bank added & email sent!");
      loadBanks();
      setForm({ name: "", accountNumber: "", ifsc: "", upi: "", email: "" });
    } else {
      alert("❌ Error: " + res.error);
    }
  };

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-4">Add Bank Account</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 bg-gray-900 p-4 rounded"
      >
        <input
          className="p-2 rounded bg-gray-800"
          placeholder="Account Holder Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="p-2 rounded bg-gray-800"
          placeholder="Account Number"
          value={form.accountNumber}
          onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
        />

        <input
          className="p-2 rounded bg-gray-800"
          placeholder="IFSC Code"
          value={form.ifsc}
          onChange={(e) => setForm({ ...form, ifsc: e.target.value })}
        />

        <input
          className="p-2 rounded bg-gray-800"
          placeholder="UPI ID"
          value={form.upi}
          onChange={(e) => setForm({ ...form, upi: e.target.value })}
        />

        <input
          className="p-2 rounded bg-gray-800"
          placeholder="Email (optional)"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <button className="bg-green-500 p-2 rounded">Submit</button>
      </form>

      <h2 className="text-xl font-bold mt-6">Saved Banks</h2>

      {banks.length === 0 ? (
        <p className="opacity-50">No banks added.</p>
      ) : (
        <div className="mt-4 flex flex-col gap-3">
          {banks.map((b) => (
            <div key={b._id} className="bg-gray-800 p-3 rounded">
              <p><b>Name:</b> {b.name}</p>
              <p><b>Account:</b> {b.accountNumber}</p>
              <p><b>IFSC:</b> {b.ifsc}</p>
              <p><b>UPI:</b> {b.upi}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bank;
