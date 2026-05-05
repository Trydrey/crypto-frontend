import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-pink-950 border-t border-pink-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-pink-300">CryptoApp</h3>
            <p className="text-pink-400">© 2024 CryptoApp. All rights reserved.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-pink-200">Company</h4>
            <ul className="space-y-2 text-pink-400">
              <li>About</li>
              <li>Careers</li>
              <li>Press</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-pink-200">Support</h4>
            <ul className="space-y-2 text-pink-400">
              <li>Help Center</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-pink-200">Social</h4>
            <ul className="space-y-2 text-pink-400">
              <li>Twitter</li>
              <li>LinkedIn</li>
              <li>Facebook</li>
            </ul>
          </div>
        </div>

        <p className="text-xs text-pink-500 text-center mt-8 pt-6 border-t border-pink-800">
          This is a demo/student project. Do not enter real personal or financial information.
        </p>
      </div>
    </footer>
  );
};

export default Footer;