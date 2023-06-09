import React, { useEffect, useState } from 'react';
import SwitchTab from './SwitchTab';
import useFetch from '../hooks/useFetch';
import Carousel from './Carousel';

const TopRated = () => {
  const [endpoint, setEndpoint] = useState('movie');
  const { data, loading } = useFetch(`/${endpoint}/top_rated`);

  const onTabChange = (tab) => {
    setEndpoint(tab === 'Movies' ? 'movie' : 'tv');
  };
  return (
    <div
      className="relative space-y-3 text-white/50 w-[90%] mx-auto
  "
    >
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold">Top Rated</span>
        <SwitchTab data={['Movies', 'TV Shows']} onTabChange={onTabChange} />
      </div>
      <div>
        <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
      </div>
    </div>
  );
};

export default TopRated;
