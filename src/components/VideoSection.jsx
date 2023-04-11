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
    <div className="text-white/50">
      <div>
        <h1 className="text-3xl font-bold">Official Videos</h1>
      </div>
      {!loading ? (
        <div className="grid grid-cols-4 space-x-10">
          {data?.results?.map((video) => (
            <div
              className="cursor-pointer hover:text-blue-600"
              onClick={() => {
                setVideoId(video.key);
                setShow(true);
              }}
              key={video.id}
            >
              <div className="relative">
                {/*  Youtube thumbnail */}
                <LazyLoading
                  className=""
                  src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                />
                <AiFillPlayCircle className="absolute top-0 left-0 right-[50%] bottom-0  m-auto  z-10 text-[65px]" />
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
