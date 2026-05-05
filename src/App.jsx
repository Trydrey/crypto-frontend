import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Learn from './pages/Learn';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import AssetDetail from './pages/AssetDetail';
import Transactions from './pages/Transactions';
import WarningBanner from './components/WarningBanner';

// 🔒 ProtectedRoute: redirects to /signin if user is not logged in
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('user'); // Update this to match your auth logic
  return isLoggedIn ? children : <Navigate to="/signin" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-pink-50 flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* 🔒 Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <Transactions />
                </ProtectedRoute>
              }
            />

            <Route
              path="/asset/:symbol"
              element={
                <ProtectedRoute>
                  <AssetDetail />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;