import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import Carousel from './Carousel';

const SimilarMovies = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);
  const title = mediaType === 'tv' ? 'Similar Tv Shows' : 'Similar Movies';
  return (
    <div
      className="relative space-y-2 my-10 text-white/50 w-[90%] mx-auto
  "
    >
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold">Top Rated</span>
      </div>
      <div>
        <Carousel
          data={data?.results}
          loading={loading}
          title={title}
          endpoint={mediaType}
        />
      </div>
    </div>
  );
};

export default SimilarMovies;
