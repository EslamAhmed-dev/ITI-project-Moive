const apikey="d0627f5ccc5bc50f67f67f3801e4cdaa";

export async function getMoviesList(page=1){
    const res=await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&page=${page}`);
    return res.json();
}
export async function getMovieDetails(id){
    const res=await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`);
    return res.json();
}
export async function getmovieRecommend(movie_id) {
    const res=await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${apikey}`);
return res.json();
}
export async function getMovieReview(movie_id){
    const res=await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=${apikey}`);
    return res.json();
}
export async function getTvShowsReview(show_id){
    const res=await fetch(`https://api.themoviedb.org/3/tv/${show_id}/reviews?api_key=${apikey}`);
    return res.json();
}
export async function SearchMovie(MovieName,page=1){
    const res=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${MovieName}&page=${page}`);
    return res.json();
}
export async function SearchTv(ShowName,page=1){
    const res=await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apikey}&query=${ShowName}&page=${page}`);
    return res.json();
}
export async function getTvShows(page=1){
    const res=await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apikey}&page=${page}`);
    return res.json();
}
export async function getTvShowDetails(series_id){
    const res=await fetch(`https://api.themoviedb.org/3/tv/${series_id}?api_key=${apikey}`);
    return res.json();
}
export async function getshowRecommend(series_id) {
    const res=await fetch(`https://api.themoviedb.org/3/tv/${series_id}/recommendations?api_key=${apikey}`);
return res.json();
}
