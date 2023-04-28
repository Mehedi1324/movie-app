import React from 'react';
import { useSelector } from 'react-redux';
import LazyLoading from './LazyLoading';
import avatar from '/src/images/avatar.png';
const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);
  const skeleton = () => {
    return <div>Skeloton</div>;
  };
  return (
    <div className="w-[90%] space-y-6 my-10  m-auto">
      <h1 className="text-3xl font-bold text-white/50 ">Top Cast</h1>
      {!loading ? (
        <div className="flex w-full space-x-6 overflow-x-scroll text-white md:space-x-8 ">
          {data?.map((item) => {
            let imgUrl = item.profile_path
              ? url.profile + item.profile_path
              : avatar;
            return (
              <div key={item.id} className="">
                <div className="w-32">
                  <LazyLoading
                    className="w-full h-32 p-1 text-center rounded-2xl shadow-custom-light "
                    src={imgUrl}
                  />
                </div>
                <div className="text-center">{item.name}</div>
                <div className="text-[12px] text-center text-white/50">
                  {item.character}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>{skeleton()}</div>
      )}
    </div>
  );
};

export default Cast;
