import React, { useState, useEffect } from 'react';

const Learn = () => {
  const articles = [
    { title: 'What is Bitcoin?', category: 'Basics', readTime: '5 min' },
    { title: 'How to buy cryptocurrency', category: 'Guide', readTime: '8 min' },
    { title: 'Understanding blockchain', category: 'Technology', readTime: '10 min' },
    { title: 'Crypto wallets explained', category: 'Security', readTime: '6 min' },
    { title: 'NFTs for beginners', category: 'NFTs', readTime: '7 min' },
    { title: 'DeFi explained', category: 'Advanced', readTime: '12 min' },
  ];

  return (
    <main className="pt-16">
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Learn about Crypto</h1>
        <p className="text-xl text-gray-600 mb-12">Educational resources for beginners and experts</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-blue-600 font-semibold">{article.category}</span>
                  <span className="text-sm text-gray-500">{article.readTime} read</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
                </p>
                <button className="text-blue-600 font-semibold hover:text-blue-800">
                  Read more →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Learn;
