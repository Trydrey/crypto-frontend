import React, { useState } from 'react';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import API_URL from "../config/api";

fetch(`${API_URL}/api/crypto`)
const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from a simple auth state
  const [watchlist, setWatchlist] = useState([]); // This would come from localStorage or props

  // Mock user data
  const user = {
    name: 'John Doe',
    portfolio: {
      total: 15234.56,
      profit: 2345.67,
      assets: [
        { symbol: 'BTC', amount: 0.15, value: 6528.23 },
        { symbol: 'ETH', amount: 2.5, value: 5701.88 },
        { symbol: 'SOL', amount: 30, value: 3004.45 }
      ]
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Please Sign In</h1>
          <p className="text-gray-600 mb-8">You need to be logged in to view your dashboard.</p>
          <Button variant="primary" onClick={() => navigate('/signin')}>
            Go to Sign In
          </Button>
        </div>
      </main>
    );
  }

  const removeFromWatchlist = (symbol) => {
    setWatchlist(watchlist.filter(item => item.symbol !== symbol));
  };

  return (
    <main className="pt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
            <p className="text-gray-600">Here's your portfolio overview</p>
          </div>
          <Button variant="outline" onClick={() => setIsLoggedIn(false)} className="mt-4 md:mt-0">
            Sign Out
          </Button>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 mb-2">Total Balance</p>
            <p className="text-3xl font-bold">${user.portfolio?.total?.toLocaleString() || '0'}</p>
            <p className="text-sm text-green-600 mt-2">+2.3% today</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 mb-2">Total Profit/Loss</p>
            <p className={`text-3xl font-bold ${(user.portfolio?.profit || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${Math.abs(user.portfolio?.profit || 0).toLocaleString()}
              {(user.portfolio?.profit || 0) >= 0 ? ' ↑' : ' ↓'}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 mb-2">Assets</p>
            <p className="text-3xl font-bold">{user.portfolio?.assets?.length || 0}</p>
            <p className="text-sm text-gray-500 mt-2">Across {watchlist.length} watchlist items</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <button 
            onClick={() => navigate('/explore')}
            className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2"
          >
            <span>➕</span>
            <span>Buy</span>
          </button>
          <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2">
            <span>📤</span>
            <span>Deposit</span>
          </button>
          <button className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition flex items-center justify-center space-x-2">
            <span>📥</span>
            <span>Withdraw</span>
          </button>
          <button className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700 transition flex items-center justify-center space-x-2">
            <span>🔄</span>
            <span>Convert</span>
          </button>
          <button 
            onClick={() => navigate('/transactions')}
            className="bg-gray-600 text-white p-4 rounded-lg hover:bg-gray-700 transition flex items-center justify-center space-x-2"
          >
            <span>📊</span>
            <span>History</span>
          </button>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Portfolio Assets */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Your Assets</h2>
            {user.portfolio?.assets?.length > 0 ? (
              <div className="space-y-4">
                {user.portfolio.assets.map((asset) => (
                  <div key={asset.symbol} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                       onClick={() => navigate(`/asset/${asset.symbol}`)}>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">{asset.symbol.substring(0, 2)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{asset.symbol}</p>
                        <p className="text-sm text-gray-500">{asset.amount} coins</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${asset.value.toLocaleString()}</p>
                      <p className="text-sm text-green-600">+5.2%</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">You don't own any assets yet</p>
                <Button variant="primary" onClick={() => navigate('/explore')}>
                  Start Trading
                </Button>
              </div>
            )}
          </div>

          {/* Watchlist */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Your Watchlist</h2>
            {watchlist.length > 0 ? (
              <div className="space-y-4">
                {watchlist.map((crypto) => (
                  <div key={crypto.symbol} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 flex-1 cursor-pointer"
                         onClick={() => navigate(`/asset/${crypto.symbol}`)}>
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">{crypto.symbol.substring(0, 2)}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{crypto.name}</p>
                        <p className="text-sm text-gray-500">{crypto.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right mr-4">
                      <p className="font-bold">${crypto.price?.toLocaleString()}</p>
                      <p className={crypto.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                      </p>
                    </div>
                    <button 
                      onClick={() => removeFromWatchlist(crypto.symbol)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Your watchlist is empty</p>
                <Button variant="outline" onClick={() => navigate('/explore')}>
                  Explore Cryptos
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;