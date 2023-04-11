import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PosterFallBack from '../../public/images/no-poster.png';
import LazyLoading from './LazyLoading';
import dayjs from 'dayjs';
const MovieCard = ({ data, fromSearch, mediaType }) => {
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : PosterFallBack;

  return (
    <div>
      <div
        onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
        className="relative z-10 transition-transform cursor-pointer hover:opacity-90 hover:scale-110"
      >
        <div className="rounded-lg bg-blue-500/30 shadow-custom-gray">
          <LazyLoading className="h-full rounded-md" src={posterUrl} />
        </div>
      </div>
      <div
        onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
        className="mt-6 text-white cursor-pointer hover:text-blue-800"
      >
        {data.title || data.name}
      </div>
      <div>{dayjs(data.release_Date).format('MMM D, YYYY')}</div>
    </div>
  );
};

export default MovieCard;
