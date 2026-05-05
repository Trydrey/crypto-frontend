import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../common/Button';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  const isActive = (path) =>
    location.pathname === path
      ? 'text-pink-300 font-semibold'
      : 'text-pink-200';

  return (
    <nav className="fixed w-full z-10 shadow-lg shadow-pink-950/50">

      {/* ⚠️ WARNING BANNER */}
      <div className="bg-pink-800 text-pink-200 text-center text-xs py-1">
        ⚠️ Student project – Not affiliated with Coinbase. Do not use real data.
      </div>

      {/* MAIN NAVBAR */}
      <div className="bg-pink-900 border-b border-pink-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-pink-300">
                CryptoApp
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <Link to="/explore" className={`${isActive('/explore')} hover:text-pink-300 transition-colors`}>
                Explore
              </Link>
              <Link to="/learn" className={`${isActive('/learn')} hover:text-pink-300 transition-colors`}>
                Learn
              </Link>
              {isLoggedIn && (
                <Link to="/dashboard" className={`${isActive('/dashboard')} hover:text-pink-300 transition-colors`}>
                  Dashboard
                </Link>
              )}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex space-x-4">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg border border-pink-600 text-pink-300 hover:bg-pink-800 transition-colors"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link to="/signin">
                    <button className="px-4 py-2 rounded-lg border border-pink-600 text-pink-300 hover:bg-pink-800 transition-colors">
                      Sign In
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-500 transition-colors">
                      Get Started
                    </button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-pink-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-pink-800">
              <div className="flex flex-col space-y-3">
                <Link to="/explore" className="text-pink-200 hover:text-pink-300" onClick={() => setIsMobileMenuOpen(false)}>
                  Explore
                </Link>
                <Link to="/learn" className="text-pink-200 hover:text-pink-300" onClick={() => setIsMobileMenuOpen(false)}>
                  Learn
                </Link>
                {isLoggedIn && (
                  <Link to="/dashboard" className="text-pink-200 hover:text-pink-300" onClick={() => setIsMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                )}
                <div className="pt-3 border-t border-pink-800">
                  {isLoggedIn ? (
                    <button onClick={handleLogout} className="w-full px-4 py-2 border border-pink-600 text-pink-300 rounded-lg hover:bg-pink-800">
                      Sign Out
                    </button>
                  ) : (
                    <>
                      <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                        <button className="w-full mb-2 px-4 py-2 border border-pink-600 text-pink-300 rounded-lg hover:bg-pink-800">
                          Sign In
                        </button>
                      </Link>
                      <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                        <button className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-500">
                          Get Started
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;