import {FaHeart, FaRegHeart} from "react-icons/fa";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { FaStar, FaRegStar } from "react-icons/fa";
import { WishlistContext } from "../contexts/contextProvider";

function StarRating({ vote }) {
    const stars = Math.round(vote / 2); 
    return (
        <div style={{ display: "flex", gap: "2px" }}>
            {[1,2,3,4,5].map(i =>
                i <= stars
                    ? <FaStar key={i} style={{ color: "#000000" }} />
                    : <FaRegStar key={i} style={{ color: "#000000" }} />
            )}
        </div>
    );
}


function Wishcard({movie}){
     const navigate=useNavigate();
    
    return(
        
             <div style={{display:"flex",flexDirection:"column",gap:"20px",flexWrap:"wrap",height:"95%"}}>
                       {/* movie poster */}
                       <img // add on onClick to set the selected movie and navigate to the movie details page
                        onClick={()=>{movie.title?navigate(`/movies/${movie.id}`):navigate(`/shows/${movie.id}`)}}
                           src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                           style={{width:"95%",borderRadius:"10px",boxShadow:"0 4px 12px rgba(0,0,0,0.15)"}}
                       />
       
       
                       <div style={{flex:"1",Width:"70%",position:"relative",marginTop:"0px"}}>
                          <div style={{display:"flex",justifyContent:"space-between"}}>
                            
                            <div>
                                    {/* Movie title */}
                                    <h2 style={{marginBottom:"4px"}}>{movie.title?movie.title:movie.name}</h2>
                                    {/* movie realease date */}
                                    <p style={{color:"gray",fontSize:"14px"}}>{movie.release_date?movie.release_date:movie.first_air_date}</p>
                            </div>

                                 <button className="btn_heart">
                                    <FaHeart style={{color:"#f5c518",fontSize:"24px"}}/>
                                </button>
                        
                              
                          </div>
                                
                                
                           
                           
                        
       
                           <div style={{display:"flex",alignItems:"center",gap:"8px",margin:"8px 0"}}>
                               {/* star rating component to show the rating in stars */}
                               <StarRating vote={movie.vote_average}/>
                               <span style={{color:"gray",fontSize:"14px"}}>{movie.vote_average?.toFixed(1)}</span>
                           </div>
                           
                        
                       </div>
             </div>

        
        
    );
   
}
export default Wishcard;
