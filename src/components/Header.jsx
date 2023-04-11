import React, { useEffect, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { SlMenu } from 'react-icons/sl';
import { VscChromeClose } from 'react-icons/vsc';
import { useLocation, useNavigate } from 'react-router-dom';
const Header = () => {
  const [show, setShow] = useState(true);
  const [menuBgSolid, setMenuBgSolid] = useState('bg-[#15262224]');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top on changing pages___________

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // On scroll menu hide or show ______________

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      setMenuBgSolid('bg-gray-900');
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow(false);
      } else {
        setShow(true);
      }
    } else {
      setMenuBgSolid('bg-[#15262224]');
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  // Mobile menu popup________________

  const handleMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  // Searchbar popup___________

  const handleSearchBar = () => {
    setShowSearch(!showSearch);
    setMobileMenu(false);
  };

  // Clear Search Results__________

  const clearSearch = () => {
    document.getElementById('searchInput').value = '';
  };

  // Search Query handle ____________

  const searchQueryHandler = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 300);
    }
  };

  // move to movie or tv page________________

  const navigateHandler = (type) => {
    if (type === 'movie') {
      navigate('/explore/movie');
    } else {
      navigate('/explore/tv');
    }
    setMobileMenu(false);
  };

  return (
    <div
      className={`${
        show ? `fixed ${menuBgSolid}` : 'hidden'
      }   w-full backdrop-brightness-75 backdrop-blur-lg left-0  top-0 flex  items-center z-10  text-[14px] justify-between px-5 text-white m-0  py-2`}
    >
      <div onClick={() => navigate('/')} className="cursor-pointer">
        <img src="/public/images/movix-logo.svg" alt="logo" />
      </div>
      <ul className="flex items-center space-x-5 ">
        <div
          className={` md:inline  ${
            mobileMenu
              ? 'absolute  left-0 px-10 top-10 w-full z-10 py-4 bg-gray-900 '
              : 'hidden'
          } `}
        >
          <span
            className={`${mobileMenu && 'flex-col space-y-3'} flex space-x-5 `}
          >
            <li
              onClick={() => navigateHandler('movie')}
              className="cursor-pointer hover:text-red-800"
            >
              Movies
            </li>
            <li
              onClick={() => navigateHandler('tv')}
              className="cursor-pointer hover:text-red-800"
            >
              TV Shows
            </li>
          </span>
        </div>
        <li className="flex space-x-5 cursor-pointer ">
          <HiOutlineSearch
            onClick={handleSearchBar}
            className="hover:text-red-800 "
          />
          <div className="hover:text-red-800 md:hidden">
            {!mobileMenu ? (
              <SlMenu onClick={handleMobileMenu} />
            ) : (
              <VscChromeClose onClick={() => setMobileMenu(false)} />
            )}
          </div>
        </li>
      </ul>
      <div
        className={`absolute -top-0 ${
          showSearch ? 'absolute w-full h-10 left-0 right-0  z-10' : 'hidden'
        }`}
      >
        <input
          className="w-full h-full text-[16px] p-6  text-black outline-none"
          type="text "
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={searchQueryHandler}
          placeholder="Search for a movie or tv show..."
          name=""
          id="searchInput"
        />
        <p
          onClick={clearSearch}
          className="cursor-pointer absolute p-2 text-[10px] font-bold text-white bg-gray-900  right-14 top-2"
        >
          Clear
        </p>
        <p
          onClick={() => setShowSearch(false)}
          className="cursor-pointer absolute p-2 text-[10px] font-bold text-white   bg-red-700 right-3 top-2"
        >
          Close
        </p>
      </div>
    </div>
  );
};

export default Header;
