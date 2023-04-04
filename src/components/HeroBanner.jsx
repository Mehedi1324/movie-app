import React, { useEffect, useState } from 'react';
import '../styles/compStyles/HeroBanner.scss';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useSelector } from 'react-redux';
import LazyLoading from './LazyLoading';
import ContentWrapper from './ContentWrapper';
const HeroBanner = () => {
  const navigate = useNavigate();
  const [bannerBg, setBannerBg] = useState('');
  const [query, setQuery] = useState('');
  const { data, loading } = useFetch('/movie/upcoming');
  const { url } = useSelector((state) => state.home);
  useEffect(() => {
    const bg =
      url.backdrop +
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
    <div className="hero__banner">
      {!loading && (
        <div className="backdrop__img">
          <LazyLoading src={bannerBg} />
        </div>
      )}
      <div className="opacity__layer"></div>
      <ContentWrapper>
        <div className="banner__content">
          <span className="title">Welcome</span>
          <span className="subtitle">
            Mellions of movies, TV Shows and people to discover. Explore now !
          </span>
          <div className="searchInput">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
              placeholder="Search for movie or tv show..."
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
