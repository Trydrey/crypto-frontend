import React, { useState, useMemo } from 'react';
import CryptoRow from '../components/crypto/CryptoRow';  // Changed from ../src/components
import Pagination from '../components/common/Pagination';  // Changed from ../src/components
import PriceAlertModal from '../components/common/PriceAlertModal';  // Changed from ../src/components
import { cryptocurrencies } from '../data/mockCryptoData';


const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'marketCap', direction: 'desc' });
  const [filterGainers, setFilterGainers] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const itemsPerPage = 10;

  // Calculate market cap for sorting (mock data)
  const cryptosWithMarketCap = useMemo(() => {
    return cryptocurrencies.map(crypto => ({
      ...crypto,
      marketCap: crypto.price * (crypto.symbol === 'BTC' ? 19000000 : 
                                 crypto.symbol === 'ETH' ? 120000000 : 
                                 crypto.symbol === 'SOL' ? 400000000 : 100000000)
    }));
  }, []);

  // Filter and sort cryptocurrencies
  const filteredAndSortedCryptos = useMemo(() => {
    let filtered = [...cryptosWithMarketCap];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (crypto) => 
          crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply gainers/losers filter
    if (filterGainers) {
      filtered = filtered.filter(crypto => crypto.change > 0);
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [cryptosWithMarketCap, searchTerm, sortConfig, filterGainers]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCryptos.length / itemsPerPage);
  const paginatedCryptos = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredAndSortedCryptos.slice(start, end);
  }, [filteredAndSortedCryptos, currentPage]);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterGainers, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
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
    <main className="pt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Explore Cryptocurrencies</h1>
          <p className="text-xl text-gray-600">
            Discover and trade top cryptocurrencies
          </p>
        </div>

        {/* Controls Bar */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <input 
                type="text" 
                placeholder="Search by name or symbol..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setFilterGainers(!filterGainers)}
                className={`px-4 py-2 rounded-lg transition ${
                  filterGainers 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filterGainers ? 'Showing Gainers' : 'Show Gainers Only'}
              </button>

              <div className="flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-2 ${
                    viewMode === 'table' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  📊 Table
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  📱 Grid
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          Showing {paginatedCryptos.length} of {filteredAndSortedCryptos.length} cryptocurrencies
        </div>

        {/* Table View */}
        {viewMode === 'table' && (
          <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                        onClick={() => requestSort('marketCap')}>
                      # {getSortIcon('marketCap')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                        onClick={() => requestSort('name')}>
                      Name {getSortIcon('name')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                        onClick={() => requestSort('price')}>
                      Price {getSortIcon('price')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                        onClick={() => requestSort('change')}>
                      24h % {getSortIcon('change')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedCryptos.map((crypto, index) => (
                    <CryptoRow 
                      key={crypto.symbol} 
                      crypto={crypto} 
                      index={(currentPage - 1) * itemsPerPage + index}
                      onAlertClick={handleAlertClick}
                    />
                  ))}
                </tbody>
              </table>
              
              {paginatedCryptos.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-2">No cryptocurrencies found</p>
                  <p className="text-gray-400">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
            
            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}

        {/* Price Alert Modal */}
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
