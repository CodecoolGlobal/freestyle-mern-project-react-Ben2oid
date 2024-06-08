import { useNavigate } from "react-router-dom";
import { useFetchData } from "../../Hooks";

export const useResult = (movie, setSearch) => {
  const baseImageUrl = "https://image.tmdb.org/t/p";
  const navigate = useNavigate();
  const { data } = useFetchData(true, `/api/movie/${movie.id}`, "GET");

  const resultMovieClickHandler = (id) => {
    console.log("clicked", movie.id);
    navigate(`/movie/${id}`);
    setSearch("");
  };

  return { resultMovieClickHandler, data, baseImageUrl };
};
