import React, { useState, useEffect } from "react";
import { getCrypto } from "../api/crypto";

const Home = () => {
  const [crypto, setCrypto] = useState([]);

  useEffect(() => {
    getCrypto()
      .then(setCrypto)
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Popular cryptocurrencies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {crypto?.slice(0, 3)?.map((c) => (
            <div key={c._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full" />
                <div>
                  <h3 className="font-bold">{c.name}</h3>
                  <p className="text-gray-500">{c.symbol}</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">${c.price}</span>
                <span
                  className={c.change24h >= 0 ? "text-green-600" : "text-red-600"}
                >
                  {c.change24h}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
