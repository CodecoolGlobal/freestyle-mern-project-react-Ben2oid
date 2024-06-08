import "./style.scss";
import { useResult } from "./useResult";

export const Result = ({ movie, setSearch }) => {
  const { resultMovieClickHandler, data, baseImageUrl } = useResult(
    movie,
    setSearch
  );

  return (
    <div
      className="search-result"
      onClick={() => resultMovieClickHandler(movie.id)}
    >
      <img
        className="result-poster"
        src={`${baseImageUrl}/w500/${movie.poster_path}`}
        alt="poster"
      />
      <div className="result-descrip">
        <h4>
          {movie.title} ({movie.release_date.split("-")[0]})
        </h4>
        {data && <p>{data.tagline}</p>}
      </div>
    </div>
  );
};
