import React from 'react';
import HeroBanner from '../components/HeroBanner';
import Trending from '../components/Trending';
import Popular from '../components/Popular';
const Home = () => {
  return (
    <div className="">
      <HeroBanner />
      <Trending />
      <Popular />
    </div>
  );
};

export default Home;
