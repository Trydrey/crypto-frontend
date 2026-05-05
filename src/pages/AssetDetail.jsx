import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AssetDetail = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();

  const [crypto, setCrypto] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://crypto-backend-i2i3.onrender.com/api/crypto`);
        if (!res.ok) throw new Error("Failed to fetch crypto data");
        const data = await res.json();
        const found = data.find(c => c.symbol?.toUpperCase() === symbol?.toUpperCase());
        setCrypto(found || null);
      } catch (err) {
        console.error("Error fetching crypto:", err);
        setCrypto(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCrypto();
  }, [symbol]);

  if (loading) {
    return (
      <main className="pt-16 min-h-screen bg-pink-950">
        <div className="flex justify-center items-center h-64 text-pink-400">
          Loading asset data...
        </div>
      </main>
    );
  }

  if (!crypto) {
    return (
      <main className="pt-16 min-h-screen bg-pink-950">
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold mb-4 text-pink-100">Crypto not found</h2>
          <button
            onClick={() => navigate('/explore')}
            className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-500 transition-colors"
          >
            Back to Explore
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-16 min-h-screen bg-pink-950">
      <div className="container mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-pink-100">{crypto.name}</h1>
          <p className="text-pink-400">{crypto.symbol}</p>
        </div>

        {/* Price Card */}
        <div className="bg-pink-900 border border-pink-800 p-6 rounded-lg shadow-lg mb-6">
          <p className="text-3xl font-bold text-white">
            ${crypto.price?.toLocaleString()}
          </p>
          <p className={(crypto.change24h ?? 0) >= 0 ? "text-green-400 mt-1" : "text-red-400 mt-1"}>
            {(crypto.change24h ?? 0) >= 0 ? "+" : ""}
            {crypto.change24h ?? 0}%
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-pink-900 border border-pink-800 rounded-lg shadow-lg overflow-hidden">
          <div className="flex border-b border-pink-800">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'text-pink-100 border-b-2 border-pink-400 bg-pink-800'
                  : 'text-pink-400 hover:text-pink-200'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'about'
                  ? 'text-pink-100 border-b-2 border-pink-400 bg-pink-800'
                  : 'text-pink-400 hover:text-pink-200'
              }`}
            >
              About
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <p className="text-pink-300">Market overview for {crypto.name}</p>
            )}
            {activeTab === 'about' && (
              <p className="text-pink-300">
                {crypto.name} ({crypto.symbol}) is a digital asset.
              </p>
            )}
          </div>
        </div>

      </div>
    </main>
  );
};

export default AssetDetail;