import React, { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, UserIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true); // State to track visibility of navbar
  const [showDropdown, setShowDropdown] = useState(false); // State to handle dropdown visibility
  const navbarRef = useRef(null); // Ref to track the height of the navbar

  // Scroll event handler to toggle navbar visibility based on scroll direction
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    const navbarHeight = navbarRef.current?.offsetHeight || 0;

    // Check scroll direction and hide/show navbar accordingly
    if (currentScrollPos > navbarHeight) {
      setIsSticky(true);

      if (currentScrollPos > prevScrollPos) {
        // Scrolling down
        setIsVisible(false); // Hide navbar
      } else {
        // Scrolling up
        setIsVisible(true); // Show navbar
      }
    } else {
      setIsSticky(false);
      setIsVisible(true); // Always show when at the top
    }

    // Update previous scroll position
    setPrevScrollPos(currentScrollPos);
  };

  // Add and clean up scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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

          <li>
            <a href="#careers" className="text-black font-semibold">HOME</a>
          </li>

          <li className="relative group">
            <a href="#about" className="text-black font-semibold">ABOUT US</a>
          </li>
          <li className="relative group">
            <a href="#segments" className="text-black font-semibold">OUR SERVICES</a>
          </li>
          <li className="relative group">
            <a href="#store" className="text-black font-semibold">STORE</a>
          </li>

        </ul>


        <div className="flex space-x-4 relative">

          <div className="relative">
            <a href="#user" className="text-black" onClick={() => setShowDropdown(!showDropdown)}>
              <UserIcon className="h-6 w-6" />
            </a>


            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">

                <div className="flex justify-around mt-5 mb-3">
                  <div className='w-16 h-8 rounded-xl border-2 border-black hover:bg-black hover:text-white cursor-pointer '>Login</div>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
