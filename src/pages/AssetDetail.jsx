import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';       // Changed from ../src/components
import API_URL from "../config/api";

fetch(`${API_URL}/api/crypto`)
const AssetDetail = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const { getCryptoBySymbol, addToWatchlist, removeFromWatchlist, isInWatchlist } = useCrypto();
  const { user } = useAuth();
  const { setShowAlertModal, setSelectedCrypto } = useAlerts(); // Add this if you want alert functionality
  
  const [crypto, setCrypto] = useState(null);
  const [amount, setAmount] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const cryptoData = getCryptoBySymbol(symbol);
      setCrypto(cryptoData);
      setLoading(false);
    }, 500);
  }, [symbol, getCryptoBySymbol]);

  const handleWatchlistToggle = () => {
    if (isInWatchlist(symbol)) {
      removeFromWatchlist(symbol);
    } else {
      addToWatchlist(symbol);
    }
  };

  const handleAlertClick = () => {
    setSelectedCrypto(crypto);
    setShowAlertModal(true);
  };

  const handleBuy = () => {
    if (!user) {
      navigate('/signin');
      return;
    }
    alert(`Buying ${amount} ${symbol} - This would connect to a payment processor in a real app`);
  };

  if (loading) {
    return (
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </main>
    );
  }

  if (!crypto) {
    return (
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Cryptocurrency Not Found</h1>
          <p className="text-gray-600 mb-8">The asset you're looking for doesn't exist.</p>
          <Button variant="primary" onClick={() => navigate('/explore')}>
            Back to Explore
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Asset Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-600 font-bold text-xl">
                  {crypto.symbol.substring(0, 2)}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold">{crypto.name}</h1>
                <p className="text-gray-500">{crypto.symbol}</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline"
                onClick={handleAlertClick}
              >
                🔔 Set Alert
              </Button>
              <Button 
                variant={isInWatchlist(symbol) ? "secondary" : "outline"}
                onClick={handleWatchlistToggle}
              >
                {isInWatchlist(symbol) ? '✓ In Watchlist' : '+ Add to Watchlist'}
              </Button>
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Price Chart</h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-gray-100 rounded">1H</button>
                  <button className="px-3 py-1 text-sm bg-gray-100 rounded">24H</button>
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">7D</button>
                  <button className="px-3 py-1 text-sm bg-gray-100 rounded">1M</button>
                </div>
              </div>
              
              {/* Placeholder Chart */}
              <div className="h-64 bg-gradient-to-b from-blue-50 to-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Chart visualization would go here</p>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Current Price</p>
                  <p className="text-3xl font-bold">${crypto.price.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500">24h Change</p>
                  <p className={`text-xl font-semibold ${
                    crypto.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-6 bg-white rounded-lg shadow-md">
              <div className="border-b">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-6 py-3 text-sm font-medium ${
                      activeTab === 'overview'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`px-6 py-3 text-sm font-medium ${
                      activeTab === 'about'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    About
                  </button>
                  <button
                    onClick={() => setActiveTab('news')}
                    className={`px-6 py-3 text-sm font-medium ${
                      activeTab === 'news'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    News
                  </button>
                </nav>
              </div>
              
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="font-bold mb-2">Market Statistics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-500">Market Cap</p>
                        <p className="font-semibold">$823.4B</p>
                      </div>
                      <div>
                        <p className="text-gray-500">24h Volume</p>
                        <p className="font-semibold">$28.3B</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Circulating Supply</p>
                        <p className="font-semibold">19.5M {crypto.symbol}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">All-Time High</p>
                        <p className="font-semibold">$69,000</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'about' && (
                  <div>
                    <h3 className="font-bold mb-2">About {crypto.name}</h3>
                    <p className="text-gray-600">
                      {crypto.name} ({crypto.symbol}) is a decentralized cryptocurrency that enables peer-to-peer transactions without the need for intermediaries. It was created in 2009 by an unknown person or group using the pseudonym Satoshi Nakamoto.
                    </p>
                  </div>
                )}
                
                {activeTab === 'news' && (
                  <div>
                    <h3 className="font-bold mb-2">Latest News</h3>
                    <ul className="space-y-3">
                      <li className="border-b pb-2">
                        <p className="font-medium">Bitcoin reaches new monthly high</p>
                        <p className="text-sm text-gray-500">2 hours ago</p>
                      </li>
                      <li className="border-b pb-2">
                        <p className="font-medium">Institutional adoption continues to grow</p>
                        <p className="text-sm text-gray-500">5 hours ago</p>
                      </li>
                      <li className="pb-2">
                        <p className="font-medium">New upgrade proposed for network</p>
                        <p className="text-sm text-gray-500">1 day ago</p>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Buy/Sell Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Trade {crypto.symbol}</h2>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Amount
                </label>
                <div className="flex">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg">
                    {crypto.symbol}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-600">≈ ${(crypto.price * (amount || 0)).toFixed(2)}</p>
              </div>

              <div className="space-y-3">
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={handleBuy}
                >
                  Buy {crypto.symbol}
                </Button>
                <Button variant="outline" className="w-full">
                  Sell {crypto.symbol}
                </Button>
              </div>

              <div className="mt-6 pt-4 border-t">
                <h3 className="font-bold mb-2">Market Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Market Rank</span>
                    <span className="font-medium">#1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">All-Time High</span>
                    <span className="font-medium">$69,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">All-Time Low</span>
                    <span className="font-medium">$0.05</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AssetDetail;
