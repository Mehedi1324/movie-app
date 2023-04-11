import React from 'react';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import DetailsBanner from '../components/DetailsBanner';
import Cast from '../components/Cast';
import VideoSection from '../components/VideoSection';
import SimilarMovies from '../components/SimilarMovies';
import Recomendations from '../components/Recomendations';
const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideoSection data={data} loading={loading} />
      <SimilarMovies mediaType={mediaType} id={id} />
      <Recomendations mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
