import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useSelector } from 'react-redux';
import LazyLoading from './LazyLoading';
const HeroBanner = () => {
  const navigate = useNavigate();
  const [bannerBg, setBannerBg] = useState('');
  const [query, setQuery] = useState('');
  const { data, loading } = useFetch('/movie/upcoming');
  const { url } = useSelector((state) => state.home);
  useEffect(() => {
    const bg =
      url?.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBannerBg(bg);
  }, [data]);
  const searchQueryHandler = (e) => {
    // e.preventDefault;
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className=" relative flex items-center top-0 bg-gray-900 h-[450px]  w-full lg:h-[500px] m-0  ">
      {!loading && (
        <div className="absolute top-0 object-center w-full h-full overflow-hidden bg-black opacity-40 blur-0">
          <LazyLoading className="w-full h-full md:h-auto" src={bannerBg} />
        </div>
      )}
      <div className="w-full h-[250px]  bg-gradient-to-t   from-gray-900   md:blur-none  absolute bottom-0 left-0"></div>
      <div className="relative flex flex-col items-center justify-center w-full h-full text-white ">
        <div className="flex flex-col items-center space-y-3">
          <span className="text-3xl font-bold md:text-7xl">Welcome</span>
          <span className="text-center text-md">
            Mellions of movies, TV Shows and people to discover.{' '}
            <span className="text-red-400">Explore now !</span>
          </span>

          {/* ------------ */}
          <div className="w-[80%] h-9 relative rounded-full overflow-hidden">
            <input
              className="w-[80%] h-full p-4 outline-none text-gray-900"
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
              placeholder="Search for movie or tv show..."
            />
            <button className="bg-red-400 h-full w-[20%]">Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
