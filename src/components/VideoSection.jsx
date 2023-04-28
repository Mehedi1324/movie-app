import React from 'react';
import { useState } from 'react';
import LazyLoading from './LazyLoading';
import { AiFillPlayCircle } from 'react-icons/ai';
import VIdeoPopup from './VIdeoPopup';

const VideoSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const skeleton = () => {
    return <div>skeleton</div>;
  };

  return (
    <div className="text-white/50 w-[90%]  m-auto mb-20 space-y-6 ">
      <div>
        <h1 className="text-3xl font-bold">Official Videos</h1>
      </div>
      {!loading ? (
        <div className="flex w-full space-x-6 overflow-x-scroll text-white md:space-x-7 ">
          {data?.results?.map((video) => (
            <div
              className="cursor-pointer hover:text-blue-600"
              onClick={() => {
                setVideoId(video.key);
                setShow(true);
              }}
              key={video.id}
            >
              <div className="relative w-40 md:w-60">
                {/*  Youtube thumbnail */}
                <LazyLoading
                  className="w-full rounded-md"
                  src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                />
                <AiFillPlayCircle className="absolute top-0 left-0 right-0 bottom-0  m-auto   text-[50px] md:text-[65px]" />
              </div>
              <div>{video.name}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>{skeleton()}</div>
      )}
      <VIdeoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideoSection;
