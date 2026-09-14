import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { SearchMovie, SearchTv } from "../Api/api";
import Moviecard from "../Components/MovieCard";
import TvShowCard from "../Components/TvShowCard";
import Pagination from "../Components/Pagination";
import Loading from "../Components/Loading";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [movieResults, setMovieResults] = useState([]);
  const [tvResults, setTvResults] = useState([]);
  const [isloading, setloading] = useState(false);
      const [currentpag,setcurrentpag]=useState(1);
    const [totalpag,settotal]=useState(1);

  useEffect(() => {
    if (!query) return;
    async function fetchResults() {
      setloading(true);
      const [movieData, tvData] = await Promise.all([
        SearchMovie(query,currentpag),
        SearchTv(query,currentpag),
      ]);
      setMovieResults(movieData.results || []);
      setTvResults(tvData.results || []);
      settotal(Math.max(movieData.total_pages,tvData.total_pages));
      console.log(movieData.total_pages);
      setloading(false);
    }
    fetchResults();
  }, [query,currentpag]);

  if (isloading) return <Loading />;

  return (
    <div className="container " style={{marginTop:"150px",overflow:"hidden"}}>
      <h1 className="mb-4 search_title">Search Results for "{query}"</h1>

      {query && (
        <>
          <h2 className="titles">Movies</h2>
          {movieResults.length === 0 ? (
            <p>No movies found</p>
          ) : (
            <div className="row g-2 mt-2">
              {movieResults.map((movie) => (
                <div key={movie.id} className="col-12 col-md-3 col-lg-2">
                  <Moviecard movie={movie} />
                </div>
              ))}
            </div>
          )}
          <hr/>

          <h2 className="titles mt-4">TV Shows</h2>
          {tvResults.length === 0 ? (
            <p>No TV shows found</p>
          ) : (
            <div className="row g-2 mt-2">
              {tvResults.map((show) => (
                <div key={show.id} className="col-12 col-md-3 col-lg-2">
                  <TvShowCard show={show} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <Pagination currentpag={currentpag} totalpag={totalpag} on_pagchange={(num)=>setcurrentpag(num)}/>
    </div>
  );
}

export default SearchResults;