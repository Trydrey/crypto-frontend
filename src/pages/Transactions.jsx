import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Transactions = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const isLoggedIn = !!localStorage.getItem('token');
  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

  if (!isLoggedIn) {
    return (
      <main className="pt-16 min-h-screen bg-pink-950">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4 text-pink-100">Please Sign In</h1>
          <p className="text-pink-300 mb-8">You need to be logged in to view your transactions.</p>
          <button
            onClick={() => navigate('/signin')}
            className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-500 transition-colors"
          >
            Go to Sign In
          </button>
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
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-900/50';
      case 'pending': return 'text-yellow-400 bg-yellow-900/50';
      case 'failed': return 'text-red-400 bg-red-900/50';
      default: return 'text-pink-300 bg-pink-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
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
    <main className="pt-16 min-h-screen bg-pink-950">
      <div className="container mx-auto px-4 py-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-pink-100">Transaction History</h1>
            <p className="text-pink-400">View all your trading activity</p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 md:mt-0 px-4 py-2 border border-pink-700 text-pink-300 rounded-lg hover:bg-pink-800 transition-colors"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Volume', value: `$${totalVolume.toLocaleString()}`, color: 'text-white' },
            { label: 'Total Buys', value: `$${totalBuys.toLocaleString()}`, color: 'text-green-400' },
            { label: 'Total Sells', value: `$${totalSells.toLocaleString()}`, color: 'text-red-400' },
            { label: 'Transactions', value: filteredTransactions.length, color: 'text-white' },
          ].map((stat) => (
            <div key={stat.label} className="bg-pink-900 border border-pink-800 p-4 rounded-lg shadow-lg">
              <p className="text-sm text-pink-400 mb-1">{stat.label}</p>
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-pink-900 border border-pink-800 p-4 rounded-lg shadow-lg mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex space-x-2">
              {['all', 'buy', 'sell'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filter === type
                      ? type === 'buy' ? 'bg-green-700 text-white'
                      : type === 'sell' ? 'bg-red-800 text-white'
                      : 'bg-pink-600 text-white'
                      : 'bg-pink-800 text-pink-200 hover:bg-pink-700'
                  }`}
                >
                  {type === 'all' ? 'All' : type === 'buy' ? 'Buys' : 'Sells'}
                </button>
              ))}
            </div>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 bg-pink-800 border border-pink-700 text-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
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
        <div className="bg-pink-900 border border-pink-800 rounded-lg shadow-lg overflow-hidden">
          {filteredTransactions.length > 0 ? (
            <div className="divide-y divide-pink-800">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="p-6 hover:bg-pink-800/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                        transaction.type === 'buy' ? 'bg-green-900/50' :
                        transaction.type === 'sell' ? 'bg-red-900/50' : 'bg-pink-800'
                      }`}>
                        {getTypeIcon(transaction.type)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-lg text-pink-100">{transaction.symbol}</h3>
                          <span className={`text-xs px-2 py-1 rounded ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </div>
                        <p className="text-sm text-pink-400">
                          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} •{' '}
                          {new Date(transaction.timestamp).toLocaleDateString()} at{' '}
                          {new Date(transaction.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-8">
                      <div className="text-right">
                        <p className="text-sm text-pink-400">Amount</p>
                        <p className="font-medium text-pink-200">{transaction.amount} {transaction.symbol}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-pink-400">Price</p>
                        <p className="font-medium text-pink-200">${transaction.price.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-pink-400">Total</p>
                        <p className={`font-bold text-lg ${
                          transaction.type === 'buy' ? 'text-green-400' :
                          transaction.type === 'sell' ? 'text-red-400' : 'text-pink-300'
                        }`}>
                          ${transaction.total.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {transaction.note && (
                    <div className="mt-3 text-sm text-pink-400 bg-pink-800/50 p-2 rounded border border-pink-700">
                      📝 {transaction.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-bold mb-2 text-pink-100">No transactions yet</h3>
              <p className="text-pink-400 mb-6">Start trading to see your transaction history</p>
              <button
                onClick={() => navigate('/explore')}
                className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-500 transition-colors"
              >
                Explore Cryptocurrencies
              </button>
            </div>
          )}
        </div>

      </div>
    </main>
  );
};

export default Transactions;