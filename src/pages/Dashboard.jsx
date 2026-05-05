import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

const Dashboard = () => {
  const navigate = useNavigate();

  const [isLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  const [watchlist] = useState(
    JSON.parse(localStorage.getItem("watchlist")) || []
  );

  const user = {
    name: "John Doe",
    portfolio: {
      total: 15234.56,
      profit: 2345.67,
      assets: [
        { symbol: "BTC", amount: 0.15, value: 6528.23 },
        { symbol: "ETH", amount: 2.5, value: 5701.88 },
        { symbol: "SOL", amount: 30, value: 3004.45 }
      ]
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Please Sign In</h1>
          <Button onClick={() => navigate("/signin")}>
            Go to Sign In
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">

        <h1 className="text-3xl font-bold mb-6">
          Welcome back, {user.name}
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p>Total Balance</p>
            <p className="text-2xl font-bold">
              ${user.portfolio.total.toLocaleString()}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <p>Profit</p>
            <p className="text-2xl font-bold text-green-600">
              ${user.portfolio.profit.toLocaleString()}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <p>Assets</p>
            <p className="text-2xl font-bold">
              {user.portfolio.assets.length}
            </p>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Dashboard;
