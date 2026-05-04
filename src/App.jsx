import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
// import './index.css'; // Comment this out if using CDN

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-pink-50 flex flex-col"> {/* Changed from bg-gray-50 to bg-pink-50 */}
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