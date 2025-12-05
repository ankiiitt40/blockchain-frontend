const API_BASE = "https://blockchain-backend-edli.onrender.com/api/banks";

export const getBanks = async () => {
  const res = await fetch(API_BASE);
  return res.json();
};

export const addBank = async (data) => {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};
