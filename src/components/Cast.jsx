import React from 'react';
import { useSelector } from 'react-redux';
import LazyLoading from './LazyLoading';
import avatar from '../../public/images/avatar.png';
const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);
  const skeleton = () => {
    return <div>Skeloton</div>;
  };
  return (
    <div className="w-[90%] space-y-6 my-10  m-auto">
      <h1 className="text-3xl font-bold text-white/50 ">Top Cast</h1>
      {!loading ? (
        <div className="flex w-full space-x-6 overflow-x-scroll text-white ">
          {data?.map((item) => {
            let imgUrl = item.profile_path
              ? url.profile + item.profile_path
              : avatar;
            return (
              <div key={item.id} className="bg-black">
                <div className="">
                  <LazyLoading
                    className="w-full text-center rounded-3xl"
                    src={imgUrl}
                  />
                </div>
                <div>{item.name}</div>
                <div>{item.character}</div>
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
