import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

function ContextProvider({ children }) {

    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem("wishlist");

        if (savedWishlist) {
            return JSON.parse(savedWishlist);
        }

        return [];
    });


    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);


    function toggleWishlist(movie) {

        setWishlist((oldWishlist) => {

            const movieExists = oldWishlist.some(
                (item) => item.id === movie.id
            );

            if (movieExists) {

                return oldWishlist.filter(
                    (item) => item.id !== movie.id
                );

            }

            return [...oldWishlist, movie];

        });

    }


    function isInWishlist(id) {

        return wishlist.some(
            (item) => item.id === id
        );

    }


    function removeFromWishlist(id) {

        setWishlist((oldWishlist) => {

            return oldWishlist.filter(
                (item) => item.id !== id
            );

        });

    }


    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                toggleWishlist,
                isInWishlist,
                removeFromWishlist
            }}
        >
            {children}
        </WishlistContext.Provider>
    );

}

export default ContextProvider;
