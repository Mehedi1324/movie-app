import React from 'react';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LazyLoading from './LazyLoading';
import dayjs from 'dayjs';
import { AiFillPlayCircle } from 'react-icons/ai';
import Genres from './Genres';
import CircleRating from './CircleRating';
import { useState } from 'react';
import VIdeoPopup from './VIdeoPopup';
const DetailsBanner = ({ video, crew }) => {
  const { url } = useSelector((state) => state.home);
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const genres = data?.genres?.map((g) => g.id);

  // Video Show________________________________________

  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  // Getting Derector and writer______________________

  const director = crew?.filter((f) => f.job === 'Director');
  const writer = crew?.filter(
    (f) => f.job === 'Screenplay' || f.job === 'Story' || f.job === 'Writer'
  );

  // Convert min to hr and min_________________

  const toHoursAndMinutes = (totalMin) => {
    const hours = Math.floor(totalMin / 60);
    const min = totalMin % 60;
    return `${hours}h${min > 0 ? `${min}m` : ''}`;
  };
  return (
    <div className={`text-white `}>
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="bg-black">
                <LazyLoading src={url.backdrop + data?.backdrop_path} />
              </div>{' '}
              <div className="opacity_layer"></div>
              {/* _____Descriptions____ */}
              <div className="flex flex-col md:flex-row w-[90%] mx-auto h-auto pt-10 ">
                {/*_______________________ Banner bg and poster img________________ */}

                <div className="md:w-[40%] w-full">
                  {data?.poster_path ? (
                    <div className="p-5 w-[100%] lg:w-[80%] mx-auto">
                      {' '}
                      <LazyLoading
                        className="rounded-md shadow-custom-gray"
                        src={url.backdrop + data?.poster_path}
                      />
                    </div>
                  ) : (
                    <LazyLoading src="/images/no-poster.png" />
                  )}
                </div>

                {/*_______________________ */}

                <div className="w-[60%] p-5 space-y-4">
                  {/*_________ Title___________ */}

                  <div className="text-[25px] md:text-[35px] font-bold">
                    {`${data?.name || data?.title} (${dayjs(
                      data?.release_date
                    ).format('YYYY')})`}

                    {/*_____________ Subtitle______________ */}

                    <div className="mt-1 text-lg text-white/50">
                      {data?.tagline}
                    </div>
                  </div>

                  <Genres className="mt-1" data={genres} />
                  <div
                    onClick={() => {
                      setShow(true);
                      setVideoId(video.key);
                    }}
                    className="flex items-center space-x-3"
                  >
                    <CircleRating rating={data.vote_average.toFixed(1)} />
                    <div className="flex items-center space-x-3 cursor-pointer hover:text-blue-600">
                      <AiFillPlayCircle className="text-[52px] md:text-[56px] lg:text-[60px]" />
                      <span>Watch Trailer</span>
                    </div>
                  </div>

                  {/*___________________ Overview______________ */}
                  <div className="pb-2">
                    <div className="text-[30px] text-white/70 font-bold">
                      Overview
                    </div>
                    <span className="pt-2 text-white/50">{data.overview}</span>
                  </div>

                  {/* __________Status____________________ */}

                  <div className="">
                    <div className="mt-10  text-white/80 flex space-x-6 border-b-[2px] border-b-orange-100/10 pb-3">
                      {data.status && (
                        <div>
                          <span>Status : </span>
                          <span className="text-white/30">{data.status}</span>
                        </div>
                      )}
                      {data.release_date && (
                        <div>
                          <span>Release Date: </span>
                          <span className="text-white/30">
                            {dayjs(data.release_date).format('MMM D, YYYY')}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div>
                          <span>Runtime : </span>
                          <span className="text-white/30">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {director?.length > 0 && (
                    <div className="text-white/90 border-b-[2px] border-b-orange-100/10 pb-3">
                      <span>Director : {''}</span>
                      <span className="text-white/30">
                        {director?.map((d, i) => (
                          <span key={i}>
                            {d.name} {director.length - 1 !== i && ', '}
                          </span>
                        ))}
                      </span>
                    </div>
                  )}
                  {writer?.length > 0 && (
                    <div className=" text-white/90 border-b-[2px] border-b-orange-100/10 pb-3">
                      <span>Writer : {''}</span>
                      <span className="text-white/30">
                        {writer?.map((d, i) => (
                          <span key={i}>
                            {d.name} {writer.length - 1 !== i && ', '}
                          </span>
                        ))}
                      </span>
                    </div>
                  )}
                  {data?.created_by?.length > 0 && (
                    <div className="text-white/90 border-b-[2px] border-b-orange-100/10 pb-3">
                      <span>Creator : {''}</span>
                      <span className="text-white/30">
                        {data?.created_by?.map((d, i) => (
                          <span key={i}>
                            {d.name}{' '}
                            {data?.created_by?.length - 1 !== i && ', '}
                          </span>
                        ))}
                      </span>
                    </div>
                  )}
                </div>
                <VIdeoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </div>
            </React.Fragment>
          )}
        </>
      ) : (
        <div>skeleton</div>
      )}
    </div>
  );
};

export default DetailsBanner;
