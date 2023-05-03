import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../utils/api';
import { useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import Select from 'react-select';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
let filters = {};
const sortbyData = [
  {
    value: 'popularity.desc',
    label: 'Popularity Descending',
  },
  {
    value: 'popularity.asc',
    label: 'Popularity Ascending',
  },
  {
    value: 'vote_average.desc',
    label: 'Rating Descending',
  },
  {
    value: 'vote_average.asc',
    label: 'Rating Ascending',
  },
  {
    value: 'primary_release_date.desc',
    label: 'Release Date Descending',
  },
  {
    value: 'primary_release_date.asc',
    label: 'Release Date Ascending',
  },
  {
    value: 'original_title.asc',
    label: 'Title (A-Z)',
  },
];
const Explore = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  const { mediaType } = useParams();
  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  // Fetch first page data_________________________________

  const fetchInitialData = () => {
    setLoading(true);
    fetchData(`/discover/${mediaType}`, filters).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  // Fetch nextPage data_______________________

  const fetchNextPageData = () => {
    fetchData(`/discover/${mediaType}?page=${pageNum}`, filters).then((res) => {
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

  // Changes on changing media type_______________________

  useEffect(() => {
    filters = {};
    setData(null);
    setPageNum(1);
    setSortby(null);
    setGenre(null);
    fetchInitialData();
  }, [mediaType]);

  // _______________________________________________

  const onChange = (selectedItems, action) => {
    if (action.name === 'sortby') {
      setSortby(selectedItems);
      if (action.action !== 'clear') {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }

    if (action.name === 'genres') {
      setGenre(selectedItems);
      if (action.action !== 'clear') {
        let genreId = selectedItems.map((g) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }

    setPageNum(1);
    fetchInitialData();
  };

  // _________Return Statement______________

  return (
    <div className="w-[90%] pt-20 m-auto">
      <div className="flex flex-col items-center justify-between space-y-3 md:flex-row md:space-y-0">
        <div className="text-white">
          {mediaType === 'tv' ? 'Explore TV Shows' : 'Explore Movies'}
        </div>
        <div className="grid bg-black w-full md:w-[60%] grid-cols-1 space-y-2 md:grid-cols-2 md:space-x-2 md:space-y-0">
          <Select
            isMulti
            name="genres"
            value={genre}
            closeMenuOnSelect={false}
            options={genresData?.genres}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            onChange={onChange}
            placeholder="Select genres"
            className="w-full "
            classNamePrefix="react-select"
          />
          <Select
            name="sortby"
            value={sortby}
            options={sortbyData}
            onChange={onChange}
            isClearable={true}
            placeholder="Sort by"
            className="w-full"
            classNamePrefix="react-select"
          />
        </div>
      </div>
      {loading && <Spinner />}
      {!loading && (
        <>
          {data?.results?.length > 0 ? (
            <InfiniteScroll
              className="grid grid-cols-2 gap-8 p-5 my-10 text-white md:grid-cols-3 lg:grid-cols-5"
              dataLength={data?.results?.length || []}
              next={fetchNextPageData}
              hasMore={pageNum <= data?.total_pages}
              loader={<Spinner />}
            >
              {data?.results?.map((item, index) => {
                if (item.media_type === 'person') return;
                return (
                  <MovieCard key={index} data={item} mediaType={mediaType} />
                );
              })}
            </InfiniteScroll>
          ) : (
            <span className="resultNotFound">Sorry, Results not found!</span>
          )}
        </>
      )}
    </div>
  );
};

export default Explore;
