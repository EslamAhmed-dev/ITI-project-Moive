import { Link } from "react-router";
import { NavLink } from "react-router";
import { useContext } from "react";
import SearchBar from "./SearchBar";
import { WishlistContext } from "../contexts/contextProvider";
function Navbar(){
    const { wishlist } = useContext(WishlistContext);
    return(
          <nav className="navbar navbar-expand-lg py-4 px-5 mb-4 fw-bold navbar-dark" style={{border:"1px solid rgb(231, 227, 227)",width:"100vw",backgroundColor:"var(--yellowNav-color)",position:"fixed",zIndex:"1000"}}>
                    <div className="container-fluid px-0">
                                        
                         <NavLink
                            className="navbar-brand d-flex align-items-center gap-2 m-0 p-0 text-dark fs-6 fw-bold"
                            to="/"
                            >
                            <span className="fs-3 fw-bold" style={{ color: "var(--text-color)" }}>
                               🎬 MovieApp
                            </span>
                        </NavLink>
                        <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        

                        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <ul className="navbar-nav gap-5" >
                              
                                <li className="nav-item" >
                                    < NavLink className="nav-link " to="/" >MoviePage</ NavLink>
                                </li>
                                <li className="nav-item">
                                    < NavLink className="nav-link" to="/tvshowslist">TVShows</ NavLink>
                                </li>
                               <li className="nav-item">
                                    <NavLink
                                        className="nav-link wishlist-nav-link"
                                        to="/wishlist"
                                    >
                                        WishList ❤️

                                        {wishlist.length > 0 && (
                                            <span className="wishlist-counter">
                                                {wishlist.length}
                                            </span>
                                        )}
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    < NavLink className="nav-link" to="/Ai_assistant" > Ai Assistant 🤖</ NavLink>
                                </li>
                                 <li className="nav-item">
                                <SearchBar />
                                </li>
                                        
                            </ul>
                        </div>

                    </div>
                </nav>
    );
}
export default Navbar;