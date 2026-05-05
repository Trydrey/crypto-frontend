import React, { useState, useMemo, useEffect } from 'react';
import CryptoRow from '../components/crypto/CryptoRow';
import Pagination from '../components/common/Pagination';
import PriceAlertModal from '../components/common/PriceAlertModal';

const Explore = () => {
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'marketCap', direction: 'desc' });
  const [filterGainers, setFilterGainers] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState(null);

  const itemsPerPage = 10;

  useEffect(() => {
    fetch(`https://crypto-backend-i2i3.onrender.com/api/crypto`)
      .then(res => res.json())
      .then(data => setCryptos(data))
      .catch(err => console.log("Fetch error:", err));
  }, []);

  const cryptosWithMarketCap = useMemo(() => {
    return cryptos.map(crypto => ({
      ...crypto,
      marketCap:
        crypto.price *
        (crypto.symbol === 'BTC' ? 19000000
          : crypto.symbol === 'ETH' ? 120000000
          : crypto.symbol === 'SOL' ? 400000000
          : 100000000),
    }));
  }, [cryptos]);

  const filteredAndSortedCryptos = useMemo(() => {
    let filtered = [...cryptosWithMarketCap];

    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterGainers) {
      filtered = filtered.filter(c => c.change > 0);
    }

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [cryptosWithMarketCap, searchTerm, sortConfig, filterGainers]);

  const totalPages = Math.ceil(filteredAndSortedCryptos.length / itemsPerPage);

  const paginatedCryptos = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedCryptos.slice(start, start + itemsPerPage);
  }, [filteredAndSortedCryptos, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterGainers, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const handleAlertClick = (crypto) => {
    setSelectedCrypto(crypto);
    setShowAlertModal(true);
  };

  return (
    <main className="pt-16 min-h-screen bg-pink-950">
      <div className="container mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-pink-100">Explore Cryptocurrencies</h1>
          <p className="text-xl text-pink-300">Discover and trade top cryptocurrencies</p>
        </div>

        {/* Controls */}
        <div className="bg-pink-900 border border-pink-800 p-4 rounded-lg shadow-lg mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <input
              type="text"
              placeholder="Search by name or symbol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-96 px-4 py-2 bg-pink-800 border border-pink-700 rounded-lg text-pink-100 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            <button
              onClick={() => setFilterGainers(!filterGainers)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterGainers ? 'bg-green-700 text-white' : 'bg-pink-800 text-pink-200 hover:bg-pink-700'
              }`}
            >
              {filterGainers ? 'Showing Gainers' : 'Show Gainers Only'}
            </button>

            <div className="flex border border-pink-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-2 transition-colors ${
                  viewMode === 'table' ? 'bg-pink-600 text-white' : 'bg-pink-800 text-pink-200 hover:bg-pink-700'
                }`}
              >
                Table
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 transition-colors ${
                  viewMode === 'grid' ? 'bg-pink-600 text-white' : 'bg-pink-800 text-pink-200 hover:bg-pink-700'
                }`}
              >
                Grid
              </button>
            </div>

          </div>
        </div>

        {/* Table */}
        {viewMode === 'table' && (
          <div className="bg-pink-900 border border-pink-800 rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-pink-800">
                <tr className="text-pink-200">
                  <th className="p-4 text-left cursor-pointer hover:text-pink-100" onClick={() => requestSort('marketCap')}># {getSortIcon('marketCap')}</th>
                  <th className="p-4 text-left cursor-pointer hover:text-pink-100" onClick={() => requestSort('name')}>Name {getSortIcon('name')}</th>
                  <th className="p-4 text-left cursor-pointer hover:text-pink-100" onClick={() => requestSort('price')}>Price {getSortIcon('price')}</th>
                  <th className="p-4 text-left cursor-pointer hover:text-pink-100" onClick={() => requestSort('change')}>24h % {getSortIcon('change')}</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-800">
                {paginatedCryptos.map((crypto, index) => (
                  <CryptoRow
                    key={crypto.symbol}
                    crypto={crypto}
                    index={index}
                    onAlertClick={handleAlertClick}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {/* Modal */}
        {showAlertModal && (
          <PriceAlertModal
            crypto={selectedCrypto}
            onClose={() => {
              setShowAlertModal(false);
              setSelectedCrypto(null);
            }}
          />
        )}

      </div>
    </main>
  );
};

export default Explore;