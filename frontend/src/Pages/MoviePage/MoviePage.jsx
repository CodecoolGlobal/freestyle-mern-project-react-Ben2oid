import "./style.scss";
import { useMoviePage } from "./useMoviePage";

export const MoviePage = () => {
  const {
    data,
    loading,
    error,
    videoData,
    videoLoading,
    videoError,
    baseImageUrl,
    baseYTUrl,
    trailerKey,
  } = useMoviePage();

  return loading ? (
    <h1>Please wait, loading</h1>
  ) : error ? (
    <h1>{error}</h1>
  ) : (
    data && (
      <div className="moviepage-main-container">
        <img
          className="backdrop-image"
          src={`${baseImageUrl}/original/${data.backdrop_path}`}
          alt="backdrop"
        />
        <div className="movie-detail-container">
          <div className="title-container">
            <h1 className="movie-title">{data.title}</h1>
            <p>{data.release_date.split("-")[0]}</p>
          </div>
          <div className="main-details">
            <img
              className="movie-poster"
              src={`${baseImageUrl}/w500/${data.poster_path}`}
              alt="Poster"
            />
            {videoLoading ? (
              <h4>Video loading</h4>
            ) : videoError ? (
              <h4>{videoError}</h4>
            ) : videoData && trailerKey ? (
              <iframe
                allowFullScreen="true"
                className="trailer"
                src={`${baseYTUrl}${trailerKey}`}
              ></iframe>
            ) : (
              <div className="description">
                <p>{data.overview}</p>
              </div>
            )}
          </div>
          {data.genres.map((genre) => {
            return <button key={genre.id}>{genre.name}</button>;
          })}
        </div>
      </div>
    )
  );
};
