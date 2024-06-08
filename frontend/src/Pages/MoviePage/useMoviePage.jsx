import { useParams } from "react-router-dom";
import { useFetchData } from "../../Hooks";
import { useEffect, useState } from "react";

export const useMoviePage = () => {
  const [trailerKey, setTrailerKey] = useState(null);
  const baseImageUrl = "https://image.tmdb.org/t/p";
  const baseYTUrl = "https://www.youtube.com/embed/";
  const { id } = useParams();
  const { data, loading, error } = useFetchData(
    true,
    `/api/movie/${id}`,
    "GET"
  );
  const {
    data: videoData,
    loading: videoLoading,
    error: videoError,
  } = useFetchData(true, `/api/trailer/${id}`, "GET");

  useEffect(() => {
    if (videoData && videoData.results.length > 1) {
      const videoKeys = [];
      videoData.results.forEach((video) => {
        if (
          video.type === "Trailer" &&
          video.official &&
          video.site === "YouTube"
        ) {
          videoKeys.push(video.key);
        }
      });
      setTrailerKey(videoKeys[1]);
    } else {
      setTrailerKey(null);
    }
  }, [videoData, id]);

  return {
    data,
    loading,
    error,
    videoData,
    videoLoading,
    videoError,
    baseImageUrl,
    baseYTUrl,
    trailerKey,
  };
};
