import React, { useState, useEffect } from 'react';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;                     // 🛡️ Prevent duplicate requests
    setLoading(true);
    try {
      const data = await login(email, password);
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-16 min-h-screen bg-pink-950">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-pink-900 border border-pink-800 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-2 text-pink-100">Sign In</h2>
          <p className="text-sm text-pink-400 text-center mb-8">
            Demo app – do not use your real password
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-pink-200 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 bg-pink-800 border border-pink-700 rounded-lg text-pink-100 placeholder-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-pink-200 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 bg-pink-800 border border-pink-700 rounded-lg text-pink-100 placeholder-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mb-4 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-500 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-pink-300">
            Don't have an account?{" "}
            <a href="/signup" className="text-pink-400 hover:text-pink-200 underline">Sign up</a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignIn;