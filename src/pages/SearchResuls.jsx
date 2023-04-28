import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../utils/api';
import { useEffect } from 'react';
import Spinner from '../components/Spinner';
import MovieCard from '../components/MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';
const SearchResuls = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();
  const fetchInitialData = () => {
    setLoading(true);
    fetchData(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchData(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data?.results, ...res.results],
        });
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    });
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="w-[90%] pt-20 m-auto text-white">
      {loading && <Spinner />}
      {!loading && (
        <div className="">
          {data?.results?.length > 0 ? (
            <div>
              <span>
                Search results of{' '}
                <span className="text-2xl font-bold text-blue-500">
                  {query}
                </span>
              </span>
              <InfiniteScroll
                dataLength={data?.results.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
                className="grid grid-cols-2 gap-8 p-5 my-5 text-white md:grid-cols-3 lg:grid-cols-5"
              >
                {data?.results?.map((item, index) => {
                  if (item?.media_type === 'person') return;
                  return (
                    <div className="overflow-visible">
                      <MovieCard key={index} data={item} fromSearch={true} />
                    </div>
                  );
                })}
              </InfiniteScroll>
            </div>
          ) : (
            <span>Sorry , Results not found</span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResuls;
