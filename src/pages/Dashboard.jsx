import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [isLoggedIn] = useState(!!localStorage.getItem("token"));

  const user = {
    name: "John Doe",
    portfolio: {
      total: 15234.56,
      profit: 2345.67,
      assets: [
        { symbol: "BTC", amount: 0.15, value: 6528.23 },
        { symbol: "ETH", amount: 2.5, value: 5701.88 },
        { symbol: "SOL", amount: 30, value: 3004.45 },
      ],
    },
  };

  if (!isLoggedIn) {
    return (
      <main className="pt-16 min-h-screen bg-pink-950">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4 text-pink-100">Please Sign In</h1>
          <button
            onClick={() => navigate("/signin")}
            className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-500 transition-colors"
          >
            Go to Sign In
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-16 min-h-screen bg-pink-950">
      <div className="container mx-auto px-4 py-12">

        <h1 className="text-3xl font-bold mb-6 text-pink-100">
          Welcome back, {user.name}
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-pink-900 border border-pink-800 p-6 rounded-lg shadow-lg">
            <p className="text-pink-400 mb-1">Total Balance</p>
            <p className="text-2xl font-bold text-white">
              ${user.portfolio.total.toLocaleString()}
            </p>
          </div>

          <div className="bg-pink-900 border border-pink-800 p-6 rounded-lg shadow-lg">
            <p className="text-pink-400 mb-1">Profit</p>
            <p className="text-2xl font-bold text-green-400">
              ${user.portfolio.profit.toLocaleString()}
            </p>
          </div>

          <div className="bg-pink-900 border border-pink-800 p-6 rounded-lg shadow-lg">
            <p className="text-pink-400 mb-1">Assets</p>
            <p className="text-2xl font-bold text-white">
              {user.portfolio.assets.length}
            </p>
          </div>
        </div>

        {/* Assets Table */}
        <div className="bg-pink-900 border border-pink-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-pink-800">
            <h2 className="text-xl font-bold text-pink-100">Your Assets</h2>
          </div>
          <table className="w-full">
            <thead className="bg-pink-800">
              <tr className="text-pink-300">
                <th className="p-4 text-left">Symbol</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-800">
              {user.portfolio.assets.map((asset) => (
                <tr key={asset.symbol} className="hover:bg-pink-800/50 transition-colors">
                  <td className="p-4 font-bold text-pink-100">{asset.symbol}</td>
                  <td className="p-4 text-pink-300">{asset.amount}</td>
                  <td className="p-4 text-white font-semibold">${asset.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  );
};

export default Dashboard;