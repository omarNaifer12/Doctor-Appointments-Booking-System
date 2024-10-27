import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start px-4">
        {/* Left Side */}
        <div className="mb-6 md:mb-0">
          <img src={assets.logo} alt="Company Logo" className="h-12 mb-2" />
          <p className="text-gray-400 text-sm">
            Izfhyuh zfeuzefuize byizefvbzeb zfbzfyiegbfeubzfeu fjbfubreau ea vebavuebfufrbuare rab.
          </p>
        </div>

        {/* Center */}
        <div className="mb-6 md:mb-0">
          <p className="text-lg font-semibold">Company</p>
          <ul className="space-y-2 mt-2">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">About Us</li>
            <li className="hover:underline cursor-pointer">Contact Us</li>
            <li className="hover:underline cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Right Side */}
        <div>
          <p className="text-lg font-semibold">Get in Touch</p>
          <ul className="space-y-2 mt-2">
            <li className="hover:underline cursor-pointer">+1 154 588 6645</li>
            <li className="hover:underline cursor-pointer">omar@gmail.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-600 mt-6 pt-4 text-center">
        <p className="text-sm text-gray-400">Copyright © 2024 Prescripto. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer