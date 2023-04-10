import React from 'react';
import ReactPlayer from 'react-player';

const VIdeoPopup = ({ show, setShow, videoId, setVideoId }) => {
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };
  return (
    <div
      className={`${
        show
          ? 'absolute top-0 bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm z-10'
          : 'hidden'
      }`}
    >
      <div
        onClick={hidePopup}
        className="absolute top-0 bottom-0 left-0 right-0 "
        bg-black
        z-10
      ></div>
      <div className="absolute top-[10%] md:bottom-[30%]  bottom-[20%] left-[10%] right-[10%] md:left-[20%] md:right-[20%] ">
        <span
          className="w-full font-bold text-[18px] text-red-100 cursor-pointer"
          onClick={hidePopup}
        >
          Close
        </span>
        <div className="h-full overflow-hidden border border-red-200 rounded-md shadow-custom-light">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            controls
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default VIdeoPopup;
