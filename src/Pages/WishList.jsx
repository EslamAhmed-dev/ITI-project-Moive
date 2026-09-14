import { useContext } from "react";
import { Link } from "react-router";
import { FaHeart, FaTrash } from "react-icons/fa";
import Wishcard from "../Components/Wishcard";
import { WishlistContext } from "../contexts/contextProvider";


function WishList() {

    const { wishlist, removeFromWishlist } =
        useContext(WishlistContext);

    const movieWishlist = wishlist.filter((item) => item.title !== undefined);
    const tvWishlist = wishlist.filter((item) => item.name !== undefined);

    return (

        <div className="wishlist-page" style={{marginTop:"150px"}}>

            <div className="wishlist-container">

                <div className="wishlist-header">

                    <h2>My Wishlist</h2>

                    <p>
                        {wishlist.length} items in your wishlist
                    </p>

                </div>


                {wishlist.length === 0 ? (

                    <div className="empty-wishlist">

                        <FaHeart />

                        <h3>Your Wishlist is Empty</h3>

                        <p>
                            Add your favorite movies to see them here.
                        </p>

                        <Link
                            to="/"
                            className="browse-movies"
                        >
                            Browse Movies
                        </Link>
                        <Link
                            to="/tvshowslist"
                            className="browse-movies"
                        >
                            Browse TvShows
                        </Link>

                    </div>

                ) : (

                    <>

                        {movieWishlist.length > 0 && (
                            <div className="mb-5">

                                <h3 className="mb-3 titles">Movies</h3>

                                <div className="wishlist-grid">

                                    {movieWishlist.map((movie) => (

                                        <div
                                            className="wishlist-card"
                                            key={movie.id}
                                        >

                                            <Wishcard movie={movie} />

                                            <div className="wishlist-card-info">


                                                <button
                                                    className="remove-wishlist"
                                                    onClick={() =>
                                                        removeFromWishlist(movie.id)
                                                    }
                                                >
                                                    <FaTrash />
                                                    Remove
                                                </button>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>
                        )}
                        <hr/>
                        {tvWishlist.length > 0 && (
                            <div className="mb-5">

                                <h3 className="mb-3 titles">TV Shows</h3>

                                <div className="wishlist-grid">

                                    {tvWishlist.map((show) => (

                                        <div
                                            className="wishlist-card"
                                            key={show.id}
                                        >

                                            <Wishcard movie={show} />

                                            <div className="wishlist-card-info">


                                                <button
                                                    className="remove-wishlist"
                                                    onClick={() =>
                                                        removeFromWishlist(show.id)
                                                    }
                                                >
                                                    <FaTrash />
                                                    Remove
                                                </button>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>
                        )}

                    </>

                )}

            </div>

        </div>

    );

}

export default WishList;