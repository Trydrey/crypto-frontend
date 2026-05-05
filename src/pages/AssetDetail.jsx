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
        const res = await fetch(`${API_URL}/api/crypto`);
        const data = await res.json();

        const found = data.find(c => c.symbol === symbol.toUpperCase());
        setCrypto(found || null);
      } catch (err) {
        console.error(err);
        setCrypto(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCrypto();
  }, [symbol]);

  if (loading) {
    return (
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="flex justify-center items-center h-64">
          Loading...
        </div>
      </main>
    );
  }

  if (!crypto) {
    return (
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="text-center py-20">
          Crypto not found
        </div>
      </main>
    );
  }

  return (
    <main className="pt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold">{crypto.name}</h1>

        <p className="text-gray-500">{crypto.symbol}</p>

        <p className="text-2xl font-bold mt-4">
          ${crypto.price}
        </p>

        <p className={crypto.change24h >= 0 ? "text-green-600" : "text-red-600"}>
          {crypto.change24h}%
        </p>
      </div>
    </main>
  );
};

export default AssetDetail;
