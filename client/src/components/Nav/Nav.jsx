import React from 'react'

const Nav = () => {
  return (
    <div>
         <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">FLYTIUM</div>
        <ul className="flex space-x-6 text-white">
          <li>
            <a href="#home" className="hover:text-yellow-400">Home</a>
          </li>
          <li>
            <a href="#about" className="hover:text-yellow-400">About</a>
          </li>
          <li>
            <a href="#services" className="hover:text-yellow-400">Services</a>
          </li>
          <li>
            <a href="#pricing" className="hover:text-yellow-400">Store</a>
          </li>
          <li>
            <a href="#contact" className="hover:text-yellow-400">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
    </div>
  )
}

export default Nav