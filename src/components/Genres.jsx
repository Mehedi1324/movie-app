import React from 'react';
import { useSelector } from 'react-redux';

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);
  return (
    <div>
      {data?.map((g) => {
        if (!genres[g]?.name) return;
        return (
          <div
            className="m-1 text-[8px] rounded-sm p-1 flex text-white md:text-[12px] bg-orange-700 justify-center"
            key={g}
          >
            {genres[g]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
