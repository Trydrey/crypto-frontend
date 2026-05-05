import React from 'react';

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
    <main className="pt-16 bg-pink-950 min-h-screen">
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4 text-pink-100">Learn about Crypto</h1>
        <p className="text-xl text-pink-300 mb-12">Educational resources for beginners and experts</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-pink-900 border border-pink-800 rounded-lg shadow-lg overflow-hidden hover:shadow-pink-900/50 hover:border-pink-600 transition-all"
            >
              <div className="h-48 bg-gradient-to-r from-pink-800 to-pink-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-pink-400 font-semibold">{article.category}</span>
                  <span className="text-sm text-pink-500">{article.readTime} read</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-pink-100">{article.title}</h3>
                <p className="text-pink-300 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
                </p>
                <button className="text-pink-400 font-semibold hover:text-pink-200 transition-colors">
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