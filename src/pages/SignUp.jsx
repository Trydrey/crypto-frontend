import React, { useState } from 'react';

const SignUp = () => {
  return (
    <main className="pt-16 min-h-screen bg-pink-950">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-pink-900 border border-pink-800 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-2 text-pink-100">Create Account</h2>

          <p className="text-sm text-pink-400 text-center mb-8">
            Demo app – do not use your real password
          </p>

          <form>
            <div className="mb-4">
              <label className="block text-pink-200 text-sm font-bold mb-2" htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 bg-pink-800 border border-pink-700 rounded-lg text-pink-100 placeholder-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="John Doe"
              />
            </div>

            <div className="mb-4">
              <label className="block text-pink-200 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 bg-pink-800 border border-pink-700 rounded-lg text-pink-100 placeholder-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="your@email.com"
              />
            </div>

            <div className="mb-4">
              <label className="block text-pink-200 text-sm font-bold mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 bg-pink-800 border border-pink-700 rounded-lg text-pink-100 placeholder-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="********"
              />
            </div>

            <div className="mb-6">
              <label className="block text-pink-200 text-sm font-bold mb-2" htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                className="w-full px-3 py-2 bg-pink-800 border border-pink-700 rounded-lg text-pink-100 placeholder-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="********"
              />
            </div>

            <button
              type="submit"
              className="w-full mb-4 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-500 transition-colors font-semibold"
            >
              Sign Up
            </button>

            <p className="text-center text-pink-300">
              Already have an account?{' '}
              <a href="/signin" className="text-pink-400 hover:text-pink-200 underline">Sign in</a>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignUp;