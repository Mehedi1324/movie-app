import React, { useEffect, useState } from 'react';
import SwitchTab from './SwitchTab';
import useFetch from '../hooks/useFetch';
import Carousel from './Carousel';

const Trending = () => {
  const [endpoint, setEndpoint] = useState('day');
  const { data, loading } = useFetch(`/trending/all/${endpoint}`);

  const onTabChange = (tab) => {
    setEndpoint(tab === 'Day' ? 'day' : 'week');
  };
  return (
    <div
      className="relative space-y-3 text-white/50 w-[90%] mx-auto
  "
    >
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold">Trending</span>
        <SwitchTab data={['Day', 'Week']} onTabChange={onTabChange} />
      </div>
      <div>
        <Carousel data={data?.results} loading={loading} />
      </div>
    </div>
  );
};

export default Trending;
