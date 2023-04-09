import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa';
const Footer = () => {
  return (
    <div className="w-full p-10 m-auto text-center bg-gray-950">
      <div className="flex flex-col justify-center w-full mx-auto space-y-8 text-white">
        <ul className="flex justify-center space-x-5 text-[12px] md:text-lg">
          <li className="cursor-pointer hover:text-red-600">Terms of Use</li>
          <li className="cursor-pointer hover:text-red-600">Privacy-Policy</li>
          <li className="cursor-pointer hover:text-red-600">About</li>
          <li className="cursor-pointer hover:text-red-600">Blog</li>
          <li className="cursor-pointer hover:text-red-600">FAQ</li>
        </ul>
        <div className="text-white/40 md:w-[80%] lg:w-[60%] m-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        </div>
        <ul className="flex justify-center space-x-5 text-lg md:text-lg text-white/50">
          <li className="p-3  bg-gray-900 border-[1px] border-gray-900 hover:border-blue-700/50  rounded-full cursor-pointer hover:text-blue-600">
            <FaFacebookF />
          </li>
          <li className="p-3  bg-gray-900 border-[1px] border-gray-900 hover:border-blue-700/50  rounded-full cursor-pointer hover:text-blue-600">
            <FaInstagram />
          </li>
          <li className="p-3  bg-gray-900 border-[1px] border-gray-900 hover:border-blue-700/50  rounded-full cursor-pointer hover:text-blue-600">
            <FaLinkedin />
          </li>
          <li className="p-3  bg-gray-900 border-[1px] border-gray-900 hover:border-blue-700/50  rounded-full cursor-pointer hover:text-blue-600">
            <FaTwitter />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
