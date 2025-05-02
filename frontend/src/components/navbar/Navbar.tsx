'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Store login state in localStorage for persistence across page reloads
  useEffect(() => {
    const storedLoginState = localStorage.getItem('isLoggedIn');
    if (storedLoginState) {
      setIsLoggedIn(storedLoginState === 'true');
    }
  }, []);

  const toggleLoginState = () => {
    const newLoginState = !isLoggedIn;
    setIsLoggedIn(newLoginState);
    localStorage.setItem('isLoggedIn', String(newLoginState));
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5">
      <div className="flex flex-wrap justify-between items-center">
        <Link href="/home" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-blue-600">
            NS Walk
          </span>
        </Link>
        
        <div className="flex items-center md:order-2">
          {isLoggedIn ? (
            <>
              <Link href="/create-walk" className="text-gray-800 hover:text-blue-600 ml-5">
                Create Walk
              </Link>
              
              <Link href="/profile" className="text-gray-800 hover:text-blue-600 ml-5">
                Profile
              </Link>
              
              <button 
                onClick={toggleLoginState}
                className="text-gray-800 hover:text-blue-600 ml-5"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/travel-guide" className="text-gray-800 hover:text-blue-600 ml-5">
                Travel Guide
              </Link>
              
              <button 
                onClick={toggleLoginState}
                className="text-gray-800 hover:text-blue-600 ml-5"
              >
                Login
              </button>
            </>
          )}
          
          {/* Temporary dev toggle */}
          <button 
            onClick={toggleLoginState}
            className="bg-gray-200 text-xs px-2 py-1 rounded ml-5 text-gray-700"
            title="Developer toggle for logged in/out state"
          >
            [DEV: {isLoggedIn ? 'Logged In' : 'Logged Out'}]
          </button>
          
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
            {isLoggedIn ? (
              <>
                <li>
                  <Link href="/create-walk" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100">
                    Create Walk
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100">
                    Profile
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={toggleLoginState}
                    className="block w-full text-left py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/travel-guide" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100">
                    Travel Guide
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={toggleLoginState}
                    className="block w-full text-left py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100"
                  >
                    Login
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
