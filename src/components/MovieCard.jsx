import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PosterFallBack from '../../public/images/no-poster.png';
import LazyLoading from './LazyLoading';
import dayjs from 'dayjs';
import CircleRating from './CircleRating';
import Genres from './Genres';
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
        className="relative transition-transform cursor-pointer hover:opacity-90 hover:scale-110"
      >
        <div className="rounded-lg bg-blue-500/30 shadow-custom-gray">
          <LazyLoading className="h-full rounded-md " src={posterUrl} />
        </div>
        <div className="absolute z-10 -bottom-2 left-3">
          <CircleRating rating={data?.vote_average.toFixed(1)} />
        </div>
        <div className="absolute bottom-0 right-0 ">
          <Genres key={data.id} data={data.genre_ids.slice(0, 2)} />
        </div>
      </div>
      <div
        onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
        className="mt-6 text-white cursor-pointer hover:text-blue-800"
      >
        {data.title || data.name}
      </div>
      <div className="text-white/40">
        {dayjs(data.release_Date).format('MMM D, YYYY')}
      </div>
    </div>
  );
};

export default MovieCard;
