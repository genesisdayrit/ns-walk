'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5">
      <div className="flex flex-wrap justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-blue-600">
            NS Walk
          </span>
        </Link>
        
        <div className="flex items-center md:order-2">
          <Link href="/login" className="text-gray-800 hover:text-blue-600 ml-5">
            Login
          </Link>
          
          <Link href="/travel-guide" className="text-gray-800 hover:text-blue-600 ml-5">
            Travel Guide
          </Link>
          
          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
        
        {/* Mobile menu */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} w-full md:hidden`}>
          <ul className="flex flex-col mt-4 rounded-lg bg-gray-50 p-4">
            <li>
              <Link href="/login" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100">
                Login
              </Link>
            </li>
            <li>
              <Link href="/travel-guide" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100">
                Travel Guide
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
