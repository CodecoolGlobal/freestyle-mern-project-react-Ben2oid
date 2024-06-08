import { Result } from "../Result/Result";
import "./style.scss";
import { useSearchbar } from "./useSearchbar";

export const Searchbar = () => {
  const {
    blurHandler,
    search,
    setSearch,
    loading,
    error,
    data,
    focus,
    setFocus,
  } = useSearchbar();

  return (
    <div className="search-container">
      <div className="searchbar-main">
        <input
          onBlur={blurHandler}
          onFocus={() => setFocus(true)}
          placeholder="Search"
          onChange={(e) => setSearch(encodeURIComponent(e.target.value))}
          type="text"
          value={decodeURIComponent(search)}
        />
      </div>
      {search && !loading && !error && data && focus && (
        <div className="results-container">
          <div className="results">
            {data.results.map((movie) => {
              return (
                <Result key={movie.id} movie={movie} setSearch={setSearch} />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
