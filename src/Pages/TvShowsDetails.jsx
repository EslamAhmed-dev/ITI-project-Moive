import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useContext } from "react";
import { WishlistContext } from "../contexts/contextProvider";
import { getTvShowDetails, getshowRecommend, getTvShowsReview } from "../Api/api";
import TvShowCard from "../Components/TvShowCard";
import Loading from "../Components/Loading";
import { FaStar, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";

// Star Rating Component
function StarRating({ vote }) {
    const stars = Math.round(vote / 2); 
    return (
        <div style={{ display: "flex", gap: "2px" }}>
            {[1,2,3,4,5].map(i =>
                i <= stars
                    ? <FaStar key={i} style={{ color: "#f5c518" }} />
                    : <FaRegStar key={i} style={{ color: "#f5c518" }} />
            )}
        </div>
    );
}

function truncateReview(text, maxLen = 400) {
    if (!text || text.length <= maxLen) return text;
    const trimmed = text.slice(0, maxLen);
    return trimmed.slice(0, trimmed.lastIndexOf(" ")) + "...";
}

function TvShowDetails(){
    const { id } = useParams();
    const [show, setshow] = useState(null);
    const [recommendations, setrecommendations] = useState([]);
    const [isloading, setloading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

    useEffect(()=>{
        async function fetchData(){
            setloading(true);
            const [details, recs, reviewData] = await Promise.all([
                getTvShowDetails(id),
                getshowRecommend(id),
                getTvShowsReview(id)
            ]);
            setshow(details);
            setrecommendations(recs.results);
            setReviews(reviewData.results || []);
            setloading(false);
        }
        fetchData();
    },[id]);

    if(isloading) return <Loading/>;
    if(!show) return null;
    const addedToWishlist = isInWishlist(show.id);

    const studio = show.production_companies?.[0];

    return(
        <div className="px-4" style={{margin:"50px auto", maxWidth:"1100px",marginTop:"150px"}}>
           <h2 className="mb-5 titles">TvShows Details</h2>
            <div style={{display:"flex",gap:"30px",flexWrap:"wrap"}}>
                <img
                    src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                    style={{width:"260px",borderRadius:"10px",boxShadow:"0 4px 12px rgba(0,0,0,0.15)"}}
                />

                <div style={{flex:"1",minWidth:"280px",position:"relative"}}>
                    <button
                        className="btn_heart"
                        onClick={() => toggleWishlist(show)}
                        style={{position:"absolute",top:0,right:0,border:"none",background:"none"}}>
                        {addedToWishlist ? (
                            <FaHeart style={{ color: "var(--yellowNav-color)", fontSize: "24px", cursor: "pointer" }} />
                        ) : (
                            <FaRegHeart style={{ color: "var(--yellowNav-color)", fontSize: "24px", cursor: "pointer" }} />
                        )}
                    </button>
                    <h2 style={{marginBottom:"4px"}}>{show.name}</h2>
                    <p style={{color:"gray",fontSize:"14px"}}>{show.first_air_date}</p>

                    <div style={{display:"flex",alignItems:"center",gap:"8px",margin:"8px 0"}}>
                        <StarRating vote={show.vote_average}/>
                        <span style={{color:"gray",fontSize:"14px"}}>{show.vote_average?.toFixed(1)}</span>
                    </div>
                    <p style={{lineHeight:"1.6", color:"#333"}}>{show.overview}</p>
                    <div style={{display:"flex",gap:"8px",flexWrap:"wrap",margin:"14px 0"}}>
                        {show.genres.map(g=>(
                            <span key={g.id} style={{background:"#f5c518",color:"#000",padding:"4px 14px",borderRadius:"16px",fontSize:"13px",fontWeight:"600"}}>
                                {g.name}
                            </span>
                        ))}
                    </div>

                    <div style={{display:"flex",gap:"40px",margin:"14px 0"}}>
                        <div>
                            <p style={{fontSize:"12px",color:"gray",marginBottom:"2px"}}>Duration per episode:</p>
                            <p style={{fontWeight:"600"}}>{show.episode_run_time} Min.</p>
                        </div>
                         <div>
                            <p style={{fontSize:"12px",color:"gray",marginBottom:"2px"}}>Episodes number:</p>
                            <p style={{fontWeight:"600"}}>{show.last_episode_to_air?.episode_number??"Not found"} episode</p>
                        </div>
                        <div>
                            <p style={{fontSize:"12px",color:"gray",marginBottom:"2px"}}>Languages:</p>
                            <p style={{fontWeight:"600"}}>
                                {show.spoken_languages?.map(l=>l.english_name).join(", ")}
                            </p>
                        </div>
                    </div>

                    <div>
                        {studio && (
                            <div style={{display:"flex",alignItems:"center",gap:"16px",marginTop:"14px"}}>
                                {studio.logo_path && (
                                    <img src={`https://image.tmdb.org/t/p/w200/${studio.logo_path}`} style={{height:"30px",objectFit:"contain"}} />
                                )}
                                {show.homepage && (
                                    <button type="button" className="btn btn-outline-warning rounded-pill">
                                        <a className="link-offset-2 link-underline link-underline-opacity-0 link-secondary"
                                           href={show.homepage} target="_blank" rel="noreferrer" style={{fontSize:"13px" }}>
                                            Website 🔗
                                        </a>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-5" style={{ borderTop: "1px solid #eee" }}>
                <h3>Recommendations</h3>
                <div id="carouselExample" className="carousel slide mt-2">
                    <div className="carousel-inner">
                        {
                            Array.from({ length: Math.ceil(recommendations.length / 6) }, (_, i) =>
                                recommendations.slice(i * 1, i * 1 + 6)
                            ).map((chunk, index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                    <div className="row g-2">
                                        {chunk.map(rec => (
                                            <div key={rec.id} className="col-12 col-md-3 col-lg-2">
                                                <TvShowCard show={rec}/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="false"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="false"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

          <div className="mt-5" style={{ borderTop: "1px solid #eee" }}>
    <h3>Reviews</h3>
    {reviews.length === 0 && <p style={{color:"gray"}}>No reviews yet.</p>}
    {reviews.map(review => (
        <div key={review.id} style={{padding:"16px 0", borderBottom:"1px solid #eee"}}>
            <div style={{display:"flex", alignItems:"center", gap:"8px", marginBottom:"4px"}}>
                <p style={{fontWeight:"600", margin:0}}>{review.author}</p>
                {review.author_details?.rating != null && (
                    <>
                        <StarRating vote={review.author_details.rating} />
                        <span style={{color:"gray", fontSize:"13px"}}>{review.author_details.rating}/10</span>
                    </>
                )}
            </div>
            <p style={{color:"#333", lineHeight:"1.6"}}>
                {truncateReview(review.content)}
            </p>
        </div>
    ))}
</div>
        </div>
    )
}
export default TvShowDetails;