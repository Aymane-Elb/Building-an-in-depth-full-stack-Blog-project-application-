import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className='bg-black text-white px-6 py-4 flex items-center space-x-6'>
      <ul>
        <li className='inline-block pt-4 pb-4 font-thin hover:font-normal'>
          <Link to='/' className='pl-6 pr-8'>
            Home
          </Link>
        </li>
        <li className='inline-block pt-4 pb-4 font-thin hover:font-normal  '>
          <Link to='/about' className='pl-6 pr-8'>
            About
          </Link>
        </li>
        <li className='inline-block pt-4 pb-4 font-thin hover:font-normal  '>
          <Link to='/articles-list' className='pl-6 pr-8'>
            Articles
          </Link>
        </li>
          <button className='bg-black text-white py-3 pt-4 pb-4 hover:underline decoration transition '>
            <Link to='/Login' className='pl-6 pr-8'>
              Login/Register
            </Link>
          </button>
      </ul>
    </nav>
  );
};

export default NavBar;
