import { useState,useEffect } from "react";
import Moviecard from "../Components/MovieCard";
import { getMoviesList } from "../Api/api";
import Pagination from "../Components/Pagination";
import Loading from "../Components/Loading";

function MoviesList(){
    const [movies,setmovies]=useState([]);
    const [isloading,setloading]=useState(true);
    const [currentpag,setcurrentpag]=useState(1);
    const [totalpag,settotal]=useState(1);

    useEffect(()=>{
        async function fetchMovies() {
            setloading(true);
            const data=await getMoviesList(currentpag);
            setmovies(data.results);
            console.log(data.results);
            settotal(data.total_pages)
            setloading(false);
        }
        fetchMovies();
    },[currentpag])

    if(isloading)return <Loading/>;

    return(
        <div style={{width:"100%",margin:"50px auto",marginTop:"150px"}}className="px-4" >
            <div >
                <h2 className="titles">Now Playing</h2>
                <div className="row g-2 mt-4">
                    {
                        movies.map((movie)=>{
                        return (
                            <div key={movie.id} className="col-12 col-md-3 col-lg-2">
                                <Moviecard   movie={movie}/>
                            </div>
        
                        )})
                    }
                </div>
            </div>
            <Pagination currentpag={currentpag} totalpag={totalpag} on_pagchange={(num)=>setcurrentpag(num)}/>
        </div>
      
     
    )

}
export default MoviesList;
