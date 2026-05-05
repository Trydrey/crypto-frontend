import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import API_URL from "../config/api";

const AssetDetail = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();

  const [crypto, setCrypto] = useState(null);
  const [amount, setAmount] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/api/crypto`);
        if (!res.ok) throw new Error("Failed to fetch crypto data");

        const data = await res.json();

        const found = data.find(
          c => c.symbol?.toUpperCase() === symbol?.toUpperCase()
        );

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

  // Loading state
  if (loading) {
    return (
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="flex justify-center items-center h-64 text-gray-500">
          Loading asset data...
        </div>
      </main>
    );
  }

  // Not found state
  if (!crypto) {
    return (
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold mb-2">
            Crypto not found
          </h2>
          <Button onClick={() => navigate('/explore')}>
            Back to Explore
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{crypto.name}</h1>
          <p className="text-gray-500">{crypto.symbol}</p>
        </div>

        {/* Price */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-3xl font-bold">
            ${crypto.price?.toLocaleString()}
          </p>

          <p
            className={
              (crypto.change24h ?? 0) >= 0
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {(crypto.change24h ?? 0) >= 0 ? "+" : ""}
            {crypto.change24h ?? 0}%
          </p>
        </div>

        {/* Tabs (optional structure you already started) */}
        <div className="mt-6">
          <div className="flex gap-4 border-b">
            <button
              onClick={() => setActiveTab('overview')}
              className={activeTab === 'overview' ? "font-bold" : ""}
            >
              Overview
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={activeTab === 'about' ? "font-bold" : ""}
            >
              About
            </button>
          </div>

          <div className="mt-4">
            {activeTab === 'overview' && (
              <p className="text-gray-600">
                Market overview for {crypto.name}
              </p>
            )}

            {activeTab === 'about' && (
              <p className="text-gray-600">
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
