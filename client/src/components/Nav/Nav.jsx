import React, { useState, useEffect, useRef } from 'react';
import { UserIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navbarRef = useRef(null);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    const navbarHeight = navbarRef.current?.offsetHeight || 0;

    if (currentScrollPos > navbarHeight) {
      setIsSticky(true);
      setIsVisible(currentScrollPos < prevScrollPos);
    } else {
      setIsSticky(false);
      setIsVisible(true);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <nav
      ref={navbarRef}
      className={`bg-gray-100 p-4 shadow-md transition-all duration-[2000ms] ease-in-out transform ${isSticky
        ? `${isVisible ? 'translate-y-0' : '-translate-y-full'} fixed top-0 left-0 w-full z-50`
        : 'relative z-50'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <span className="ml-2 text-xl font-bold">FLYTIUM</span>
        </div>

        
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/about">ABOUT US</Link></li>
          <li><Link to="/services">OUR SERVICES</Link></li>
          <li><Link to="/store">STORE</Link></li>
        </ul>

    
        <div className="flex items-center space-x-4 relative">
          <div className="relative">
            <a href="#user" className="text-black" onClick={() => setShowDropdown(!showDropdown)}>
              <UserIcon className="h-6 w-6" />
            </a>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
                <div className="flex justify-around mt-5 mb-3">
                  <div className='w-16 h-8 rounded-xl border-2 border-black hover:bg-black hover:text-white cursor-pointer'>Login</div>
                  <div className='w-16 h-8 rounded-xl border-2 border-black hover:bg-black hover:text-white cursor-pointer'>Sign up</div>
                </div>
                <ul className="py-2 z-50">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <a href="#profile" className="text-black font-semibold">My Profile</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <a href="#orders" className="text-black font-semibold">Orders</a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <a href="#cart" className="text-black">
            <ShoppingCartIcon className="h-6 w-6" />
          </a>

          {/* Hamburger Icon for mobile */}
          <button
            className="md:hidden text-black"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Links (shown on toggle) */}
      {showMobileMenu && (
        <ul className="md:hidden absolute top-16 left-0 w-full bg-gray-100 shadow-md flex flex-col space-y-4 p-4 z-40">
          <li><Link to="/" onClick={() => setShowMobileMenu(false)}>HOME</Link></li>
          <li><Link to="/about" onClick={() => setShowMobileMenu(false)}>ABOUT US</Link></li>
          <li><Link to="/services" onClick={() => setShowMobileMenu(false)}>OUR SERVICES</Link></li>
          <li><Link to="/store" onClick={() => setShowMobileMenu(false)}>STORE</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
