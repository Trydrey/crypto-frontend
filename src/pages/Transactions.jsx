import React, { useState } from 'react';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import API_URL from "../config/api";

fetch(`${API_URL}/api/crypto`)
const Transactions = () => {
  const { user } = useAuth();
  const { transactions } = useTransactions();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  if (!user) {
    return (
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Please Sign In</h1>
          <p className="text-gray-600 mb-8">You need to be logged in to view your transactions.</p>
          <Button variant="primary" onClick={() => navigate('/signin')}>
            Go to Sign In
          </Button>
        </div>
      </main>
    );
  }

  const filteredTransactions = transactions.filter(t => {
    if (filter !== 'all' && t.type !== filter) return false;
    
    if (dateRange !== 'all') {
      const days = parseInt(dateRange);
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      if (new Date(t.timestamp) < cutoff) return false;
    }
    
    return true;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'buy': return '📥';
      case 'sell': return '📤';
      case 'deposit': return '💰';
      case 'withdraw': return '🏦';
      default: return '🔄';
    }
  };

  const totalVolume = filteredTransactions.reduce((sum, t) => sum + t.total, 0);
  const totalBuys = filteredTransactions.filter(t => t.type === 'buy').reduce((sum, t) => sum + t.total, 0);
  const totalSells = filteredTransactions.filter(t => t.type === 'sell').reduce((sum, t) => sum + t.total, 0);

  return (
    <main className="pt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Transaction History</h1>
            <p className="text-gray-600">View all your trading activity</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/dashboard')} className="mt-4 md:mt-0">
            ← Back to Dashboard
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-sm text-gray-500 mb-1">Total Volume</p>
            <p className="text-xl font-bold">${totalVolume.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-sm text-gray-500 mb-1">Total Buys</p>
            <p className="text-xl font-bold text-green-600">${totalBuys.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-sm text-gray-500 mb-1">Total Sells</p>
            <p className="text-xl font-bold text-red-600">${totalSells.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-sm text-gray-500 mb-1">Transactions</p>
            <p className="text-xl font-bold">{filteredTransactions.length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('buy')}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === 'buy' ? 'bg-green-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Buys
              </button>
              <button
                onClick={() => setFilter('sell')}
                className={`px-4 py-2 rounded-lg transition ${
                  filter === 'sell' ? 'bg-red-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Sells
              </button>
            </div>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Time</option>
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
              <option value="365">Last Year</option>
            </select>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredTransactions.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                        transaction.type === 'buy' ? 'bg-green-100' :
                        transaction.type === 'sell' ? 'bg-red-100' : 'bg-blue-100'
                      }`}>
                        {getTypeIcon(transaction.type)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-lg">{transaction.symbol}</h3>
                          <span className={`text-xs px-2 py-1 rounded ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} • 
                          {new Date(transaction.timestamp).toLocaleDateString()} at{' '}
                          {new Date(transaction.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-8">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Amount</p>
                        <p className="font-medium">{transaction.amount} {transaction.symbol}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="font-medium">${transaction.price.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Total</p>
                        <p className={`font-bold text-lg ${
                          transaction.type === 'buy' ? 'text-green-600' :
                          transaction.type === 'sell' ? 'text-red-600' : 'text-blue-600'
                        }`}>
                          ${transaction.total.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {transaction.note && (
                    <div className="mt-3 text-sm text-gray-500 bg-gray-50 p-2 rounded">
                      📝 {transaction.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-bold mb-2">No transactions yet</h3>
              <p className="text-gray-500 mb-6">Start trading to see your transaction history</p>
              <Button variant="primary" onClick={() => navigate('/explore')}>
                Explore Cryptocurrencies
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Transactions;
