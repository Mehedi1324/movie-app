import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import LazyLoading from './LazyLoading';
import { useSelector } from 'react-redux';
import PosterFallBack from '../../public/images/no-poster.png';
import dayjs from 'dayjs';
import CircleRating from './CircleRating';
import Genres from './Genres';
const Carousel = ({ data, loading, endpoint, title }) => {
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  // Tailwind css skeleton item ________________________

  const skeletonItem = () => {
    return (
      <div
        role="status"
        className="  rounded shadow animate-pulse p-[8%] dark:border-gray-700"
      >
        {title && <div>{title}</div>}
        <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
          <svg
            className="w-12 h-12 text-gray-200 dark:text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 640 512"
          >
            <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
          </svg>
        </div>

        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        <div className="flex items-center mt-4 space-x-3"></div>
      </div>
    );
  };

  // React slick setup_____________
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div>
      <div>
        {!loading ? (
          <Slider {...settings}>
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallBack;
              return (
                <div className="p-[8%] ">
                  <div
                    onClick={() =>
                      navigate(`/${item.media_type || endpoint}/${item.id}`)
                    }
                    className="relative z-10 transition-transform cursor-pointer hover:opacity-90 hover:scale-110"
                    key={item.id}
                  >
                    <div className="rounded-lg bg-blue-500/30 shadow-custom-gray">
                      <LazyLoading
                        className="h-full rounded-md"
                        src={posterUrl}
                      />
                    </div>

                    <div className="absolute z-10 -bottom-2 left-3">
                      <CircleRating rating={item?.vote_average.toFixed(1)} />
                    </div>
                    <div className="absolute bottom-0 right-0">
                      <Genres key={item.id} data={item.genre_ids.slice(0, 2)} />
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      navigate(`/${item.media_type || endpoint}/${item.id}`)
                    }
                    className="mt-6 text-white cursor-pointer hover:text-blue-800"
                  >
                    {item.title || item.name}
                  </div>
                  <div>{dayjs(item.release_Date).format('MMM D, YYYY')}</div>
                </div>
              );
            })}
          </Slider>
        ) : (
          <Slider {...settings}>
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Carousel;
