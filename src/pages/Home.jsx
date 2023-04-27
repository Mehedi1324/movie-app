import React from 'react';
import HeroBanner from '../components/HeroBanner';
import Trending from '../components/Trending';
import Popular from '../components/Popular';
import TopRated from '../components/TopRated';
const Home = () => {
  return (
    <div className="space-y-8 pb-14">
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
