import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../common/Button';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Detect login using token (real logic)
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  const isActive = (path) => {
    return location.pathname === path
      ? 'text-blue-600 font-semibold'
      : 'text-gray-700';
  };

  return (
    <nav className="fixed w-full z-10 shadow-sm">
      
      {/* ⚠️ WARNING BANNER */}
      <div className="bg-yellow-100 text-yellow-800 text-center text-xs py-1">
        ⚠️ Student project – Not affiliated with Coinbase. Do not use real data.
      </div>

      {/* MAIN NAVBAR */}
      <div className="bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">

            {/* Logo (RENAMED) */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">
                CryptoApp
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <Link to="/explore" className={`${isActive('/explore')} hover:text-blue-600`}>
                Explore
              </Link>
              <Link to="/learn" className={`${isActive('/learn')} hover:text-blue-600`}>
                Learn
              </Link>
              {isLoggedIn && (
                <Link to="/dashboard" className={`${isActive('/dashboard')} hover:text-blue-600`}>
                  Dashboard
                </Link>
              )}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex space-x-4">
              {isLoggedIn ? (
                <>
                  <Button variant="outline" onClick={handleLogout}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/signin">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="primary">Get Started</Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-3">

                <Link to="/explore" onClick={() => setIsMobileMenuOpen(false)}>
                  Explore
                </Link>

                <Link to="/learn" onClick={() => setIsMobileMenuOpen(false)}>
                  Learn
                </Link>

                {isLoggedIn && (
                  <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                )}

                <div className="pt-3 border-t">
                  {isLoggedIn ? (
                    <Button onClick={handleLogout} className="w-full">
                      Sign Out
                    </Button>
                  ) : (
                    <>
                      <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full mb-2">Sign In</Button>
                      </Link>
                      <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="primary" className="w-full">
                          Get Started
                        </Button>
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