import {FaHeart, FaRegHeart} from "react-icons/fa";
import { useNavigate } from "react-router";
import { WishlistContext } from "../contexts/contextProvider";
import { useContext } from "react";
function format(date){
    const dat=new Date(date);
    const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  let month=months[dat.getMonth()];
  let day=dat.getDate();
  let year=dat.getFullYear();

  return `${month} ${day}, ${year}`;
}

function TvShowCard({show}){
    const navigate=useNavigate();
    const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
    const addedToWishlist = isInWishlist(show.id);
    const rating=Math.round(show.vote_average*10);
    const color=rating>=70?"#21d07a":"#d2d531";
    return(
        <div className="Moviecard" >
            <div style={{position:"relative"}}
                // add on onClick to set the selected movie and navigate to the movie details page
                    onClick={()=>navigate(`/shows/${show.id}`)}>
                <img
                    src={`https://image.tmdb.org/t/p/w500/${show.poster_path }`}
                    style={{height:"250px",width:"100%",borderRadius:"10px",cursor:"pointer"}}
                
                />
            
                <div className="percentage" style={{background:`conic-gradient(${color} ${rating*3.6}deg,#204529 0deg)`}}>
                    <div className="percentage-inner"><span>{rating}</span><span className="perc"> %</span></div>
                </div>
            </div>
            
            
            <div className="mx-2 mt-4 pt-1" style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                <div>
                    <h5><b>{show.name?show.name:"no name"}</b></h5>
                    <p className="releaseDate">{format(show.first_air_date?show.first_air_date:0)}</p>
                </div>
                 <button
                    className="btn_heart"
                    onClick={() => toggleWishlist(show)}
                >
                    {addedToWishlist ? (
                        <FaHeart
                            style={{
                                color: "var(--yellowNav-color)",
                                fontSize: "24px",
                                cursor: "pointer"
                            }}
                        />
                    ) : (
                        <FaRegHeart
                            style={{
                                color: "var(--yellowNav-color)",
                                fontSize: "24px",
                                cursor: "pointer"
                            }}
                        />
                    )}
                    </button>
            </div>
        </div>
    );
   
}
export default TvShowCard;
