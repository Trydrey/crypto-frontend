import React from 'react';
import { useNavigate } from 'react-router-dom';

const CryptoRow = ({ crypto, index, onAlertClick }) => {
  const navigate = useNavigate();
  const { name, symbol, price, change } = crypto;
  
  const handleTrade = (e) => {
    e.stopPropagation();
    navigate(`/asset/${symbol}`);
  };

  const handleRowClick = () => {
    navigate(`/asset/${symbol}`);
  };

  return (
    <tr 
      onClick={handleRowClick}
      className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mr-3 flex items-center justify-center text-white font-bold text-xs">
            {symbol.substring(0, 2)}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{name}</div>
            <div className="text-sm text-gray-500">{symbol}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        ${price.toLocaleString(undefined, { 
          minimumFractionDigits: price < 1 ? 4 : 2, 
          maximumFractionDigits: price < 1 ? 6 : 2 
        })}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
        change >= 0 ? 'text-green-600' : 'text-red-600'
      }`}>
        <span className="flex items-center">
          {change >= 0 ? (
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
          {change >= 0 ? '+' : ''}{change}%
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div className="flex space-x-2">
          {onAlertClick && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAlertClick(crypto);
              }}
              className="text-yellow-600 hover:text-yellow-800 font-medium px-3 py-1 rounded border border-yellow-300 hover:bg-yellow-50"
            >
              🔔 Alert
            </button>
          )}
          <button 
            onClick={handleTrade}
            className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm"
          >
            Trade
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CryptoRow;